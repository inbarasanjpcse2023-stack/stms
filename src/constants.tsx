import { ITaskHomeProps } from "src/views/TaskHome/ITaskHomeProps";
import { STATUSES_OBJ } from "./constants";

export const taskSample: ITaskHomeProps[] = [
  {
    id: '1',
    status: STATUSES_OBJ.ADDED,
    items: [],
  },
  {
    id: "2",
    status: STATUSES_OBJ.STARTED,
    items: [],
  },
  {
    id: "3",
    status: STATUSES_OBJ.COMPLETED,
    items: [],
  },
];