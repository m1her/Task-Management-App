import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";

interface DeleteTaskTypes {
  selectedTask: any;
  setInProgress: any;
  setDone: any;
  setToDo: any;
  setTasks: any;
  user: any;
  setCrudFlag: any;
}

export const DeleteTask = async ({
  selectedTask,
  setInProgress,
  setDone,
  setToDo,
  setTasks,
  user,
  setCrudFlag,
}: DeleteTaskTypes) => {
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
  if (selectedTask?.status === "to-do") {
    setToDo((prev: any) =>
      prev.filter((task: any) => task.id !== selectedTask.id)
    );
  }
  setTasks((prev: any) =>
    prev.filter((task: any) => task.id !== selectedTask.id)
  );
  const q = query(
    collection(db, user?.email || ""),
    where("id", "==", selectedTask.id)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot) {
    const docRef = doc(db, user?.email || "", querySnapshot.docs[0].id);
    deleteDoc(docRef);
  }
  setCrudFlag("");
};
