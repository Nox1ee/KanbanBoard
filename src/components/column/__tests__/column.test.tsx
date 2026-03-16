import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Column from '..';

// 1. Виртуальный мок роутера (решает проблему "Cannot find module")
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}), { virtual: true });

// 2. Мокаем стили
jest.mock('../style.module.scss', () => ({
  column: 'column',
  title: 'title',
  tasksList: 'tasksList',
  task: 'task',
  taskLink: 'taskLink',
  taskTitle: 'taskTitle',
  input: 'input',
  button: 'button',
  submit: 'submit',
  add: 'add'
}));

// 3. Пропсы для тестов
const mockProps = {
  title: 'Backlog',
  tasks: [{ id: '1', name: 'Task 1', description: '' }],
  onAddTask: jest.fn(),
  prevTasks: [],
  onMoveTask: jest.fn(),
};

describe('Column Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renders the title and existing tasks', () => {
    render(<Column {...mockProps} />);
    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });

  test('In Backlog: opens input when you click "Add card" and calls onAddTask', async () => {
    render(<Column {...mockProps} />);
    
    const addBtn = screen.getByRole('button', { name: /add card/i });
    await userEvent.click(addBtn);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    
    await userEvent.type(input, 'New Task');
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitBtn);
    
    expect(mockProps.onAddTask).toHaveBeenCalledWith('Backlog', 'New Task');
  });

  test('In Ready: the button is disabled if there are no tasks in the previous column', () => {
    render(<Column {...mockProps} title="Ready" prevTasks={[]} />);
    const addBtn = screen.getByRole('button');
    expect(addBtn).toBeDisabled();
  });

  test('In Ready: Opens Select if there are tasks to move', async () => {
    const prevTasks = [{ id: '2', name: 'Task from Backlog', description: '' }];
    render(<Column {...mockProps} title="Ready" prevTasks={prevTasks} />);
    
    const addBtn = screen.getByRole('button', { name: /add card/i });
    await userEvent.click(addBtn);
    
    // Ищем placeholder от react-select
    expect(screen.getByText(/Select a task.../i)).toBeInTheDocument();
  });

  test('Closes the form when clicking outside the column', async () => {
    render(<Column {...mockProps} />);
    
    // Открываем форму
    await userEvent.click(screen.getByText(/add card/i));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // Кликаем в пустую область (body)
    await userEvent.click(document.body);
    
    // Ждем, пока форма исчезнет
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  test('Adds a task when pressing Enter in the input', async () => {
    render(<Column {...mockProps} />);
    await userEvent.click(screen.getByText(/add card/i));
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Enter task{enter}');
    
    expect(mockProps.onAddTask).toHaveBeenCalledWith('Backlog', 'Enter task');
  });
});