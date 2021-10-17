import React from 'react'
import { GameState } from './Enums'
import { formatMilliseconds } from './format'
import { StoryProfile } from './Interfaces'
interface Props {
    storyProfile: StoryProfile|null;
    setGameState: (newGameState: GameState) => void,
}
const EndScreen: React.FC<Props> = ({
  storyProfile,
  setGameState
}) => {
  const info = {
    bestTime: formatMilliseconds(storyProfile?.bestTime || 0),
    lastTime: formatMilliseconds(storyProfile?.lastTime || 0),
    worstTime: formatMilliseconds(storyProfile?.worstTime || 0)
  }
  return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
          <div>
            <h1>The End</h1>
            <h3>Your last time: {info.lastTime}</h3>
            <h3>Your best time: {info.bestTime}</h3>
            <h3>Your worst time: {info.worstTime}</h3>
            <h3
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '32px'
                }}
                onClick={() => setGameState(GameState.StartScreen)}
            >Go back to the start screen</h3>
          </div>
      </div>
  )
}

export default EndScreen
