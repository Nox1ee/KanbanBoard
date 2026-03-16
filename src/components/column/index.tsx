import s from './style.module.scss'
import addCard from '../../images/add-card.svg'
import { useEffect, useMemo, useRef, useState } from 'react';
import { ColumnProps, TaskOption } from '../../types'
import Select, { SingleValue } from 'react-select';
import { SELECT_STYLE } from '../../data';
import { Link } from 'react-router-dom';


const Column = ({ title, tasks = [], onAddTask, prevTasks, onMoveTask }: ColumnProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const columnRef = useRef<HTMLDivElement>(null)

  const options = useMemo(() => 
    prevTasks.map(task => ({ value: task.id, label: task.name })), 
  [prevTasks]);

  useEffect(() => {
    if (isFormOpen) {
      inputRef.current?.focus();
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (isFormOpen && columnRef.current && !columnRef.current.contains(e.target as Node)) {
        setIsFormOpen(false);
        setInputValue('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);


  const handleClick = () => {
    if (!isFormOpen) {
      if (title !== 'Backlog' && prevTasks.length === 0) return;

      setIsFormOpen(true);
      return;
    }

    if (isFormOpen && title === 'Backlog' && inputValue.trim()) {
      onAddTask(title, inputValue.trim())
      setInputValue('');
      setIsFormOpen(false);
    }
  };

  const handleReactSelectChange = (newValue: SingleValue<TaskOption>) => {
    if (newValue) {
      onMoveTask(newValue.value);
      setIsFormOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        onAddTask(title, inputValue.trim())
        setInputValue('');
        setIsFormOpen(false);
      }
    }
  }

  return (
    <div className={s.column} ref={columnRef}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.tasksList}>
        {tasks.map(task => {
          return (
            <div key={task.id} className={s.task}>
              <Link to={`/tasks/${task.id}`} className={s.taskLink}>
                <h3 className={s.taskTitle}>{task.name}</h3>
              </Link>
            </div>
          )
        })}

        {isFormOpen && (
          title === 'Backlog' ? (
            <div className={s.task}>
              <input
                ref={inputRef}
                className={s.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <Select 
              options={options} 
              styles={SELECT_STYLE}
              placeholder="Select a task..."
              onChange={handleReactSelectChange}
            />
          )
        )}
      </div>
      <button
        className={`${s.button} ${isFormOpen && title === 'Backlog' ? s.submit : s.add}`}
        onClick={handleClick}
        disabled={(title !== 'Backlog' && prevTasks.length === 0) || (isFormOpen && title === 'Backlog' && !inputValue.trim())}
      >
        {(!isFormOpen || title !== 'Backlog') && <img src={addCard} alt="add-card" />}
        {isFormOpen && title === 'Backlog' ? 'Submit' : 'Add card'}
      </button>
    </div>
  )
}

export default Column;