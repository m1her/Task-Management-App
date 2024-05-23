import React from "react";
import { Task } from "../../Components/Task";

export const Dashboard = () => {
  return (
    <div>
      <nav className="text-[#3B82F6] text-3xl font-light p-4 text-center ">
        Task Manager
      </nav>
      <div className="grid grid-cols-3 py-12 px-40 gap-12">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
};
