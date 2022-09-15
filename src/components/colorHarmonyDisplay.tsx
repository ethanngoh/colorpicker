import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ColorResult, HslColor } from "@uiw/react-color";
import Color from "color";
import { AiFillCaretDown } from "react-icons/ai";

import { HARMONIES, HarmonyKey } from "../colorHarmonies";
import { FlexCol, H2 } from "../stylePrimitives";

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
`;

const ResultContainer = styled(FlexCol)`
  justify-content: center;
`;

type ColorDisplayProps = {
  color: string;
};

const ColorDisplay = styled.div<ColorDisplayProps>`
  background-color: ${(props) => props.color};
  padding: 2rem;
  margin-bottom: 0.25rem;
`;

const ColorText = styled.span`
  font-size: 1rem;
  font-family: "Roboto Mono", monospace;
`;

const Result = ({ color }: { color: HslColor }) => {
  const c = Color(color);
  return (
    <ResultContainer>
      <ColorDisplay color={c.hex()} />
      <ColorText>{c.hex()}</ColorText>
    </ResultContainer>
  );
};

export const ColorHarmonyDisplay = ({ color, harmony }: { color: ColorResult; harmony: HarmonyKey }) => {
  const hslColor = color.hsl;
  const colors = HARMONIES[harmony](hslColor.h, hslColor.s, hslColor.l);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <H2>
        <AiFillCaretDown />
      </H2>
      <ResultsContainer>
        {colors.map((c) => (
          <Result color={c} />
        ))}
      </ResultsContainer>
    </div>
  );
};
