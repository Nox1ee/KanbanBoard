import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from '../layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Task from '../task';
import { dataMock } from '../../data';
import { ColumnData } from '../../types';
import Board from '../board';


function App() {
   const [tasks, setTasks] = useState<ColumnData[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : dataMock;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const basename = process.env.PUBLIC_URL || '/'; // Чтобы работала и на GHPages и локально

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout tasks={tasks} />}>
          <Route index element={<Board tasks={tasks} setTasks={setTasks} />} />
          <Route path="tasks/:taskId" element={<Task tasks={tasks} setTasks={setTasks} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
