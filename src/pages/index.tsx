import styled from "@emotion/styled";
import { ColorResult } from "@uiw/color-convert";
import { Block, Wheel } from "@uiw/react-color";

import React, { useCallback, useEffect, useState } from "react";
import { MultiValue } from "react-select";

import { GRAY_RANGE } from "../colors";
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
        </Frame>
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

        <Frame>
          <H1>Shade Generator</H1>
          <MultiColorInput placeholder={"Type Hex Colors"} input={colors} setInput={setColors} />
        </Frame>
        <Frame>{colors && <ColorResultsDisplay colors={colors.map((c) => c.value)} />}</Frame>
        <Frame>
          <H1>Export</H1>
          {colors && <ColorResultsExport colors={colors.map((c) => c.value)} />}
        </Frame>
      </Content>
    </>
  );
};
