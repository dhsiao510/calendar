import { screen, render, cleanup } from "@testing-library/react";
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
