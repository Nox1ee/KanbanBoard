import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardProps } from "../../types";
import s from './style.module.scss'
import close from '../../images/close.svg'


const Task = ({ tasks, setTasks }: BoardProps) => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const currentTask = tasks
    .flatMap(col => col.issues)
    .find(t => t.id === taskId);

  const [ desc, setDesc ] = useState(currentTask?.description || '')
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    if (isEditing) {
      updateTask(desc);
    }
    setIsEditing(!isEditing);
  };

  const updateTask = (newDescription: string) => {
    const updatedTasks = tasks.map(column => ({
      ...column,
      issues: column.issues.map(task => 
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    }));
  setTasks(updatedTasks);
};

  if (!currentTask) {
    return (
    <div>
      <h2>Task not found</h2>
      <button onClick={() => navigate('/')}>На главную</button>
    </div>
    )
  }

  return(
    <div className={s.wrapper}>
      <header className={s.header}>
        <h1 className={s.title}>{currentTask.name}</h1>
        <button className={s.closeBtn} onClick={() => navigate('/')}>
          <img src={close} alt="close" />
        </button>
      </header>
      <div className={s.content}>
        {isEditing ? (
          <textarea
            className={s.textarea}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            autoFocus
            onFocus={(e) => {
              const val = e.currentTarget.value;
              e.currentTarget.setSelectionRange(val.length, val.length);
            }}
          />
        ) : (
          <p className={s.description}>
            {desc || "This task has no description"}
          </p>
        )}
      </div>
      <button className={`${s.editBtn} ${isEditing ? s.saveBtn : ''}`} onClick={handleToggleEdit}>
        {isEditing ? 'Save' : 'Edit description'}
      </button>
    </div>
  )
}

export default Task;