import styled from "@emotion/styled";

import { generateColors } from "../colorAlgo";
import { FlexCol } from "../stylePrimitives";

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
`;

const ResultContainer = styled(FlexCol)`
  align-items: center;
  justify-content: center;
`;

type ColorDisplayProps = {
  color: string;
};

const LightDarkModeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ColorDisplay = styled.div<ColorDisplayProps>`
  background-color: ${(props) => props.color};
  padding: 0.25rem 2rem;
`;

const ColorText = styled.span`
  font-size: 1.25rem;
  font-weight: 400;
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
        <FlexCol>
          {r[1].colors.map((c) => {
            return <ColorDisplay color={c.hex}>&nbsp;</ColorDisplay>;
          })}
        </FlexCol>
      </LightDarkModeContainer>
    </ResultContainer>
  );
};

export const ShadeResultsDisplay = ({ colors }: { colors: string[] }) => {
  return (
    <ResultsContainer>
      {colors.map((c) => (
        <Result color={c} />
      ))}
    </ResultsContainer>
  );
};
