import styled from "@emotion/styled";
import { ColorResult } from "@uiw/color-convert";
import { color, Colorful } from "@uiw/react-color";
import React, { useState } from "react";
import { MultiValue } from "react-select";

import { HARMONIES, HarmonyKey } from "../colorHarmonies";
import { GRAY_RANGE } from "../colors";
import { ColorHarmonyDisplay } from "../components/colorHarmonyDisplay";
import { ColorHarmonyInput } from "../components/colorHarmonyInput";
import { MultiColorInput, SelectOption } from "../components/multiColorInput";
import { Navigation } from "../components/navbar";
import { ShadeResultsDisplay } from "../components/shadeResultsDisplay";
import { ShadeResultsExport } from "../components/shadeResultsExport";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, H1, H2, HR } from "../stylePrimitives";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 80px;
`;

const Frame = styled(FlexCol)`
  align-items: center;
  gap: 1em;
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
  const [pickedColor, setPickedColor] = useState(color("#123456") as ColorResult);
  const [harmony, setHarmony] = useState(HarmonyKey.analogous);

  return (
    <>
      <Navigation />
      <Content>
        <Frame>
          <H1>Color Picker</H1>
          <ColorPickers>
            <Colorful
              color={pickedColor.hsva}
              onChange={(color) => {
                setPickedColor(color);
              }}
            />
            {/* <Block color={pickedColor.hsva} onChange={(color) => setPickedColor(color)} colors={[]} /> */}
          </ColorPickers>
          <ColorHarmonyInput
            harmonies={Object.keys(HARMONIES) as HarmonyKey[]}
            harmony={harmony}
            setHarmony={setHarmony}
          />
        </Frame>
        <Frame>
          <ColorHarmonyDisplay color={pickedColor} harmony={harmony} />
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
        <HR />
        <Frame>
          <H1>Shade Generator</H1>
          <MultiColorInput placeholder={"Type Hex Colors"} input={colors} setInput={setColors} />
          {colors && <ShadeResultsDisplay colors={colors.map((c) => c.value)} />}
        </Frame>
        <HR />
        <Frame>
          <H1>Export</H1>
          {colors && <ShadeResultsExport colors={colors.map((c) => c.value)} />}
        </Frame>
      </Content>
    </>
  );
};
