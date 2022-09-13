import styled from "@emotion/styled";

const NodeBox = styled.div``;

const Result = ({ color }: { color: string }) => <NodeBox>{color}</NodeBox>;

export const Results = ({ colors }: { colors: string[] }) => {
  return (
    <div>
      {colors.map((c) => (
        <Result color={c} />
      ))}
    </div>
  );
};
