import { render, screen } from "@testing-library/react";

import ListItems from "../ListItems";
// write a test where items that recur, all of which are checked off
// set a date at some point
// verify the list is empty
// travel to the future -- for each time period
//   change the time, verify that the item is back.

test("should render ListItems component", () => {
  render(<ListItems />);
  const liqstItemsElement = screen.getByTestId("test-1");
  // expect(listItemsElement).toBeInTheDocument();
  expect(listItemsElement).toHaveTextContent("Completed Items");
});
