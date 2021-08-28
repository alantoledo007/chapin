import { Children, cloneElement } from "react";

export default function If({ predicate, children }) {
  return Children.map(children, (child) => {
    return cloneElement(child, { predicate });
  });
}

export const Then = ({ predicate, children }) => {
  return predicate ? children : null;
};

export const Else = ({ predicate, children }) => {
  return !predicate ? children : null;
};
