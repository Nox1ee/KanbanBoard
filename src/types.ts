interface Task {
  id: string;
  name: string;
  description: string
}

export interface ColumnData {
  title: string;
  issues: Task[];
}

export interface ColumnProps {
  title: string;
  tasks?: Task[];
  onAddTask: (title: string, name: string) => void;
  prevTasks: Task[];
  onMoveTask: (taskId: string) => void
}

export interface BoardProps {
  tasks: ColumnData[];
  setTasks: React.Dispatch<React.SetStateAction<ColumnData[]>>;
}

export type TaskOption = { value: string; label: string }
