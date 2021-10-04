import React, { useEffect, useRef, useState } from 'react'
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
enum TextColor { Highlighted='white', None='black' }
enum TypedPart { None, Left, Middle }
interface TypeableOption {
  title: string;
  data: Array<string>;
  full: string;
  left: string;
  right: string;
  middle: string;
  part: TypedPart;
  leftColor: TextColor;
  middleColor: TextColor;
  index: number;
}
const defaults: {
  typeableOption: TypeableOption
} = {
  typeableOption: {
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
function App () {
  const typedValue = useRef<string>()
  const [story, setStory] = useState<TypeableOption>({
    ...defaults.typeableOption,
    data: stories[0].story,
    full: stories[0].story[0],
    right: stories[0].story[0]
  })
  const [typed, setTyped] = useState<string>('')
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key)
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
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  useEffect(() => {
    setStory(prev => {
      if (typed === prev.full) {
        let newIndex = prev.index + 1
        if (newIndex >= story.data.length) {
          newIndex = 0
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
      console.log(`start: ${start}`)
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
  return (
    <ContainerAll>
      <ContainerMain>
        <ContainerTitle>{story.title}</ContainerTitle>
        <Divider1/>
        <ContainerStory><TypeableOptionGroup typeableOption={story}/></ContainerStory>
        <ContainerTyping>
          <p>{typed}<span className='blink' style={{ color: 'purple' }}>|</span></p>
        </ContainerTyping>
        <StorySelection>
          {stories.map((s, index) => {
            return (
              <StoryOption key={`story-${index}`}>
                <StoryOptionText onClick={() => {
                  setStory({
                    ...defaults.typeableOption,
                    title: s.title,
                    data: s.story,
                    full: s.story[0],
                    right: s.story[0]
                  })
                }}>{s.title}</StoryOptionText>
              </StoryOption>
            )
          })}
        </StorySelection>
      </ContainerMain>
    </ContainerAll>
  )
}
export default App
