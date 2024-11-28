import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


const addTodos = (todos) => {
  const inputElement = screen.getByPlaceholderText(/Add a new todo .../i);
  const buttonElement = screen.getByRole('button', { name: /Add Todo/i });
  todos.forEach((todo) => {
    fireEvent.change(inputElement, { target: { value: todo } });
    fireEvent.click(buttonElement);
  });
};

const deleteTodo = (todoText) => {
  const todoElement = screen.getByText(todoText);
  const todoContainer = todoElement.closest('.todo__container'); // Adjust the selector if necessary
  const deleteButton = within(todoContainer).getByTestId('delete');
  fireEvent.click(deleteButton);
};

describe('Todo app tests', () => {
  test('typing into input and displaying a single todo', () => {
    render(<App />);

    // Add and verify a single todo
    const inputElement = screen.getByPlaceholderText(/Add a new todo .../i);
    const buttonElement = screen.getByRole('button', { name: /Add Todo/i });

    fireEvent.change(inputElement, { target: { value: 'Send a mail to Dad' } });
    fireEvent.click(buttonElement);

    const todoElement = screen.getByText(/Send a mail to Dad/i);
    expect(todoElement).toBeInTheDocument();
  });

//Test adding and displaying multiple todos
  test('typing into input and displaying multiple todos', () => {
    render(<App />);

    // Add multiple todos
    addTodos(['Send a mail to Dad', 'Get some gifts for Bae']);

    // Verify all todos are displayed
    const todoElements = screen.getAllByTestId('todo');// Ensure data-testid is added in Todo.jsx
    expect(todoElements.length).toBe(4); // 2 initial todos + 2 added todos
  });

  //Test deleting a todo
  test('delete button removes the correct todo', () => {
    render(<App />);

    addTodos(['Send a mail to Dad', 'Get some gifts for Bae']);
    deleteTodo('Send a mail to Dad');

    // Verify the deleted todo is no longer present
    expect(screen.queryByText('Send a mail to Dad')).not.toBeInTheDocument();

    // Verify the remaining todos count
    const todoElements = screen.getAllByTestId('todo');
    expect(todoElements.length).toBe(3); // 4 - 1 deleted = 3
  });
});
