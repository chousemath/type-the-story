import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import './App.css'
import {
  ContainerMain,
  ContainerTitle,
  ContainerAll,
  Divider1,
  ContainerStory,
  ContainerTyping,
  StorySelection,
  StoryOption,
  StoryOptionText
} from './Components'
import PropTypes from 'prop-types'
import { validKeys } from './ValidKeys'
import { stories } from './Data'
import { GameState, StoryKeys, TextColor, TypedPart } from './Enums'
import StartScreen from './StartScreen'
import { StoryProfile, TypeableOption, UserProfile } from './Interfaces'
import EndScreen from './EndScreen'
import { formatMilliseconds } from './format'
import { PROFILEKEY } from './config'
const defaults: {
  typeableOption: TypeableOption
} = {
  typeableOption: {
    key: StoryKeys.threeLittlePigs,
    title: 'The Three Little Pigs',
    data: [],
    full: 'Hi there',
    left: '',
    right: 'Hi there',
    middle: '',
    part: TypedPart.None,
    leftColor: TextColor.None,
    middleColor: TextColor.None,
    index: 0
  }
}
const HighlightText = ({
  text = '',
  color = TextColor.None
}) => {
  const backgroundColor = color === TextColor.None ? 'transparent' : '#006400'
  return (
    <span style={{ color, backgroundColor }}>
      {text}
    </span>
  )
}
HighlightText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
const TypeableOptionGroup: React.FC<{typeableOption: TypeableOption}> = ({
  typeableOption
}) => {
  return (
    <p>
      <HighlightText text={typeableOption.left} color={typeableOption.leftColor}/>
      <HighlightText text={typeableOption.middle} color={typeableOption.middleColor}/>
      <HighlightText text={typeableOption.right} color={TextColor.None}/>
    </p>
  )
}
TypeableOptionGroup.propTypes = {
  typeableOption: (props, propName, componentName) => {
    const prop = props[propName]
    if (prop !== null) return null
    throw new Error(`${componentName} is missing ${propName}`)
  }
}
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
function App () {
  const typedValue = useRef<string>()
  const timeDiffRef = useRef<number>()
  const startTime = useRef<number>((new Date()).getTime())
  const [timeDiff, setTimeDiff] = useState<number>(0)
  const [totalTimeDiff, setTotalTimeDiff] = useState<number>(0)
  const [profile, setProfile] = useState<UserProfile>({})
  const [storyProfile, setStoryProfile] = useState<StoryProfile|null>(null)
  const [totalTimeDiffPhrase, setTotalTimeDiffPhrase] = useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [gameState, setGameState] = useState(GameState.StartScreen)
  const [story, setStory] = useState<TypeableOption>({
    ...defaults.typeableOption,
    key: stories[0].key,
    title: stories[0].title,
    data: stories[0].story,
    full: stories[0].story[0],
    right: stories[0].story[0]
  })
  const [typed, setTyped] = useState<string>('')
  const resetTimer = () => {
    startTime.current = (new Date()).getTime()
    setTimeDiff(0)
  }
  useEffect(() => {
    console.log(profile)
  }, [profile])
  useEffect(() => {
    if (storyProfile) setGameState(GameState.EndScreen)
  }, [storyProfile])
  useEffect(() => {
    if (gameState === GameState.StartScreen || gameState === GameState.Playing) {
      timeDiffRef.current = 0
      setTotalTimeDiff(0)
      resetTimer()
      setStoryProfile(null)
    } else if (gameState === GameState.EndScreen) {
      resetTimer()
      setTotalTimeDiff(0)
    }
  }, [gameState])
  useEffect(() => {
    const _profile = localStorage.getItem(PROFILEKEY)
    setProfile(_profile ? JSON.parse(_profile) : {})

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.key in validKeys)) return
      setTyped(prev => {
        let newTyped = ''
        if (event.key === 'Backspace') {
          if (!prev) return ''
          newTyped = prev.slice(0, prev.length - 1)
          typedValue.current = newTyped
          return newTyped
        }
        newTyped = `${prev || ''}${event.key}` || ''
        typedValue.current = newTyped
        return newTyped
      })
    }
    document.addEventListener('keydown', handleKeyDown)
    const timerID = setInterval(() => {
      setTimeDiff((new Date()).getTime() - startTime.current)
    }, 1000)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearInterval(timerID)
    }
  }, [])
  useEffect(() => {
    setTotalTimeDiffPhrase(formatMilliseconds(totalTimeDiff))
  }, [totalTimeDiff])
  useEffect(() => {
    setStory(prev => {
      if (typed === prev.full) {
        const diff = totalTimeDiff + timeDiff
        timeDiffRef.current = diff
        setTotalTimeDiff(diff)
        resetTimer()
        // joseph
        let newIndex = prev.index + 1
        if (newIndex >= story.data.length) {
          newIndex = 0
          setProfile(prev => {
            const _profile: StoryProfile = prev[story.key] || { bestTime: -1, lastTime: -1, worstTime: -1 }
            const t = timeDiffRef.current || 0
            _profile.lastTime = t
            _profile.bestTime = _profile.bestTime === -1 ? t : Math.min(_profile.bestTime, t)
            _profile.worstTime = _profile.worstTime === -1 ? t : Math.max(_profile.worstTime, t)
            setStoryProfile(_profile)
            timeDiffRef.current = 0
            const newProfile = { ...prev, [story.key]: _profile }
            localStorage.setItem(PROFILEKEY, JSON.stringify(newProfile))
            return newProfile
          })
        }
        setTyped('')
        return {
          ...prev,
          full: story.data[newIndex],
          left: '',
          middle: '',
          right: story.data[newIndex],
          part: TypedPart.None,
          leftColor: TextColor.None,
          middleColor: TextColor.None,
          index: newIndex
        }
      }
      if (!typed) {
        return {
          ...prev,
          left: '',
          middle: '',
          right: prev.full,
          part: TypedPart.None,
          leftColor: TextColor.None,
          middleColor: TextColor.None
        }
      }
      const start = prev.full.indexOf(typed)
      let part = TypedPart.None
      if (start === -1) {
        return {
          ...prev,
          left: '',
          middle: '',
          right: prev.full,
          part,
          leftColor: TextColor.None,
          middleColor: TextColor.None
        }
      }
      let left = ''
      let right = ''
      let middle = ''
      let leftColor: TextColor
      let middleColor: TextColor
      if (start === 0) {
        part = TypedPart.Left
        left = prev.full.slice(start, typed.length)
        right = prev.full.slice(typed.length, prev.full.length)
        leftColor = TextColor.Highlighted
        middleColor = TextColor.None
      } else {
        part = TypedPart.Middle
        left = prev.full.slice(0, start)
        middle = prev.full.slice(start, start + typed.length)
        right = prev.full.slice(start + typed.length, prev.full.length)
        leftColor = TextColor.None
        middleColor = TextColor.Highlighted
      }
      return {
        ...prev,
        left,
        middle,
        right,
        part,
        leftColor,
        middleColor
      }
    })
  }, [typed])
  const onAfterModalOpen = () => {}
  const onRequestModalClose = () => setModalOpen(false)
  let mainUI = null
  if (gameState === GameState.StartScreen) {
    mainUI = (
      <StartScreen
        setGameState={setGameState}
        setModalOpen={setModalOpen}
        story={story}
        />
    )
  } else if (gameState === GameState.EndScreen) {
    mainUI = (
      <EndScreen
        setGameState={setGameState}
        storyProfile={storyProfile || null} />
    )
  } else {
    mainUI = (
      <>
        <ContainerAll>
          <ContainerMain>
            <ContainerTitle>
              <span style={{ cursor: 'pointer' }} onClick={() => setModalOpen(true)}>{story.title}</span> <span style={{ marginLeft: '16px', cursor: 'pointer' }} onClick={resetTimer}>⏲️ {Math.round(timeDiff / 1000)}s</span><span style={{ marginLeft: '32px' }} >Total Time: {totalTimeDiffPhrase}</span><span style={{ marginLeft: '32px', cursor: 'pointer' }} onClick={() => setGameState(GameState.StartScreen)}>RESTART</span>
            </ContainerTitle>
            <Divider1/>
            <ContainerStory><TypeableOptionGroup typeableOption={story}/></ContainerStory>
            <ContainerTyping>
              <p>{typed}<span className='blink' style={{ color: 'purple' }}>|</span></p>
            </ContainerTyping>
          </ContainerMain>
        </ContainerAll>
      </>
    )
  }
  return (
    <>
      {mainUI}
      <Modal
        isOpen={modalOpen}
        onAfterOpen={onAfterModalOpen}
        onRequestClose={onRequestModalClose}
        style={modalStyle}
        contentLabel="Stories"
        ariaHideApp={false}
      >
        <StorySelection>
          {stories.map((s, index) => {
            return (
              <StoryOption key={`story-${index}`}>
                <StoryOptionText onClick={() => {
                  resetTimer()
                  console.log(s)
                  setStory({
                    ...defaults.typeableOption,
                    key: s.key,
                    title: s.title,
                    data: s.story,
                    full: s.story[0],
                    right: s.story[0]
                  })
                  setModalOpen(false)
                }}>{s.title}</StoryOptionText>
              </StoryOption>
            )
          })}
          <StoryOption>
            <StoryOptionText onClick={() => setModalOpen(false)}>
              Cancel
            </StoryOptionText>
          </StoryOption>
        </StorySelection>
      </Modal>
    </>
  )
}
export default App
