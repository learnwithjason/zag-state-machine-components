import * as numberInput from "@zag-js/number-input"
import { useMachine, useSetup } from "@zag-js/react"
import { useState } from "react";

import './App.css';

type NumberPickerProps = {
  min: number;
  max: number;
  initialValue: number;
  onChange: numberInput.Context["onChange"];
}

function NumberPicker({ min = 5, max = 25, initialValue, onChange }: NumberPickerProps) {
  const [state, send] = useMachine(numberInput.machine({
    min,
    max,
    step: 10,
    value: initialValue.toString(),
    onChange,
  }));
  const ref = useSetup({ send, id: "1" })
  const api = numberInput.connect(state, send)

  return (
    <div ref={ref} {...api.rootProps}>
      <label {...api.labelProps}>How many boops?</label>
      <button {...api.decrementButtonProps}>DEC</button>
      <input {...api.inputProps} />
      <button {...api.incrementButtonProps}>INC</button>
      <button data-part="clear-button" onClick={api.clearValue}>CLEAR</button>
      <div {...api.scrubberProps}></div>
    </div>
  )

}

function App() {
  const [currentBoopCount, setBoopCount] = useState(10);

  return (
    <main>
      <h1>TODO: Zag!</h1>
      <NumberPicker
        min={1}
        max={300}
        initialValue={currentBoopCount}
        onChange={(details) => {
          setBoopCount(details.valueAsNumber);
        }}
      />
      <p>
        Neat! You would like {currentBoopCount} boops!
      </p>
    </main>
  )
}

export default App
