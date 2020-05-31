import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../../test/testUtils";
import Congrats from "./Congrats";

const defaultPorps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultPorps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test("render withour error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when success prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when success prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "component-message");
  expect(message.text().length).not.toBe(0);
});

test("does not thow warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
