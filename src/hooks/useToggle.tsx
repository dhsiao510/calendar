import { useState } from 'react';

export function useToggle(on: boolean): [boolean, () => void] {
  const [toggle, setToggle] = useState(on);
  const handleToggle = () => setToggle(prevState => !prevState);

  return [toggle, handleToggle]
}