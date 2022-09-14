import styled from "@emotion/styled";
import { ColorResult } from "@uiw/color-convert";
import { Block, Wheel } from "@uiw/react-color";
import { useState } from "react";
import { MultiValue } from "react-select";

import { HARMONIES } from "../colorHarmonies";
import { GRAY_RANGE } from "../colors";
import { ColorHarmonyInput } from "../components/colorHarmonyInput";
import { MultiColorInput, SelectOption } from "../components/multiColorInput";
import { Navigation } from "../components/navbar";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, H1 } from "../stylePrimitives";
import { ColorResultsDisplay } from "./colorResultsDisplay";
import { ColorResultsExport } from "./colorResultsExport";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 80px;
`;

const Frame = styled(FlexCol)`
  align-items: center;
  padding: 1rem;
  gap: 1em;
  border-bottom: 1px solid white;
`;
const ColorPickers = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const Index = () => {
  useBackgroundColor(GRAY_RANGE[900]);
  useTextColor(GRAY_RANGE[0]);

  const [colors, setColors] = useState<MultiValue<SelectOption>>([
    { label: "#abcdef", value: "#abcdef" },
    { label: "#123456", value: "#123456" },
    { label: "#987654", value: "#987654" }
  ]);
  const [pickedColor, setPickedColor] = useState({ hsva: { h: 0, s: 0, v: 68, a: 1 } } as ColorResult);
  const [harmony, setHarmony] = useState("analogous");

  return (
    <>
      <Navigation />
      <Content>
        <Frame>
          <H1>Color Picker</H1>
          <ColorPickers>
            <Wheel
              color={pickedColor.hsva}
              onChange={(color) => {
                setPickedColor(color);
              }}
            />
            <Block color={pickedColor.hsva} onChange={(color) => setPickedColor(color)} colors={[]} />
          </ColorPickers>
          <ColorHarmonyInput harmonies={Object.keys(HARMONIES)} harmony={harmony} setHarmony={setHarmony} />
          <button
            onClick={(e) => {
              setColors([
                ...colors,
                {
                  label: pickedColor.hex,
                  value: pickedColor.hex
                }
              ]);
            }}
          >
            Pick
          </button>
        </Frame>
        <Frame>
          <H1>Shade Generator</H1>
          <MultiColorInput placeholder={"Type Hex Colors"} input={colors} setInput={setColors} />
          {colors && <ColorResultsDisplay colors={colors.map((c) => c.value)} />}
        </Frame>
        <Frame>
          <H1>Export</H1>
          {colors && <ColorResultsExport colors={colors.map((c) => c.value)} />}
        </Frame>
      </Content>
    </>
  );
};
