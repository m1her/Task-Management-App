import React, { ChangeEvent, useState } from "react";
import { Input } from "../Input";
import { motion } from "framer-motion";

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
}

export const EditTask = ({ setEditTaskToggler, task }: addTaskProps) => {
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    due: task.due,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            onClick={() => console.log(taskData)}
          >
            Add
          </div>
        </div>
      </div>
    </motion.div>
  );
};
