import React, { useEffect, useState } from "react";
import { Task } from "../../Components/Task";
import "./style.css";
import { AnimatePresence, Reorder } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { AddTask } from "../../Components/AddTask";
import { EditTask } from "../../Components/EditTask";
import { DeleteEdit } from "./DeleteEdit";
import { DeleteTask } from "./DeleteTask";
import { ChangeTaskStatus } from "./ChangeTaskStatus";
import {
  CrydFlagType,
  StatusFlagType,
  TaskAddOrEditType,
  TaskType,
  TasksType,
} from "./types";
import { Button } from "../../Components";
import { signOut } from "firebase/auth";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [statusFlag, setstatusFlag] = useState<StatusFlagType>("");
  const [crudFlag, setCrudFlag] = useState<CrydFlagType>("");
  const [taskAddOrEdit, setTaskAddOrEdit] = useState<TaskAddOrEditType>("add");
  const [tasks, setTasks] = useState<TasksType>();
  const [toDo, setToDo] = useState<TasksType>([]);
  const [inProgress, setInProgress] = useState<TasksType>([]);
  const [done, setDone] = useState<TasksType>([]);
  const [addTaskToggler, setAddTaskToggler] = useState<boolean>(false);

  const [selectedTask, setSelectedTask] = useState<TaskType>();
  const [dragToggler, setDragToggler] = useState<boolean>(false);

  const onMouseDown = (id: number) => {
    const selected = tasks?.find((task: TaskType) => task.id === id);
    setSelectedTask(selected);
    setDragToggler(true);
  };

  const onMouseUp = async () => {
    if (crudFlag === "edit") {
      setAddTaskToggler(true);
      setTaskAddOrEdit("edit");
      setCrudFlag("");
    } else if (crudFlag === "delete") {
      DeleteTask({
        selectedTask,
        setInProgress,
        setDone,
        setToDo,
        setTasks,
        user,
        setCrudFlag,
      });
    } else {
      ChangeTaskStatus({
        selectedTask,
        setInProgress,
        setSelectedTask,
        setDone,
        setToDo,
        setTasks,
        user,
        statusFlag,
      });
    }
    setTimeout(() => {
      setDragToggler(false);
    }, 1000);
  };

  const addTaskHandler = () => {
    setAddTaskToggler(true);
    setTaskAddOrEdit("add");
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    if (user) {
      const fetchDocuments = async () => {
        const querySnapshot = await getDocs(collection(db, user?.email || ""));
        const docs = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.data().id,
              title: doc.data()?.title,
              description: doc.data()?.description,
              due: doc.data()?.due,
              status: doc.data()?.status,
            } as unknown as TaskType)
        );
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
        <div
          className="dash-add-task-btn "
          onClick={() => {
            addTaskHandler();
            console.log(tasks, done, inProgress, toDo);
          }}
        >
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
              onMouseLeave={() =>
                setstatusFlag(selectedTask ? selectedTask.status : "")
              }
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
                  .filter((task: TaskType) => task.status === "to-do")
                  .map((task: TaskType) => (
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
                        isSelected={selectedTask?.id === task.id}
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
              onMouseLeave={() =>
                setstatusFlag(selectedTask ? selectedTask.status : "")
              }
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
                  .filter((task: TaskType) => task.status === "in-progress")
                  .map((task: TaskType) => (
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
                        isSelected={selectedTask?.id === task.id}
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
              onMouseLeave={() =>
                setstatusFlag(selectedTask ? selectedTask.status : "")
              }
            ></div>
            <div className="dash-piller-title text-[#34D399]">Done</div>

            <Reorder.Group
              axis="y"
              values={done}
              onReorder={setDone}
              className="dash-reorder"
            >
              {done
                .filter((task: TaskType) => task.status === "done")
                .map((task: TaskType) => (
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
                      isSelected={selectedTask?.id === task.id}
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
            setTasks={setTasks}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {addTaskToggler && taskAddOrEdit === "edit" && (
          <EditTask
            setEditTaskToggler={setAddTaskToggler}
            setTasks={setTasks}
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
      <div className="absolute bottom-8 right-8">
        <Button
          styles="dash-signout-btn"
          icon={faSignOut}
          onClick={() => signOut(auth)}
        />
      </div>
    </div>
  );
};