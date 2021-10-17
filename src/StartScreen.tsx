import React from 'react'
import { GameState } from './Enums'
import { TypeableOption } from './Interfaces'
const StartScreen: React.FC<{
    setGameState: (newGameState: GameState) => void,
    setModalOpen: (open: boolean) => void,
    story: TypeableOption
}> = ({ setGameState, setModalOpen, story }) => {
  return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
          <div style={{ flexGrow: 1 }}/>
          <div style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div
            onClick={() => setGameState(GameState.Playing)}
            style={{
              borderRadius: '16px',
              cursor: 'pointer',
              width: '200px',
              height: '90px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#6f9b91',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px'
            }}>Start Typing</div>
          </div>
          <div style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '32px'
          }}>
            <div
            onClick={() => setModalOpen(true)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '24px'
            }}>{story.title}</div>
          </div>
          <div style={{ flexGrow: 1 }}/>
      </div>
  )
}

export default StartScreen
