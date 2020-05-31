import React from "react";
import { shallow } from "enzyme";

import App from "./App";

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without crashing", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter dispaly", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // Find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // Find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("clicking button decrements counter display", () => {
  const counter = 5;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("clicking decrement button show error message if count it tries to decremente when count is 0", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  const errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.text()).toContain("The counter cannot go below 0");
});

test("clicking the increment button when there is a error message, this error message will be disappear", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");
  const errorDisplay = findByTestAttr(wrapper, "error-display");
  expect(errorDisplay.length).toBe(0);
});
