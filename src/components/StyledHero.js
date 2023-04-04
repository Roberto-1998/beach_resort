import styled from 'styled-components';
import defaultImg from '../images/room-1.jpeg';

export const StyledHero = styled.header`
  background: url(${(props) => (props.img ? props.img : defaultImg)});
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 66px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
