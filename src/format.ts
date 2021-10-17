const formatMilliseconds = (ms: number): string => {
  let seconds = Math.round(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  seconds = seconds - 60 * minutes
  return `${minutes}m ${seconds}s`
}

export {
  formatMilliseconds
}
