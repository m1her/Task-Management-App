import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import "./style.css";

interface taskTypes {
  id: number;
}

export const Task = ({ id }: taskTypes) => {
  return (
    <motion.div className="task-card">
      {/* <div
        className="absolute rounded-lg -top-1 -left-1 shadow-[0_10px_0_10px_rgba(0,0,0,0.5)] w-full h-full bg-gray-900/40 
      after:absolute after:z-50 after:h-1 after:w-[140%] after:border-t after:border-[#EF4444] after:top-1/2 after:translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:rotate-[155.5deg]
      "
      ></div> */}
      {/* <svg
        className="absolute w-full left-0 bottom-0 fill-[#FBBF24]/30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fillOpacity="1"
          d="M0,128L60,138.7C120,149,240,171,360,170.7C480,171,600,149,720,160C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg> */}
      <div className="flex justify-between">
        <div className="task-title">Task 1 Title</div>
        <div className="task-status text-[#34D399] bg-[#34D399]/20">To Do</div>
      </div>
      <div className="task-description">
        Description asdas d asdasdkh kjahskd hkasjdh uqweiahsd
      </div>
      <div className="task-time">10:30am | 25-3-2024</div>
    </motion.div>
  );
};
