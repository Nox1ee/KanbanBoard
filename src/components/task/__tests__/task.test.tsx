import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from '..';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useParams: () => ({ taskId: 'task-1' }),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}), { virtual: true }); // virtual: true позволяет мокать модуль, который Jest не может найти

// Мокаем стили
jest.mock('../style.module.scss', () => ({
  wrapper: 'wrapper',
  header: 'header',
  textarea: 'textarea',
  description: 'description',
  editBtn: 'editBtn',
  saveBtn: 'saveBtn',
  closeBtn: 'closeBtn'
}));

const mockTasks = [
  {
    title: 'Backlog',
    issues: [{ id: 'task-1', name: 'Test Task', description: 'Old description' }]
  }
];
const mockSetTasks = jest.fn();

describe('Task Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Displays task data', () => {
    render(<Task tasks={mockTasks} setTasks={mockSetTasks} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('Switches to edit mode', async () => {
    render(<Task tasks={mockTasks} setTasks={mockSetTasks} />);
    await userEvent.click(screen.getByText(/edit description/i));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('When you close the screen, it returns to the beginning', async () => {
    render(<Task tasks={mockTasks} setTasks={mockSetTasks} />);
    await userEvent.click(screen.getByAltText('close')); 
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});