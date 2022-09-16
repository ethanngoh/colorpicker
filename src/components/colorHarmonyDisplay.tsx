import { css } from "@emotion/css";
import styled from "@emotion/styled";
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

const Result = ({ color }: { color: string }) => {
  return (
    <ResultContainer>
      <ColorDisplay color={color} />
      <ColorText>{color}</ColorText>
    </ResultContainer>
  );
};

export const ColorHarmonyDisplay = ({ color, harmony }: { color: string; harmony: HarmonyKey }) => {
  const c = Color(color);
  const hslColor = c.hsl().array();
  const harmonies = HARMONIES[harmony](hslColor[0], hslColor[1], hslColor[2]);

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
        {harmonies.map((harmony) => {
          const c = Color(harmony);
          return <Result color={c.hex()} />;
        })}
      </ResultsContainer>
    </div>
  );
};
