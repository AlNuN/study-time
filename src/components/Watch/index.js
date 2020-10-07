import React, { useEffect, useState } from 'react';

export default function Watch() {
  const [time, setTime] = useState(25 * 60 * 1000);
  const [timer, setTimer] = useState(false);

  function startTimer() {
    if (timer === false && time > 0) {
      setTimer(true);
    }
  }

  useEffect(() => {
    if (timer) {
      const id = setTimeout(() => { setTime(time - 1000); }, 1000);
      if (time <= 0) clearTimeout(id);
    }
  });

  function twoDigits(t) {
    return (`0${t}`).slice(-2);
  }

  function getTime(ms) {
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${twoDigits(minutes)}:${twoDigits(seconds)}`;
  }

  return (
    <>
      <div>{getTime(time)}</div>
      <button
        type="button"
        onMouseUp={startTimer}
      >
        Start
      </button>
    </>
  );
}
