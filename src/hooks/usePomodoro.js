import { useState, useRef, useEffect } from 'react'

const POMODORO_DURATION = 25 * 60
const SHORT_BREAK_DURATION = 5 * 60

export const usePomodoro = () => {
  const [time, setTime] = useState(POMODORO_DURATION)
  const [isBreak, setIsBreak] = useState(false)
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timer = useRef(null)

  const startPomodoro = () => {
    setIsRunning(true)
    timer.current = setInterval(() => {
      let isPausedTimer = false

      setIsPaused((prevState) => {
        isPausedTimer = prevState
        return prevState
      })

      if (isPausedTimer) return

      setSecondsElapsed((prevState) => prevState + 1)
    }, 1000)
  }

  const pausePomodoro = () => setIsPaused(!isPaused)

  useEffect(() => {
    if (secondsElapsed === time) {
      window.clearInterval(timer.current)
      setIsRunning(false)

      setSecondsElapsed(0)
      setIsBreak(!isBreak)
      setTime(isBreak ? POMODORO_DURATION : SHORT_BREAK_DURATION)
    }
  }, [secondsElapsed])

  return {
    secondsElapsed,
    isBreak,
    time,
    isRunning,
    isPaused,
    startPomodoro,
    pausePomodoro,
  }
}
