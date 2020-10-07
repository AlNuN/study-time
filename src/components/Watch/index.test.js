import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Watch from './index';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('renders initial time', () => {
  const { getByText } = render(<Watch />);
  const linkElement = getByText(/25:00/i);
  expect(linkElement).toBeInTheDocument();
});

test('clicking start button triggers countdown', () => {
  const { getByText } = render(<Watch />);
  const button = getByText(/start/i);
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  const result = getByText(/24:55/i);
  expect(result).toBeInTheDocument();
});

test('countdown stops at 00:00', () => {
  const { getByText } = render(<Watch />);
  const button = getByText(/start/i);
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(26 * 60 * 1000);
  });
  const result = getByText(/00:00/i);
  expect(result).toBeInTheDocument();
});
