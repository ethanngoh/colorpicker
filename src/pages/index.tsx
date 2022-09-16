import styled from "@emotion/styled";
import Color from "color";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { MultiValue } from "react-select";

import { HARMONIES, HarmonyKey } from "../colorHarmonies";
import { GRAY_RANGE } from "../colors";
import { ColorHarmonyDisplay } from "../components/colorHarmonyDisplay";
import { ColorHarmonyInput } from "../components/colorHarmonyInput";
import { MultiColorInput } from "../components/multiColorInput";
import { Navigation } from "../components/navbar";
import { SelectOption } from "../components/selectBase";
import { ShadeResultsDisplay } from "../components/shadeResultsDisplay";
import { ShadeResultsExport } from "../components/shadeResultsExport";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, H1, HR } from "../stylePrimitives";

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

  const [colors, setColors] = useState<MultiValue<SelectOption>>([]);
  const [pickedColor, setPickedColor] = useState("#b32aa9");
  const [harmony, setHarmony] = useState(HarmonyKey.analogous);

  return (
    <>
      <Navigation />
      <Content>
        <Frame>
          <H1>Color Picker</H1>
          <ColorPickers>
            <HexColorPicker color={pickedColor} onChange={setPickedColor} />
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
              const c = Color(pickedColor);
              const hslColor = c.hsl().array();
              const harmonies = HARMONIES[harmony](hslColor[0], hslColor[1], hslColor[2]);

              const harmonySelects = harmonies.map((h) => {
                const c = Color(h);
                return {
                  label: c.hex(),
                  value: c.hex()
                };
              });

              setColors([...colors, ...harmonySelects]);
            }}
          >
            Use Colors
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
