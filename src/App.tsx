import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import PropTypes from 'prop-types'
import { validKeys } from './ValidKeys'
import { data } from './Data'
enum TextColor { Highlighted='white', None='black' }
enum TypedPart { None, Left, Middle }
interface TypeableOption {
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
  const defaultStory: TypeableOption = {
    ...defaults.typeableOption,
    full: data[0],
    right: data[0]
  }
  const [story, setStory] = useState<TypeableOption>(defaultStory)
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
        if (newIndex >= data.length) {
          newIndex = 0
        }
        setTyped('')
        return {
          ...prev,
          full: data[newIndex],
          left: '',
          middle: '',
          right: data[newIndex],
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
  return <>
    <div style={{ padding: 16, fontSize: 40, display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <TypeableOptionGroup typeableOption={story}/>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <p style={{ marginTop: 40 }}>{typed}<span className='blink' style={{ color: 'purple' }}>|</span></p>
      </div>
    </div>
    <div style={{ position: 'fixed', left: 0, top: 'calc(100vh / 2 - 1px)', width: '100vw', height: 2, backgroundColor: 'black' }}/>
  </>
}
export default App
