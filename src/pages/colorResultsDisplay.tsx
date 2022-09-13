import styled from "@emotion/styled";
import { generateColors } from "../colorAlgo";
import { FlexCol, H1, H2 } from "../stylePrimitives";

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
`;

const ColorDisplay = styled.div<ColorDisplayProps>`
  background-color: ${(props) => props.color};
  padding: 0.25rem 2rem;
`;

const Result = ({ color }: { color: string }) => {
  const r = generateColors(color);
  return (
    <ResultContainer>
      <H2>{color}</H2>
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

export const ColorResultsDisplay = ({ colors }: { colors: string[] }) => {
  return (
    <ResultsContainer>
      {colors.map((c) => (
        <Result color={c} />
      ))}
    </ResultsContainer>
  );
};
