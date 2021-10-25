import { range } from "lodash";
import { useEffect, useRef, useState } from "react";
import { ControlPanelState } from "./ControlPanel";
import CopyableButton from "./CopyableInput";
import easing from "bezier-easing";

export type TickImageProps = {
  state: ControlPanelState;
};

const deg2rad = (degrees: number) => (degrees / 180) * Math.PI;

const distributeInRange = (index: number, numTicks: number, weight: number) => {
  return Math.pow(index / numTicks, weight);
};

const tickPosition = (index: number, state: ControlPanelState) => {
  const {
    width,
    height,
    startAngleDeg,
    endAngleDeg,
    numTicks,
    tickStartRadius,
    tickLength,
    weight,
  } = state;

  const [centerX, centerY] = [width / 2, height / 2];

  const angleRange = endAngleDeg - startAngleDeg;

  const angle =
    startAngleDeg +
    distributeInRange(index, numTicks - 1, weight) * angleRange -
    90;

  const innerRadius = tickStartRadius;
  const outerRadius = tickStartRadius + tickLength;

  const x1 = centerX + innerRadius * Math.cos(deg2rad(angle));
  const y1 = centerY + innerRadius * Math.sin(deg2rad(angle));

  const x2 = centerX + outerRadius * Math.cos(deg2rad(angle));
  const y2 = centerY + outerRadius * Math.sin(deg2rad(angle));

  return { x1, y1, x2, y2 };
};

const TickImage = ({ state }: TickImageProps) => {
  const { width, height, numTicks, tickStroke, skipEvery } = state;

  const ref = useRef<any>();

  const [svgText, setSvgText] = useState("");

  useEffect(() => {
    if (ref.current) {
      setSvgText(ref.current.outerHTML);
    }
  }, [ref, state]);

  return (
    <div
      style={{
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #000",
          width: `${width}px`,
          height: `${height}px`,
          marginBottom: "1em",
        }}
      >
        <svg ref={ref} width={width} height={height}>
          {range(numTicks)
            .filter((index) => index % skipEvery !== 0)
            .map((index) => {
              const { x1, y1, x2, y2 } = tickPosition(index, state);

              return (
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  style={{ strokeWidth: tickStroke, stroke: "#000" }}
                />
              );
            })}
        </svg>
      </div>

      <CopyableButton text={svgText} />
    </div>
  );
};

export default TickImage;
