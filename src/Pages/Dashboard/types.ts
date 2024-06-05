export type StatusFlagType = "to-do" | "in-progress" | "done" | "";
export type CrydFlagType = "delete" | "edit" | "";
export type TaskAddOrEditType = "add" | "edit";
export type TaskType = {
  data(): unknown;
  title: string;
  description: string;
  due: string;
  status: "to-do" | "in-progress" | "done";
  id: number;
};
export type TasksType = TaskType[];
