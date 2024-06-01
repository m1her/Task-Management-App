import React, { ChangeEvent, useState } from "react";
import { Input } from "../Input";
import { motion } from "framer-motion";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { User } from "firebase/auth";

interface taskType {
  title: string;
  description: string;
  due: string;
  status: string;
  id: number;
}

interface addTaskProps {
  setEditTaskToggler: React.Dispatch<React.SetStateAction<boolean>>;
  task: taskType;
  setSelectedTask: React.Dispatch<any>;
  selectedTask: any;
  user: User | null | undefined;
  setInProgress: any;
  setDone: any;
  setToDo: any;
}

export const EditTask = ({
  setEditTaskToggler,
  task,
  setSelectedTask,
  selectedTask,
  user,
  setInProgress,
  setDone,
  setToDo,
}: addTaskProps) => {
  const [taskData, setTaskData] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    due: task.due,
    status: task.status,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editHandler = async () => {
    const q = query(
      collection(db, user?.email || ""),
      where("id", "==", selectedTask.id)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      const docRef = doc(db, user?.email || "", querySnapshot.docs[0].id);
      updateDoc(docRef, taskData);
    }
    if (selectedTask?.status === "in-progress") {
      setInProgress((prev: any) =>
        prev.map((task: any) =>
          task.id === selectedTask.id ? { ...task, ...taskData } : task
        )
      );
    }
    if (selectedTask?.status === "done") {
      setDone((prev: any) =>
        prev.map((task: any) =>
          task.id === selectedTask.id ? { ...task, ...taskData } : task
        )
      );
    }
    if (selectedTask?.status === "to-do") {
      setToDo((prev: any) =>
        prev.map((task: any) =>
          task.id === selectedTask.id ? { ...task, ...taskData } : task
        )
      );
    }
    setEditTaskToggler(false);
    document.body.classList.remove("overflow-hidden");
    setSelectedTask({});
  };

  return (
    <motion.div
      className="fixed w-full backdrop-blur-sm h-screen flex justify-center items-center top-0 left-0 z-50 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute top-0 left-0 z-10 w-full h-screen"
        onClick={() => {
          setEditTaskToggler(false);
          document.body.classList.remove("overflow-hidden");
          setSelectedTask({});
        }}
      ></div>
      <div className="bg-white p-8 rounded-lg shadow-[0_0_12px_3px_rgba(0,0,0,0.2)] z-20 flex flex-col gap-y-2 min-w-[500px]">
        <Input
          id="task-title"
          name="title"
          placeholder="Task Title"
          inputStyle="text-sm"
          value={taskData?.title}
          onChange={handleChange}
        />
        <Input
          id="task-description"
          name="description"
          placeholder="Task Description"
          inputStyle="text-sm"
          value={taskData?.description}
          onChange={handleChange}
        />
        <Input
          id="task-due"
          name="due"
          placeholder="Task Due Date"
          inputStyle="text-sm"
          value={taskData?.due}
          onChange={handleChange}
        />
        <div className="w-full flex justify-end items-center">
          <div
            className=" font-medium mt-2 bg-[rgb(59,130,246)] text-white flex justify-center items-center rounded py-1 px-6 cursor-pointer hover:bg-[rgb(70,139,251)] shadow-[0_0_7px_2px_rgba(59,130,246,0.3)] hover:shadow-[0_0_7px_2px_rgba(70,139,251,0.3)] transition-all "
            onClick={editHandler}
          >
            Save
          </div>
        </div>
      </div>
    </motion.div>
  );
};
