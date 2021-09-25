import { useState, useRef, useEffect } from 'react'

// const POMODORO_DURATION = 25 * 60
// const SHORT_BREAK_DURATION = 5 * 60
const POMODORO_DURATION = 5
const SHORT_BREAK_DURATION = 3

export const usePomodoro = () => {
  const [time, setTime] = useState(POMODORO_DURATION)
  const [isBreak, setIsBreak] = useState(false)
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [pauseText, setPauseText] = useState('Pause')

  const timer = useRef(null)
  const isPaused = useRef(false)

  const startPomodoro = () => {
    setIsRunning(true)
    timer.current = setInterval(() => {
      if (isPaused.current) return

      setSecondsElapsed((prevState) => prevState + 1)
    }, 1000)
  }

  useEffect(() => {
    if (secondsElapsed === time) {
      window.clearInterval(timer.current)
      setIsRunning(false)

      setSecondsElapsed(0)
      setIsBreak(!isBreak)
      setTime(isBreak ? POMODORO_DURATION : SHORT_BREAK_DURATION)
    }
  }, [secondsElapsed])

  const pausePomodoro = () => {
    isPaused.current = !isPaused.current
    setPauseText(`${isPaused.current ? 'Resume' : 'Pause'}`)
  }

  return {
    secondsElapsed,
    isBreak,
    time,
    isRunning,
    isPaused: isPaused.current,
    pauseText,
    startPomodoro,
    pausePomodoro,
  }
}
