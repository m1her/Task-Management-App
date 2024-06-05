import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { StatusFlagType, TaskType, TasksType } from "./types";
import { User } from "firebase/auth";

interface ChangeTaskStatusTypes {
  selectedTask?: TaskType;
  setInProgress: React.Dispatch<React.SetStateAction<TasksType>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
  setDone: React.Dispatch<React.SetStateAction<TasksType>>;
  setToDo: React.Dispatch<React.SetStateAction<TasksType>>;
  setTasks: React.Dispatch<React.SetStateAction<TasksType | undefined>>;
  user: User | null | undefined;
  statusFlag: StatusFlagType;
}

export const ChangeTaskStatus = async ({
  selectedTask,
  setInProgress,
  setSelectedTask,
  setDone,
  setToDo,
  setTasks,
  user,
  statusFlag,
}: ChangeTaskStatusTypes) => {
  if (selectedTask?.status !== statusFlag) {
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
      setToDo((prev: any) => [...prev, { ...selectedTask, status: "to-do" }]);
    }
    if (statusFlag === "in-progress") {
      setInProgress((prev: any) => [
        ...prev,
        { ...selectedTask, status: "in-progress" },
      ]);
    }
    if (statusFlag === "done") {
      setDone((prev: any) => [...prev, { ...selectedTask, status: "done" }]);
    }
    setTasks((prevTasks: any) =>
      prevTasks.map((task: TaskType) =>
        task.id === selectedTask?.id ? { ...task, status: statusFlag } : task
      )
    );
  }

  if (user) {
    const q = query(
      collection(db, user?.email || ""),
      where("id", "==", selectedTask?.id)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      const docRef = doc(db, user?.email || "", querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        status: statusFlag,
      });
    }
  }
  setSelectedTask(undefined);
};
