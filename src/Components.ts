import styled from 'styled-components'
const StoryOptionText = styled.span`
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
`
const StoryOption = styled.div`
    margin-left: 16px; 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const StorySelection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    width: calc(100vw - 32px);
    height: 70px;
    overflow-x: scroll;
`
const ContainerTyping = styled.section`
    display: flex;
    flex: 1;
    width: calc(100vw - 32px);
`
const ContainerStory = styled.section`
    display: flex;
    margin-bottom: 32px;
    width: calc(100vw - 32px);
`
const Divider1 = styled.div`
    width: calc(100vw - 32px);
    height: 2px; 
    margin-bottom: 16px;
    background-color: black;
`
const ContainerAll = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
const ContainerMain = styled.section`
    padding: 16px;
    font-size: 50px;
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    overflowY: hidden;
`
const ContainerTitle = styled.div`
    font-size: 25px;
    display: flex; 
    height: 50px;
    width: calc(100vw - 32px);
    justify-content: flex-start;
    align-items: center;
`

export {
  ContainerMain,
  ContainerTitle,
  ContainerAll,
  Divider1,
  ContainerStory,
  ContainerTyping,
  StorySelection,
  StoryOption,
  StoryOptionText
}
