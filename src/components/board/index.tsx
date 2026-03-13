import React from "react"
import Column from "../column"
import { BoardProps } from "../../types";


const Board = ({ tasks, setTasks }: BoardProps) => {

  const addTask = (columnTitle: string, taskName: string) => {
    const newTask = tasks.map(column => {
      if (column.title === columnTitle) {
        return {
          ...column,
          issues: [
            ...column.issues,
            { id: Date.now().toString(), name: taskName, description: '' }
          ]
        };
      }
      return column;
    });
    setTasks(newTask);
  }

  const moveTask = (taskId: string, fromTitle: string, toTitle: string) => {
    const taskToMove = tasks
      .find(col => col.title === fromTitle)
      ?.issues.find(task => task.id === taskId);

    if (!taskToMove) return;

    const nextState = tasks.map(col => {
      if (col.title === fromTitle) {
        return {...col, issues: col.issues.filter(t => t.id !== taskId) };
      }

      if (col.title === toTitle) {
        return {...col, issues: [...col.issues, taskToMove] };
      }

      return col;
    })

    setTasks(nextState) 
  }

  return (
    <>
    {tasks.map((column, index) => {
      const prevTasks = index > 0 ? tasks[index - 1].issues : [];

      return (
        <Column
          key={index}
          title={column.title}
          tasks={column.issues}
          onAddTask={addTask}
          prevTasks={prevTasks}
          onMoveTask={(taskId) => {
            if (index > 0) {
              moveTask(taskId, tasks[index - 1].title, column.title)
            }
          }}
        />
      );
    })}
    </>
  )
}

export default Board;