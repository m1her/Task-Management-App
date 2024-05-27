import React, { useCallback, useState } from "react";
import { Task } from "../../Components/Task";
import "./style.css";
import { Reorder } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Firebase/firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const Dashboard = () => {
  const [user] = useAuthState(auth);

  const [toDoTasks, setToDoTasks] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  const [inProgressTasks, setInProgressTasks] = useState([
    { id: 6 },
    { id: 7 },
  ]);
  const [doneTasks, setDoneTasks] = useState([{ id: 8 }]);
  const [selectedTask, setSelectedTask] = useState<any>({});
  const [dragToggler, setDragToggler] = useState(false);

  const onMouseDown = useCallback(
    (id: number) => {
      const selected = toDoTasks.find((task) => task.id === id);
      setSelectedTask(selected);
      setDragToggler(true);
      console.log(selected);
    },
    [toDoTasks]
  );

  const onMouseUp = useCallback(() => {
    setDragToggler(false);
  }, []);

  const addTaskHandler = () => {
    if (user) {
      addDoc(collection(db, user.email || ""), {
        id: Math.random(),
        title: "task 2",
        description: "asdasdasda asdasd asda sdas d",
        due: "10:30am | 25-3-2024",
        status: "to-do",
      });
    }
  };

  return (
    <div>
      <nav className="dash-title">Task Manager</nav>
      <div className="w-full flex justify-center items-center">
        <div
          className="text-lg font-semibold bg-[rgb(59,130,246)] text-white flex justify-center items-center rounded py-1 px-12 cursor-pointer hover:bg-[rgb(70,139,251)] shadow-[0_0_7px_2px_rgba(59,130,246,0.3)] hover:shadow-[0_0_7px_2px_rgba(70,139,251,0.3)] transition-all "
          onClick={addTaskHandler}
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
            ></div>
            <div className="dash-piller-title text-[#EF4444]">To Do</div>

            <Reorder.Group
              axis="y"
              values={toDoTasks}
              onReorder={setToDoTasks}
              className="dash-reorder"
            >
              {toDoTasks.map((task) => (
                <Reorder.Item
                  key={task.id}
                  value={task}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragEnd={onMouseUp}
                  onDragStart={() => onMouseDown(task.id)}
                >
                  <Task key={task.id} id={task.id} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
        <div className="dash-piller-container">
          <div className="dash-piller">
            <div
              className={`dash-drag-toggeler
               ${!dragToggler ? "hidden" : "inline"}
               `}
            ></div>
            <div className="dash-piller-title text-[#FBBF24]">In Progress</div>
            <Reorder.Group
              axis="y"
              values={inProgressTasks}
              onReorder={setInProgressTasks}
              className="dash-reorder"
            >
              {inProgressTasks.map((task) => (
                <Reorder.Item
                  key={task.id}
                  value={task}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragEnd={onMouseUp}
                  onDragStart={() => onMouseDown(task.id)}
                >
                  <Task key={task.id} id={task.id} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
        <div className="dash-piller-container">
          <div className="dash-piller">
            <div
              className={`dash-drag-toggeler ${
                !dragToggler ? "hidden" : "inline"
              }`}
            ></div>
            <div className="dash-piller-title text-[#34D399]">Done</div>
            <Reorder.Group
              axis="y"
              values={doneTasks}
              onReorder={setDoneTasks}
              className="dash-reorder"
            >
              {doneTasks.map((task) => (
                <Reorder.Item
                  key={task.id}
                  value={task}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragEnd={onMouseUp}
                  onDragStart={() => onMouseDown(task.id)}
                >
                  <Task key={task.id} id={task.id} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
