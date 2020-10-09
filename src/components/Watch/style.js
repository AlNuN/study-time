import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const Main = styled.main`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
`;

const MainTitle = styled.h2`
  font-size: 1.8rem;
  padding: 20px 0px;
  color: ${(props) => props.theme.source} ;
`;

const Label = styled.label`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pie = styled.div`
  width: 200px; height: 200px;
  border-radius: 50%;
  background: ${(props) => props.theme.inner};
  background-image: linear-gradient(to right, transparent 50%, currentColor 0%);
  color: ${(props) => props.theme.source};
  position: relative;
  grid-area: circle;
  &::before {
    content: '';
    display: block;
    margin-left: 50%;
    height: 100%;
    border-radius: 0 100% 100% 0 / 50%;
    background-color: ${(props) => ((props.currentTime > ((props.initialTime * 60 * 1000) / 2))
    ? 'currentColor' : 'inherit')};
    transform-origin: left;
    transform: ${(props) => {
    const initialTime = (props.initialTime * 60 * 1000);
    let x = (props.currentTime * 1) / initialTime;
    if (props.currentTime > initialTime / 2) x -= 0.5;
    return `rotate(${x}turn)`;
  }};
  }
`;

const Time = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 190px; height: 190px;
  border-radius: 50%;
  background: ${(props) => props.theme.inner};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #655;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LabelSpan = styled.span`
  padding: 5px 0;
  font-size: 1.2rem;
  font-family: sans-serif;
  color: ${(props) => props.theme.source};
`;

const Button = styled.button`
  background: #19297C;
  border-radius: 30px;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 5px 15px;
  margin-bottom: 5px;
  border: 1px ${(props) => props.theme.source} solid;
  &:active, &:checked {
    box-shadow: .05em .1em .2em rgba(0,0,0,.6) inset;
  }
`;

const Slider = styled.input`
  transform: scale(1.5);
`;

const StyledModal = styled(Modal)`
  width: 300px;
  height: 200px;
  margin: calc(50vh - 100px) auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; 
  border-radius: 20px;

  background: hsla(0,0%,100%) border-box;
  overflow: hidden;
  border-radius: .3em;
  box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
              0 .5em 1em rgba(0, 0, 0, 0.6);
  text-shadow: 0 1px 1px hsla(0,0%,100%,.3);

  &:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: -30px;
    z-index: -1;
    -webkit-filter: blur(20px);
    filter: blur(20px);
}

  h3{
    font-size: 2rem;
    text-align: center;
    color: Black;
  }

  button{
    margin-top: 20px;
  }
`;

const Progress = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.done ? 'yellowgreen' : 'gray')};
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px ${(props) => props.theme.source} solid;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-areas: '. . circle progress';

  aside{
    grid-area: progress;
  }
`;

export {
  Main,
  MainTitle,
  Label,
  Pie,
  Time,
  LabelSpan,
  Button,
  Slider,
  StyledModal,
  Progress,
  FlexContainer,
};
