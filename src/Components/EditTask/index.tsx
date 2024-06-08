import React, { ChangeEvent, useCallback, useState } from "react";
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
import { object } from "../../utils/ValidateErrors";

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

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    due: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = useCallback(() => {
    const userSchema = object({
      title: ["string", "required"],
      description: ["string", "required"],
      due: ["required"],
    });
    const result = userSchema.validate(taskData);
    setErrors(result.errors);
    setTimeout(() => {
      setErrors({
        title: "",
        description: "",
        due: "",
      });
    }, 2000);
    return result.valid;
  }, [taskData]);

  const editHandler = async () => {
    if (validate()) {
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
    }
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
          error={errors?.title}
          errorMsg={errors?.title}
        />
        <Input
          id="task-description"
          name="description"
          placeholder="Task Description"
          inputStyle="text-sm"
          value={taskData?.description}
          onChange={handleChange}
          error={errors?.description}
          errorMsg={errors?.description}
        />
        <Input
          id="task-due"
          name="due"
          placeholder="Task Due Date"
          type="date"
          inputStyle="text-sm"
          value={taskData?.due}
          onChange={handleChange}
          error={errors?.due}
          errorMsg={errors?.due}
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
