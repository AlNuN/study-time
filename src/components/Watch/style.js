import styled from 'styled-components';

const Main = styled.main`
  margin: auto;
`;

const MainTitle = styled.h2`
  font-size: 1.5rem;
  padding: 20px 0px;
`;

const Label = styled.label`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pie = styled.div`
  width: 100px; height: 100px;
  border-radius: 50%;
  background: yellowgreen;
  background-image: linear-gradient(to right, transparent 50%, currentColor 0);
  color: #655;
  position: relative;
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
  width: 90px; height: 90px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelSpan = styled.span`
  padding: 5px 0;
`;

export {
  Main,
  MainTitle,
  Label,
  Pie,
  Time,
  LabelSpan,
};
