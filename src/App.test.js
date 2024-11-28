import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('typing into input and displaying todo', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Add a new todo .../i);
  const buttonElement = screen.getByRole('button', { name: /Add Todo/i });

  fireEvent.change(inputElement, { target: { value: 'Send a mail to Dad' } });
  fireEvent.click(buttonElement);

  const todoElement = screen.getByText(/Send a mail to Dad/i);
  expect(todoElement).toBeInTheDocument();
});