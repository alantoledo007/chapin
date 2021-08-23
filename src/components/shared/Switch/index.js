import { Children, cloneElement, useEffect, useState } from "react";

export default function Switch({ value, children }) {
  const [noMatch, setNoMatch] = useState(true);

  const handleMatch = () => {
    setNoMatch(false);
  };

  return Children.map(children, (child) => {
    return cloneElement(child, {
      value,
      onMatch: handleMatch,
      noMatch,
    });
  });
}

export const Case = ({ match, value, children, onMatch }) => {
  useEffect(() => {
    if (match === value) {
      onMatch();
    }
  }, [value]);
  return match === value ? children : null;
};

export const Default = ({ noMatch, children }) => {
  return noMatch ? children : null;
};
