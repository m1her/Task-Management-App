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
import "./style.css";
import { Button } from "../Button";
import { TaskType, TasksType } from "../../Pages/Dashboard/types";

interface addTaskProps {
  setEditTaskToggler: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<any>;
  selectedTask: TaskType | undefined;
  user: User | null | undefined;
  setInProgress: React.Dispatch<React.SetStateAction<TasksType>>;
  setDone: React.Dispatch<React.SetStateAction<TasksType>>;
  setToDo: React.Dispatch<React.SetStateAction<TasksType>>;
  setTasks: React.Dispatch<React.SetStateAction<TasksType | undefined>>;
}

export const EditTask = ({
  setEditTaskToggler,
  setSelectedTask,
  selectedTask,
  user,
  setInProgress,
  setDone,
  setToDo,
  setTasks,
}: addTaskProps) => {
  const [taskData, setTaskData] = useState({
    id: selectedTask?.id,
    title: selectedTask?.title,
    description: selectedTask?.description,
    due: selectedTask?.due,
    status: selectedTask?.status,
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
      where("id", "==", selectedTask?.id)
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
    setTasks((prev: any) =>
      prev.map((task: any) =>
        task.id === selectedTask?.id ? { ...task, ...taskData } : task
      )
    );
    setEditTaskToggler(false);
    document.body.classList.remove("overflow-hidden");
    setSelectedTask({});
  };

  return (
    <motion.div
      className="edit-task-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="edit-task-pointer"
        onClick={() => {
          setEditTaskToggler(false);
          document.body.classList.remove("overflow-hidden");
          setSelectedTask({});
        }}
      ></div>
      <div className="edit-task-card">
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
        <div className="edit-task-save-btn-container">
          <Button
            styles="edit-task-save-btn"
            label="Save"
            onClick={editHandler}
          />
        </div>
      </div>
    </motion.div>
  );
};
