import React from 'react';
import {
  fireEvent, render, screen,
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
  render(<Watch />);
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  const result = screen.getByText(/24:55/i);
  expect(result).toBeInTheDocument();
});

test('countdown stops at 00:00', () => {
  render(<Watch />);
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(26 * 60 * 1000);
  });
  const result = screen.getByText(/00:00/i);
  expect(result).toBeInTheDocument();
});

test('start/stop button working', async () => {
  render(<Watch />);
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(startButton);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  const result = screen.getByText(/24:59/i);
  expect(result).toBeInTheDocument();
  const stopButton = screen.getByRole('button', { name: /stop/i });
  fireEvent.mouseUp(stopButton);
  await act(async () => {
    jest.advanceTimersByTime(2000);
  });
  const r = screen.getByText(/24:59/i);
  expect(r).toBeInTheDocument();
});

test('slider that sets initial time', () => {
  render(<Watch />);
  const slider = screen.getByRole('slider', { name: /set time/i });
  expect(slider).toBeInTheDocument();

  fireEvent.change(slider, { target: { value: '20' } });
  const result = screen.getByText(/20:00/i);
  expect(result).toBeInTheDocument();
});

test('slider do not change if timer is working', () => {
  render(<Watch />);
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  const slider = screen.getByRole('slider', { name: /set time/i });
  expect(slider).toBeInTheDocument();

  fireEvent.change(slider, { target: { value: '20' } });
  const result = screen.getByText(/24:55/i);
  expect(result).toBeInTheDocument();
});
