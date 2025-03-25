import { fireEvent, render } from "@testing-library/react-native";
import Counter from "../Counter";

describe("Counter", () => {
  it("displays the current count", () => {
    const { getByTestId } = render(<Counter count={42} onChange={() => {}} />);
    expect(getByTestId("count-display")).toHaveTextContent("42");
  });

  it("uses default count of 0 when count is not provided", () => {
    const { getByTestId } = render(<Counter onChange={() => {}} />);
    expect(getByTestId("count-display")).toHaveTextContent("0");
  });

  it("increments count when + button is pressed", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Counter count={42} onChange={onChange} />);

    fireEvent.press(getByTestId("increment-button"));
    expect(onChange).toHaveBeenCalledWith(43);
  });

  it("decrements count when - button is pressed", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Counter count={42} onChange={onChange} />);

    fireEvent.press(getByTestId("decrement-button"));
    expect(onChange).toHaveBeenCalledWith(41);
  });

  it("prevents count from going below zero", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Counter count={0} onChange={onChange} />);

    fireEvent.press(getByTestId("decrement-button"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows reset confirmation dialog when reset is pressed", () => {
    const { getByTestId, getByText, queryByText } = render(
      <Counter count={42} onChange={() => {}} />
    );

    // Initially, dialog should not be visible
    expect(queryByText("Reset Counter?")).toBeNull();

    // Press reset button
    fireEvent.press(getByTestId("reset-button"));

    // Dialog should be visible with confirm and cancel options
    expect(getByText("Reset Counter?")).toBeTruthy();
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Reset")).toBeTruthy();
  });

  it("resets count to zero when reset is confirmed", () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Counter count={42} onChange={onChange} />
    );

    // Open reset dialog and confirm
    fireEvent.press(getByTestId("reset-button"));
    fireEvent.press(getByText("Reset"));

    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("does not reset count when reset is cancelled", () => {
    const onChange = jest.fn();
    const { getByTestId, getByText } = render(
      <Counter count={42} onChange={onChange} />
    );

    // Open reset dialog and cancel
    fireEvent.press(getByTestId("reset-button"));
    fireEvent.press(getByText("Cancel"));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("formats large numbers with commas", () => {
    const { getByTestId } = render(
      <Counter count={1000} onChange={() => {}} />
    );
    expect(getByTestId("count-display")).toHaveTextContent("1,000");
  });
});
