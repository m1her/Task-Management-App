import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";

interface ChangeTaskStatusTypes {
  selectedTask: any;
  setInProgress: any;
  setSelectedTask: any;
  setDone: any;
  setToDo: any;
  setTasks: any;
  user: any;
  statusFlag: any;
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
};
