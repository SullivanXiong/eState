import styled from "styled-components";

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div`
  text-align: center;
  padding: 10vw;
  background-image: ${props => `url(${props.img})`};
  background-size: cover;
`;

export const CarouselContainer = styled.div`
  display: flex;
  transition: ${props => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${props => {
    if (!props.sliding) return "translateX(calc(-90%))";
    if (props.dir === PREV) return "translateX(calc(2 * (-90%)))";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  box-shadow: 5px 5px 20px 7px rgba(168, 168, 168, 1);
`;

export const CarouselSlot = styled.div`
  flex: 1 0 80%;
  padding-left: 5px;
  padding-right: 5px;
  flex-basis: 90%;
  order: ${props => props.order};
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 75%;
`;

export const ExtraInfo = styled.div`
  margin-top: 25px;
  display: inline-block;
`;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;
