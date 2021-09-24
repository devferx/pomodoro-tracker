export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60

  return `${minutes < 10 ? '0' : ''}${minutes}:${
    secondsLeft < 10 ? '0' : ''
  }${secondsLeft}`
}
