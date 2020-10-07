import React, { useEffect, useState } from 'react';

export default function Watch() {
  const [initialTime, setInitialTime] = useState(25);
  const [time, setTime] = useState(initialTime * 60 * 1000);
  const [timer, setTimer] = useState(false);

  function toggleTimer() {
    if (timer === false && time > 0) {
      setTimer(true);
    }
    if (timer === true && time > 0) {
      setTimer(false);
    }
  }

  useEffect(() => {
    function changeTime() {
      if (timer) setTime(time - 1000);
    }
    const id = setTimeout(changeTime, 1000);
    if (time === 0) setTimer(false);
    return () => {
      clearTimeout(id);
    };
  }, [timer, time]);

  function twoDigits(t) {
    return (`0${t}`).slice(-2);
  }

  function getTime(ms) {
    const minutes = Math.floor((ms % (1000 * 60 * 95)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${twoDigits(minutes)}:${twoDigits(seconds)}`;
  }

  function handleInitialTime(e) {
    if (!timer) {
      setTime(e.target.value * 60 * 1000);
      setInitialTime(e.target.value);
    }
  }

  return (
    <>
      <h2>Be Productive today!</h2>
      <label>
        Set Time
        <input type="range" min="5" max="90" value={initialTime} step="5" onChange={handleInitialTime} />
      </label>
      <div>{getTime(time)}</div>
      <button
        type="button"
        onMouseUp={toggleTimer}
      >
        {timer
          ? 'Stop'
          : 'Start'}
      </button>
    </>
  );
}
