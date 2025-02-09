import { CSSProperties, PropsWithChildren, useCallback, useState } from "react";
import PixelArc from "../pixelRenderers/PixelArc";
import RoundedRect from "./RoundedRect";
import Fuzz from "../pixelRenderers/Fuzz";

export default function ButtonPad({
  children,
  radius,
  fillBg,
  fillFg,
  onClick,
  pressed,
  style,
  disabled,
}: PropsWithChildren<{
  fillBg?: CSSProperties["fill"];
  fillFg?: CSSProperties["fill"];
  radius?: number;
  onClick?: VoidFunction;
  pressed?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}>) {
  const [clicked, setClicked] = useState<boolean>();
  // const [width, setWidth] = useState<number>();
  // const [height, setHeight] = useState<number>();

  const _onClick = useCallback(() => {
    if (disabled) return;

    setClicked(true);
    onClick?.();

    setTimeout(() => {
      setClicked(false);
    }, 100);
  }, [onClick, disabled]);

  // const measuredRef = useCallback((node: HTMLDivElement) => {
  //   if (!node) return;

  //   const rect = node.getBoundingClientRect();

  //   const fn = () => {
  //     setWidth(rect.width);
  //     setHeight(rect.height);
  //   };

  //   window.removeEventListener("resize", fn);
  //   window.addEventListener("resize", fn);
  //   fn();
  // }, []);

  const depth = 6;
  const edge = 6;
  const r = radius ?? 4;

  const highlightColor = pressed || clicked ? "#00000044" : "#ffffff88";

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        margin: edge,
        ...style,
      }}
      role="button"
      onClick={_onClick}
    >
      <div
        // ref={measuredRef}
        style={{
          width: "100%",
          height: "100%",
          transform:
            pressed || clicked || disabled
              ? "translate(0px, 0px)"
              : `translate(-${depth / 2}px, -${depth / 2}px)`,
          transition: "transform 40ms",
        }}
      >
        <RoundedRect
          style={{ position: "absolute", inset: 0, zIndex: -1 }}
          fill={fillFg ?? "white"}
          radius={r / 2}
        />
        <PixelArc
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `scale(-1,1)`,
          }}
          width={5}
          height={5}
          pixelSize={1}
          fill={highlightColor}
          radius={3}
          thickness={3}
        />
        <div
          style={{
            position: "absolute",
            height: "calc(100% - 7px)",
            top: 5,
            width: 2,
            background: highlightColor,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "calc(100% - 7px)",
            height: 2,
            left: 5,
            background: highlightColor,
          }}
        />

        {/* {pressed && width && height && (
          <Fuzz
            style={{
              position: "absolute",
              inset: 2,
              borderRadius: 2,
              overflow: "hidden",
              zIndex: -1,
            }}
            width={width - 4}
            height={height - 4}
            density={0.8}
            fill="#ffffff88"
            interval={2000}
            pixelSize={4}
          />
        )} */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>

      <RoundedRect
        fill={fillBg ?? "black"}
        radius={r}
        style={{
          position: "absolute",
          zIndex: -1,
          left: -edge,
          right: -edge,
          top: -edge,
          bottom: -edge,
        }}
      />
    </div>
  );
}
