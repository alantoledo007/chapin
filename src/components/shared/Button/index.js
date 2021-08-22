import styled from "styled-components";

export default function Button(props) {
  const HandleComponent = props.href ? Link : Btn;
  return <HandleComponent {...props} />;
}

const Link = styled.a``;

const Btn = styled.button``;
