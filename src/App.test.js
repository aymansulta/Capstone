import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BookingForm from './components/BookingForm';

test('Renders the Header heading', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const headingElement = screen.getByText("Reserve Table");
    expect(headingElement).toBeInTheDocument();

    const reserveButton = screen.getByRole("button");
    fireEvent.click(reserveButton);

    const headingElementNew = screen.getByText("Choose Date");
    expect(headingElementNew).toBeInTheDocument();
})

test('Initialize/Update Times', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const reserveButton = screen.getByRole("button");
  fireEvent.click(reserveButton);

  const testTime = []
  // userEvent.selectOptions(screen.getByLabelText("Choose Time"),screen.getByRole('option', { name: testTime}))
  // expect(screen.getByRole('option', { name: testTime}).selected).toBe(true);


})
describe("BookingForm", () => {
  test('submission is disabled if user did not select all attributes', () => {
    // const submitHandler = jest.fn();
    render(<BookingForm />);
    const submitButton =screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(submitHandler).not.toHaveBeenCalled();
    expect(submitButton).toHaveAttribute("disabled");
  });

  test('should display the form title', () => {
    render(<BookingForm />);
    const title = screen.getByText('Find a table for any occasion');
    expect(title).toBeInTheDocument();
  });

  test('should display date select field', () => {
    render(<BookingForm />);
    const dateSelect = screen.getByRole('select', { name: 'date' });
    expect(dateSelect).toBeInTheDocument();
  });

  test('should display time select field', () => {
    render(<BookingForm />);
    const timeSelect = screen.getByRole('select', { name: 'time' });
    expect(timeSelect).toBeInTheDocument();
  });

  test('should display number of guests input field', () => {
    render(<BookingForm />);
    const guestsInput = screen.getByRole('textbox', { name: 'diners' });
    expect(guestsInput).toBeInTheDocument();
  });

  test('should display occasion select field', () => {
    render(<BookingForm />);
    const occasionSelect = screen.getByRole('select', { name: 'occasion' });
    expect(occasionSelect).toBeInTheDocument();
  });

  test('should display submit button', () => {
    render(<BookingForm />);
    const submitButton = screen.getByRole('button', { type: 'submit' });
    expect(submitButton).toBeInTheDocument();
  });
  test('should disable submit button when no field is filled', () => {
    render(<BookingForm />);
    const submitButton = screen.getByRole('button', { type: 'submit' });
    expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when all fields are filled', () => {
    render(<BookingForm />);
    const dateSelect = screen.getByRole('select', { name: 'date' });
    fireEvent.change(dateSelect, { target: { value: 'Saturday' } });
    const timeSelect = screen.getByRole('select', { name: 'time' });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    const guestsInput = screen.getByRole('textbox', { name: 'diners' });
    fireEvent.change(guestsInput, { target: { value: '2' } });
    const occasionSelect = screen.getByRole('select', { name: 'occasion' });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
    const submitButton = screen.getByRole('button', { type: 'submit' });
    expect(submitButton).toBeEnabled();
  });
})
