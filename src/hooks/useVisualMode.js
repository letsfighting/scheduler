import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
      setHistory(history);
      setHistory((history) => [...history, newMode]);

      setMode(newMode);
    } else {
      setHistory((history) => [...history, newMode]);
      console.log("trans history: ", history);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      const array = [...history];
      array.pop();
      setMode(array.slice(-1)[0]);
      setHistory(array);
    }
  }

  return { mode, transition, back };
}
