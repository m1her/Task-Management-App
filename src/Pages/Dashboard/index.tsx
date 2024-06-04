import React, { useEffect, useState } from "react";
import { Task } from "../../Components/Task";
import "./style.css";
import { AnimatePresence, Reorder } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AddTask } from "../../Components/AddTask";
import { EditTask } from "../../Components/EditTask";
import { DeleteEdit } from "./DeleteEdit";

export const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [statusFlag, setstatusFlag] = useState("");
  const [crudFlag, setCrudFlag] = useState("");
  const [taskAddOrEdit, setTaskAddOrEdit] = useState("add");
  const [tasks, setTasks] = useState<any>();
  const [toDo, setToDo] = useState<any>([]);
  const [inProgress, setInProgress] = useState<any>([]);
  const [done, setDone] = useState<any>([]);
  const [addTaskToggler, setAddTaskToggler] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<any>({});
  const [dragToggler, setDragToggler] = useState(false);

  const onMouseDown = (id: number) => {
    const selected = tasks.find((task: { id: number }) => task.id === id);
    setSelectedTask(selected);
    setDragToggler(true);
  };

  const onMouseUp = async () => {
    if (crudFlag === "edit") {
      setAddTaskToggler(true);
      setTaskAddOrEdit("edit");
      //  setCrudFlag("");
    } else if (crudFlag === "delete") {
      if (selectedTask?.status === "in-progress") {
        setInProgress((prev: any) =>
          prev.filter((task: any) => task.id !== selectedTask.id)
        );
      }
      if (selectedTask?.status === "done") {
        setDone((prev: any) =>
          prev.filter((task: any) => task.id !== selectedTask.id)
        );
      }
      if (selectedTask?.status === "to-do") {
        setToDo((prev: any) =>
          prev.filter((task: any) => task.id !== selectedTask.id)
        );
      }
      const q = query(
        collection(db, user?.email || ""),
        where("id", "==", selectedTask.id)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot) {
        const docRef = doc(db, user?.email || "", querySnapshot.docs[0].id);
        deleteDoc(docRef);
      }
    } else {
      if (selectedTask.status !== statusFlag) {
        if (selectedTask?.status === "to-do") {
          setToDo((prev: any) =>
            prev.filter((task: any) => task.id !== selectedTask.id)
          );
        }
        if (selectedTask?.status === "in-progress") {
          setInProgress((prev: any) =>
            prev.filter((task: any) => task.id !== selectedTask.id)
          );
        }
        if (selectedTask?.status === "done") {
          setDone((prev: any) =>
            prev.filter((task: any) => task.id !== selectedTask.id)
          );
        }
        if (statusFlag === "to-do") {
          setToDo((prev: any) => [
            ...prev,
            { ...selectedTask, status: "to-do" },
          ]);
        }
        if (statusFlag === "in-progress") {
          setInProgress((prev: any) => [
            ...prev,
            { ...selectedTask, status: "in-progress" },
          ]);
        }
        if (statusFlag === "done") {
          setDone((prev: any) => [
            ...prev,
            { ...selectedTask, status: "done" },
          ]);
        }
        setTasks((prevTasks: any[]) =>
          prevTasks.map((task) =>
            task.id === selectedTask.id ? { ...task, status: statusFlag } : task
          )
        );
      }

      if (user) {
        const q = query(
          collection(db, user?.email || ""),
          where("id", "==", selectedTask.id)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot) {
          const docRef = doc(db, user?.email || "", querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            status: statusFlag,
          });
        }
      }
      setSelectedTask({});
    }
    setDragToggler(false);
  };

  const addTaskHandler = () => {
    setAddTaskToggler(true);
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    if (user) {
      const fetchDocuments = async () => {
        const querySnapshot = await getDocs(collection(db, user?.email || ""));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(docs);
      };

      fetchDocuments();
    }
  }, [user]);

  useEffect(() => {
    if (tasks) {
      setToDo(
        tasks.filter((task: { status: string }) => task.status === "to-do")
      );
      setInProgress(
        tasks.filter(
          (task: { status: string }) => task.status === "in-progress"
        )
      );
      setDone(
        tasks.filter((task: { status: string }) => task.status === "done")
      );
    }
  }, [tasks]);

  return (
    <div className={`${addTaskToggler ? "overflow-hidden " : "inline "}`}>
      <nav className="dash-title">Task Manager</nav>
      <div className="dash-add-task-btn-container">
        <div className="dash-add-task-btn " onClick={addTaskHandler}>
          Add Task
        </div>
      </div>
      <div className="dash-grid">
        <div className="dash-piller-container">
          <div className="dash-piller">
            <div
              className={`dash-drag-toggeler
              ${!dragToggler ? "hidden" : "inline"}
              `}
              onMouseOver={() => setstatusFlag("to-do")}
              onMouseLeave={() => setstatusFlag(selectedTask.status)}
            ></div>
            <div className="dash-piller-title text-[#EF4444]">To Do</div>

            {toDo && (
              <Reorder.Group
                axis="y"
                values={toDo}
                onReorder={setToDo}
                className="dash-reorder"
              >
                {toDo
                  .filter((task: { status: string }) => task.status === "to-do")
                  .map((task: any) => (
                    <Reorder.Item
                      key={task.id}
                      value={task}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={1}
                      onDragEnd={onMouseUp}
                      onDragStart={() => onMouseDown(task.id)}
                    >
                      <Task
                        key={task.id}
                        status="To Do"
                        crudFlag={crudFlag}
                        isSelected={selectedTask.id === task.id}
                        task={task}
                      />
                    </Reorder.Item>
                  ))}
              </Reorder.Group>
            )}
          </div>
        </div>
        <div className="dash-piller-container">
          <div className="dash-piller">
            <div
              className={`dash-drag-toggeler
               ${!dragToggler ? "hidden" : "inline"}
               `}
              onMouseOver={() => setstatusFlag("in-progress")}
              onMouseLeave={() => setstatusFlag(selectedTask.status)}
            ></div>
            <div className="dash-piller-title text-[#FBBF24]">In Progress</div>
            {inProgress && (
              <Reorder.Group
                axis="y"
                values={inProgress}
                onReorder={setInProgress}
                className="dash-reorder"
              >
                {inProgress
                  .filter(
                    (task: { status: string }) => task.status === "in-progress"
                  )
                  .map((task: { id: number }) => (
                    <Reorder.Item
                      key={task.id}
                      value={task}
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      dragElastic={1}
                      onDragEnd={onMouseUp}
                      onDragStart={() => onMouseDown(task.id)}
                    >
                      <Task
                        key={task.id}
                        task={task}
                        status="In Progress"
                        crudFlag={crudFlag}
                        isSelected={selectedTask.id === task.id}
                      />
                    </Reorder.Item>
                  ))}
              </Reorder.Group>
            )}
          </div>
        </div>
        <div className="dash-piller-container">
          <div className="dash-piller">
            <div
              className={`dash-drag-toggeler ${
                !dragToggler ? "hidden" : "inline"
              }`}
              onMouseOver={() => setstatusFlag("done")}
              onMouseLeave={() => setstatusFlag(selectedTask.status)}
            ></div>
            <div className="dash-piller-title text-[#34D399]">Done</div>

            <Reorder.Group
              axis="y"
              values={done}
              onReorder={setDone}
              className="dash-reorder"
            >
              {done
                .filter((task: { status: string }) => task.status === "done")
                .map((task: { id: number }) => (
                  <Reorder.Item
                    key={task.id}
                    value={task}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={1}
                    onDragEnd={onMouseUp}
                    onDragStart={() => onMouseDown(task.id)}
                  >
                    <Task
                      key={task.id}
                      task={task}
                      status="Done"
                      crudFlag={crudFlag}
                      isSelected={selectedTask.id === task.id}
                    />
                  </Reorder.Item>
                ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {addTaskToggler && taskAddOrEdit === "add" && (
          <AddTask
            setAddTaskToggler={setAddTaskToggler}
            user={user}
            setToDo={setToDo}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {addTaskToggler && taskAddOrEdit === "edit" && (
          <EditTask
            setEditTaskToggler={setAddTaskToggler}
            task={selectedTask}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            user={user}
            setInProgress={setInProgress}
            setDone={setDone}
            setToDo={setToDo}
          />
        )}
      </AnimatePresence>
      <DeleteEdit setCrudFlag={setCrudFlag} dragToggler={dragToggler} />
    </div>
  );
};

/// to do
// task type
// when edit remove blue color
// due time & date selector
//353
