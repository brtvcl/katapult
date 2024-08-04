import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import RunDetails from "./RunDetails";

function getRunObject() {
  return Array(41)
    .fill(0)
    .map((_, i) => i)
    .reduce((acc, i) => {
      acc[`>${Math.max(i * 10, 1)}`] = 0;
      acc[`<${Math.max(i * 10, 1)}`] = 0;

      return acc;
    }, {});
}

function App() {
  const [runs, setRuns] = useState([]);
  const [currentRun, setCurrentRun] = useState(getRunObject());
  const [speed, setSpeed] = useState(0);
  const prevSpeed = useRef(0);

  function handleSpeedChange(kmh, timestamp) {
    const baseSpeed = Math.max(Math.floor(kmh / 10) * 10, 1);
    const prevBaseSpeed = Math.max(Math.floor(prevSpeed.current / 10) * 10, 1);

    let sign = "=";

    if (baseSpeed > prevSpeed.current && kmh >= baseSpeed) {
      sign = ">";
    }
    if (kmh < prevSpeed.current && kmh <= prevBaseSpeed) {
      sign = "<";
    }

    if (currentRun[`${sign}${baseSpeed}`] == 0) {
      let baseSpeedToSave = sign == "<" ? prevBaseSpeed : baseSpeed;
      let runUpdate = {
        ...currentRun,
        [`${sign}${baseSpeedToSave}`]: timestamp,
      };

      if (`${sign}${baseSpeedToSave}` == "<1") {
        setRuns([...runs, runUpdate]);
        setCurrentRun(getRunObject());
        return;
      }

      setCurrentRun(runUpdate);
    }

    prevSpeed.current = kmh;
  }

  const navigate = useNavigate();

  return (
    <div>
      <h1>Speed</h1>
      <p>{speed} km/h</p>
      <input
        type="range"
        name=""
        id=""
        value={speed * 10}
        style={{ width: "80%", textAlign: "center" }}
        max="4000"
        onChange={(e) => {
          handleSpeedChange(Number(e.target.value) / 10, new Date().getTime());
          setSpeed(Number(e.target.value) / 10);
        }}
      />
      {runs.map((run, i) => (
        <div
          key={i}
          className="p-4 rounded hover:bg-blue-50 m-4 cursor-pointer"
          // onClick={() => navigate(`/run/${i}`)}
        >
          <RunDetails run={run} />
        </div>
      ))}
    </div>
  );
}

export default App;
