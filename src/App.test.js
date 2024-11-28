import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';



describe('Todo app tests', () => {

  test('typing into input and displaying a single todo', () => {
    render(<App />);

    //Test adding and displaying a single todo
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

    // Helper function to add todos
    const addTodos = (todos) => {
      const inputElement = screen.getByPlaceholderText(/Add a new todo .../i);
      const buttonElement = screen.getByRole('button', { name: /Add Todo/i });
      todos.forEach((todo) => {
        fireEvent.change(inputElement, { target: { value: todo } });
        fireEvent.click(buttonElement);
      });
    };

    // adding multiple todos
    addTodos(['Send a mail to Dad', 'Get some gifts for Bae']);

    const todoElements = screen.getAllByTestId('todo'); // Ensure `data-testid` is added in `Todo.jsx`
    expect(todoElements.length).toBe(4); // Initial 2 todos + Added 2 todos
  })


})
