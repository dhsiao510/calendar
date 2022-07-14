import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import Calendar from "../Calendar";
import { mockEvents } from "../../data/events";

afterEach(() => {
  cleanup();
});

test("renders Calendar component", () => {
  render(<Calendar events={mockEvents} />);
  const linkElement = screen.getByTestId("calendar-component");
  expect(linkElement).toBeInTheDocument();
});

test("renders full grid of calendar cells", () => {
  render(<Calendar events={mockEvents} />);
  const calendarGrids = screen.getAllByRole("cell");
  expect(calendarGrids).toHaveLength(42);
});

test("renders the correct number of days for July 2022", () => {
  render(<Calendar events={mockEvents} />);
  const currentMonthDays = screen.getAllByTestId("day");
  expect(currentMonthDays).toHaveLength(31);
});

test("correct starting index of July 2022", () => {
  render(<Calendar events={mockEvents} />);
  const currentMonthDay = screen.getAllByTestId("day")[0];
  expect(currentMonthDay).toHaveTextContent(1);
});

test("renders correct amount of mock events for July 2022", () => {
  render(<Calendar events={mockEvents} />);
  const currentMonthEvents = screen.getAllByTestId("current-month-event");
  expect(currentMonthEvents).toHaveLength(4);
});

test("Event Detail component renders upon clicking on the first day with an event", () => {
  render(<Calendar events={mockEvents} />);
  const currentMonthEvents = screen.getAllByTestId("current-month-event");
  const firstEvent = currentMonthEvents[0];
  fireEvent.click(firstEvent);
  expect(screen.getByTestId("detail")).toBeInTheDocument();
});
