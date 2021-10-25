import { useState } from "react";

export type ControlPanelState = {
  width: number;
  height: number;
  startAngleDeg: number;
  endAngleDeg: number;
  numTicks: number;
  tickStroke: number;
  tickStartRadius: number;
  tickLength: number;
  skipEvery: number;
  weight: number;
};

export const defaultControlPanelState = (): ControlPanelState => ({
  width: 500,
  height: 500,
  startAngleDeg: 20,
  endAngleDeg: 340,
  numTicks: 20,
  tickStroke: 2,
  tickStartRadius: 200,
  tickLength: 20,
  skipEvery: 0,
  weight: 1,
});

export type ControlPanelProps = {
  state: ControlPanelState;
  setState: (newState: ControlPanelState) => void;
};

const NumericInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
}) => {
  const [draftValue, setDraftValue] = useState<string>(value.toString());

  const tryChange = (newValue: string) => {
    setDraftValue(newValue);

    const parsedValue = parseFloat(newValue);

    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <label style={{ flex: "1" }}>{label}</label>
      <input
        style={{ marginLeft: "1em", maxWidth: "100px" }}
        value={draftValue}
        onChange={(e) => tryChange(e.target.value)}
      />
    </div>
  );
};

const ControlPanel = ({ state, setState }: ControlPanelProps) => {
  const setField = (fieldName: string) => (newValue: number) =>
    setState({ ...state, [fieldName]: newValue });

  return (
    <div
      style={{
        marginTop: "3em",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <NumericInput
        label="Width"
        value={state.width}
        onChange={setField("width")}
      />
      <NumericInput
        label="Height"
        value={state.height}
        onChange={setField("height")}
      />

      <NumericInput
        label="Arc Start Angle (degrees)"
        value={state.startAngleDeg}
        onChange={setField("startAngleDeg")}
      />
      <NumericInput
        label="Arc End Angle (degrees)"
        value={state.endAngleDeg}
        onChange={setField("endAngleDeg")}
      />

      <NumericInput
        label="Number of Ticks"
        value={state.numTicks}
        onChange={setField("numTicks")}
      />

      <NumericInput
        label="Tick Stroke"
        value={state.tickStroke}
        onChange={setField("tickStroke")}
      />

      <NumericInput
        label="Tick Start Radius"
        value={state.tickStartRadius}
        onChange={setField("tickStartRadius")}
      />

      <NumericInput
        label="Tick Length"
        value={state.tickLength}
        onChange={setField("tickLength")}
      />

      <NumericInput
        label="Skip Every # ticks"
        value={state.skipEvery}
        onChange={setField("skipEvery")}
      />

      <NumericInput
        label="Distribution Weight"
        value={state.weight}
        onChange={setField("weight")}
      />
    </div>
  );
};

export default ControlPanel;
