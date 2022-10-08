import styled from "@emotion/styled";
import { isXS } from "../breakpoints";

import { generateColors } from "../colorAlgo";
import { FlexCol, FlexRow } from "../stylePrimitives";

const ResultsContainer = styled(FlexCol)`
  width: 100%;
  justify-content: center;
`;

const ResultContainer = styled(FlexCol)`
  align-items: center;
  justify-content: center;
`;

const ColorChunk = styled(FlexRow)`
  justify-content: space-between;
`;

type ColorDisplayProps = {
  color: string;
};

const LightDarkModeContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
  justify-content: center;
  align-items: center;
`;

const ColorDisplay = styled.div<ColorDisplayProps>`
  background-color: ${(props) => props.color};
  padding: 0.25rem 2rem;
`;

const ColorText = styled.span`
  font-size: 1rem;
  font-family: "Roboto Mono", monospace;
`;

const Result = ({ color }: { color: string }) => {
  const r = generateColors(color);
  return (
    <ResultContainer>
      <ColorText>{color}</ColorText>
      <LightDarkModeContainer>
        <FlexCol>
          {r[0].colors.map((c) => {
            return <ColorDisplay color={c.hex}>&nbsp;</ColorDisplay>;
          })}
        </FlexCol>
        {!isXS() ? (
          <FlexCol>
            {r[1].colors.map((c) => {
              return <ColorDisplay color={c.hex}>&nbsp;</ColorDisplay>;
            })}
          </FlexCol>
        ) : null}
      </LightDarkModeContainer>
    </ResultContainer>
  );
};

export const ShadeResultsDisplay = ({ colors }: { colors: string[] }) => {
  const chunkSize = 5;
  const chunks: string[][] = [];
  for (let i = 0; i < colors.length; i += chunkSize) {
    const chunk = colors.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  return (
    <ResultsContainer gap="0.75rem">
      {chunks.map((colors) => (
        <ColorChunk>
          {colors.map((c) => (
            <Result color={c} />
          ))}
        </ColorChunk>
      ))}
    </ResultsContainer>
  );
};
