import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { usePomodoro } from './hooks/usePomodoro'
import { formatTime } from './utils/formatTime'

export const App = () => {
  const {
    secondsElapsed,
    time,
    isBreak,
    isPaused,
    isRunning,
    pauseText,
    startPomodoro,
    pausePomodoro,
  } = usePomodoro()

  return (
    <section>
      <div className="container">
        <h1 className="title">Pomodoro Tracker</h1>
        <CircularProgressbar
          value={secondsElapsed}
          text={formatTime(time - secondsElapsed)}
          minValue={0}
          maxValue={time}
          styles={buildStyles({
            pathColor: isBreak ? '#3AB499' : '#E046D7',
            textColor: isBreak ? '#3AB499' : '#E046D7',
            trailColor: isBreak
              ? 'rgba(58, 180, 153, 0.2)'
              : 'rgba(224, 70, 215, 0.2)',
          })}
        />

        <button
          className={`button ${isRunning && 'button--disabled'}`}
          onClick={startPomodoro}
          disabled={isRunning}
        >
          Start {isBreak ? 'Break' : 'Pomodoro'}
        </button>
        <button className="button button--dangerous" onClick={pausePomodoro}>
          {pauseText}
        </button>
      </div>
    </section>
  )
}
