import React from "react";

function RunDetails({ run }) {
  const maxSpeed = Object.entries(run)
    .filter(([k, v]) => k.includes(">"))
    .reduce((acc, [k, v]) => {
      const speed = Number(k.slice(1));
      if (speed > acc && v != 0) {
        return speed;
      }

      return acc;
    }, 0);

  const zeroToMaxTime = run[`>${maxSpeed}`] - run[">1"];
  const maxToZeroTime = run[`<${maxSpeed}`] - run["<1"];

  return (
    <div>
      <div>
        0 - {maxSpeed} km/h : {(zeroToMaxTime / 1000).toFixed(2)} secs
      </div>
      <div>
        {maxSpeed} - 0 km/h : {(maxToZeroTime / 1000).toFixed(2)} secs
      </div>
    </div>
  );
}

export default RunDetails;
