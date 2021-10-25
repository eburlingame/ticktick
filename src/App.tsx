import React, { useState } from "react";
import ControlPanel, {
  ControlPanelState,
  defaultControlPanelState,
} from "./components/ControlPanel";
import TickImage from "./components/TickImage";

const App = () => {
  const [controlState, setControlState] = useState<ControlPanelState>(
    defaultControlPanelState
  );

  return (
    <div>
      <TickImage state={controlState} />
      <ControlPanel state={controlState} setState={setControlState} />
    </div>
  );
};

export default App;
