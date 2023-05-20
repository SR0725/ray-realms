import { createContext, useContext, useState } from "react";

export interface JoyStickControllerContextProps {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  setForward: (value: boolean) => void;
  setBackward: (value: boolean) => void;
  setLeft: (value: boolean) => void;
  setRight: (value: boolean) => void;
}

export const JoyStickControllerContext =
  createContext<JoyStickControllerContextProps>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    setForward: () => {},
    setBackward: () => {},
    setLeft: () => {},
    setRight: () => {},
  });

export const JoyStickControllerProvider: React.FC<{
  readonly children: React.ReactNode;
}> = ({ children }) => {
  const [forward, setForward] = useState(false);
  const [backward, setBackward] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  return (
    <JoyStickControllerContext.Provider
      value={{
        forward,
        backward,
        left,
        right,
        setForward,
        setBackward,
        setLeft,
        setRight,
      }}
    >
      {children}
    </JoyStickControllerContext.Provider>
  );
};

export const useJoyStickControllerProvider = () =>
  useContext<JoyStickControllerContextProps>(JoyStickControllerContext);
