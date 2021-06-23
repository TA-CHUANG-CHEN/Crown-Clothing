import styled from "styled-components";

export const ErrorImageContainer = styled.div`
  width: 50vw;
  height: 50vw;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;
