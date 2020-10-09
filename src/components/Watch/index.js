import React, { useEffect, useState } from 'react';
import UIfx from 'uifx';
import alarmMp3 from '../../assets/alarm.mp3';
import {
  Main, MainTitle, Label, Pie, Time, LabelSpan, Button, Slider, StyledModal,
} from './style';

const alarmSound = new UIfx(
  alarmMp3,
  {},
);

export default function Watch() {
  const [initialTime, setInitialTime] = useState(25);
  const [time, setTime] = useState(initialTime * 60 * 1000);
  const [isTimerRunning, setTimerRunning] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inRest, setInRest] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    if (!inRest) {
      setInRest(true);
      setInitialTime(5);
      setTime(5 * 60 * 1000);
    } else {
      setInRest(false);
      setInitialTime(25);
      setTime(25 * 60 * 1000);
    }
  }

  function skipRest() {
    setTimerRunning(false);
    setInRest(false);
    setInitialTime(25);
    setTime(25 * 60 * 1000);
  }

  function toggleTimer() {
    if (time > 0) {
      if (isTimerRunning) {
        setTimerRunning(false);
        setTime(initialTime * 60 * 1000);
      } else setTimerRunning(true);
    }
  }

  function handleInitialTime(e) {
    if (!isTimerRunning) {
      setTime(e.target.value * 60 * 1000);
      setInitialTime(e.target.value);
    }
  }

  useEffect(() => {
    function changeTime() {
      if (isTimerRunning) setTime(time - 1000);
    }
    const id = setTimeout(changeTime, 1000);
    if (time <= 0) {
      setTimerRunning(false);
      alarmSound.play();
      openModal();
    }
    return () => {
      clearTimeout(id);
    };
  }, [isTimerRunning, time]);

  function twoDigits(t) {
    return (`0${t}`).slice(-2);
  }

  function getTime(ms) {
    const minutes = Math.floor((ms % (1000 * 60 * 95)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${twoDigits(minutes)}:${twoDigits(seconds)}`;
  }

  return (
    <Main>
      <MainTitle>
        {inRest
          ? 'Rest Time!'
          : 'Be Productive today!'}
      </MainTitle>
      <Label>
        <Pie
          initialTime={initialTime}
          currentTime={time}
          inRest={inRest}
        >
          <Time className="time">{getTime(time)}</Time>
        </Pie>
        <LabelSpan>Set Time</LabelSpan>
        <Slider
          type="range"
          min={inRest ? '1' : '5'}
          max={inRest ? '60' : '90'}
          step={inRest ? '1' : '5'}
          value={initialTime}
          onChange={handleInitialTime}
        />
      </Label>
      <Button
        type="button"
        onMouseUp={toggleTimer}
      >
        {isTimerRunning
          ? 'Give Up'
          : 'Start'}
      </Button>
      {inRest
        && (
        <Button
          type="button"
          onMouseUp={skipRest}
        >
          Skip rest
        </Button>
        )}
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Congratulations message"
      >
        <h3>
          {inRest
            ? 'Rest Time Over!'
            : "Congratulations, you've completed your task!"}
        </h3>
        <Button
          type="button"
          onMouseUp={closeModal}
        >
          Close
        </Button>
      </StyledModal>
    </Main>
  );
}
