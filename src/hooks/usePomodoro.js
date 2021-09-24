import { useState, useRef, useEffect } from 'react'

// const POMODORO_DURATION = 25 * 60
// const SHORT_BREAK_DURATION = 5 * 60
const POMODORO_DURATION = 5
const SHORT_BREAK_DURATION = 2

export const usePomodoro = () => {
  const [state, setState] = useState({
    secondsElapsed: 0,
    time: POMODORO_DURATION,
    isBreak: false,
  })
  const [isRunning, setIsRunning] = useState(false)
  const [pauseText, setPauseText] = useState('Pause')

  const timer = useRef(null)
  const isPaused = useRef(false)

  const startPomodoro = () => {
    setIsRunning(true)
    timer.current = setInterval(() => {
      if (isPaused.current) return

      setState((prevState) => {
        if (prevState.secondsElapsed === prevState.time) {
          window.clearInterval(timer.current)
          setIsRunning(false)

          return {
            ...prevState,
            time: prevState.isBreak ? POMODORO_DURATION : SHORT_BREAK_DURATION,
            secondsElapsed: 0,
            isBreak: !prevState.isBreak,
          }
        }

        return {
          ...prevState,
          secondsElapsed: prevState.secondsElapsed + 1,
        }
      })
    }, 1000)
  }

  const pausePomodoro = () => {
    isPaused.current = !isPaused.current
    setPauseText(`${isPaused.current ? 'Resume' : 'Pause'}`)
  }

  return {
    ...state,
    isRunning,
    isPaused: isPaused.current,
    pauseText,
    startPomodoro,
    pausePomodoro,
  }
}
