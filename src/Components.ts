import styled from 'styled-components'
// <div style={{ padding: 16, fontSize: 50, display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', overflowY: 'hidden' }}>
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
  ContainerTitle
}
