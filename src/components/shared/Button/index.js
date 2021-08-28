import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const A = styled(Link)``;
const Btn = styled.button``;

const Button = forwardRef((props, ref) => {
  const Component = props.to ? A : Btn;
  return <Component {...props} ref={ref} />;
});

export default Button;
