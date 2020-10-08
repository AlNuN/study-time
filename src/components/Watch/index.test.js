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

test('start/giveup button working', async () => {
  render(<Watch />);
  const startButton = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(startButton);
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  const result = screen.getByText(/24:59/i);
  expect(result).toBeInTheDocument();
  const stopButton = screen.getByRole('button', { name: /give up/i });
  fireEvent.mouseUp(stopButton);
  await act(async () => {
    jest.advanceTimersByTime(2000);
  });
  const r = screen.getByText(/25:00/i);
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

test('open modal once time has depleted', () => {
  render(<Watch />);
  const slider = screen.getByRole('slider', { name: /set time/i });
  fireEvent.change(slider, { target: { value: '5' } });
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(10000 * 60);
  });
  const finalTime = screen.getByText(/00:00/i);
  expect(finalTime).toBeInTheDocument();
  const congratulations = screen.getByText(/Congratulations/i);
  expect(congratulations).toBeInTheDocument();
});

test('change to rest time UI once modal is closed', () => {
  render(<Watch />);
  const slider = screen.getByRole('slider', { name: /set time/i });
  fireEvent.change(slider, { target: { value: '5' } });
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(10000 * 60);
  });
  const finalTime = screen.getByText(/00:00/i);
  expect(finalTime).toBeInTheDocument();
  const congratulations = screen.getByText(/Congratulations/i);
  expect(congratulations).toBeInTheDocument();
  const closeModalButton = screen.getByRole('button', { name: /close/i });
  fireEvent.mouseUp(closeModalButton);

  const restMessage = screen.getByText(/rest time/i);
  expect(restMessage).toBeInTheDocument();
  const restSlider = screen.getByRole('slider', { name: /set time/i });
  expect(restSlider).toHaveAttribute('min', expect.stringContaining('1'));
  expect(restSlider).toHaveAttribute('max', expect.stringContaining('60'));
  expect(restSlider).toHaveAttribute('step', expect.stringContaining('1'));
  const newTime = screen.getByText(/05:00/i);
  expect(newTime).toBeInTheDocument();
});

test('rest time has button that skip rest when clicked', async () => {
  render(<Watch />);
  const slider = screen.getByRole('slider', { name: /set time/i });
  fireEvent.change(slider, { target: { value: '5' } });
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(10000 * 60);
  });
  const finalTime = screen.getByText(/00:00/i);
  expect(finalTime).toBeInTheDocument();
  const congratulations = screen.getByText(/Congratulations/i);
  expect(congratulations).toBeInTheDocument();
  const closeModalButton = screen.getByRole('button', { name: /close/i });
  fireEvent.mouseUp(closeModalButton);

  const restMessage = screen.getByText(/rest time/i);
  expect(restMessage).toBeInTheDocument();
  const restSlider = screen.getByRole('slider', { name: /set time/i });
  expect(restSlider).toHaveAttribute('min', expect.stringContaining('1'));
  expect(restSlider).toHaveAttribute('max', expect.stringContaining('60'));
  expect(restSlider).toHaveAttribute('step', expect.stringContaining('1'));
  const newTime = screen.getByText(/05:00/i);
  expect(newTime).toBeInTheDocument();

  const restStartButton = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(restStartButton);
  await act(async () => {
    jest.advanceTimersByTime(1000 * 60);
  });

  const skipRestButton = screen.getByRole('button', { name: /skip/i });
  fireEvent.mouseUp(skipRestButton);

  await act(async () => {
    jest.advanceTimersByTime(1000 * 60);
  });
  const newOldTime = screen.getByText(/25:00/i);
  expect(newOldTime).toBeInTheDocument();
});

test('change back to normal once rest modal is closed', async () => {
  render(<Watch />);
  const slider = screen.getByRole('slider', { name: /set time/i });
  fireEvent.change(slider, { target: { value: '5' } });
  const button = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(button);
  act(() => {
    jest.advanceTimersByTime(10000 * 60);
  });
  const finalTime = screen.getByText(/00:00/i);
  expect(finalTime).toBeInTheDocument();
  const congratulations = screen.getByText(/Congratulations/i);
  expect(congratulations).toBeInTheDocument();
  const closeModalButton = screen.getByRole('button', { name: /close/i });
  fireEvent.mouseUp(closeModalButton);

  const restMessage = screen.getByText(/rest time/i);
  expect(restMessage).toBeInTheDocument();
  const restSlider = screen.getByRole('slider', { name: /set time/i });
  expect(restSlider).toHaveAttribute('min', expect.stringContaining('1'));
  expect(restSlider).toHaveAttribute('max', expect.stringContaining('60'));
  expect(restSlider).toHaveAttribute('step', expect.stringContaining('1'));
  const newTime = screen.getByText(/05:00/i);
  expect(newTime).toBeInTheDocument();

  const restButton = screen.getByRole('button', { name: /start/i });
  fireEvent.mouseUp(restButton);
  await act(async () => {
    jest.advanceTimersByTime(6000 * 60);
  });
  const restTimeOver = screen.getByText(/00:00/i);
  expect(restTimeOver).toBeInTheDocument();
  const getBack = screen.getByText(/rest time over/i);
  expect(getBack).toBeInTheDocument();
  const closeRestModalButton = screen.getByRole('button', { name: /close/i });
  fireEvent.mouseUp(closeRestModalButton);

  const newOldTime = screen.getByText(/25:00/i);
  expect(newOldTime).toBeInTheDocument();
});