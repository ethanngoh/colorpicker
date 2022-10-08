import styled from "@emotion/styled";
import { breakpoint } from "./breakpoints";

export const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

export const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const H3 = styled.h3`
  font-size: 1.25rem;
  font-weight: 300;
`;

export const HR = styled.hr`
  border: 0;
  border-bottom: 1px solid white;
  width: 50%;
  margin: 2rem 0;
`;

type FlexColProps = {
  gap?: string;
  wrap?: boolean;
  width2?: string;
};

type FlexRowProps = {
  gap?: string;
  wrap?: boolean;
  center?: boolean;
};

export const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  gap: ${(props) => (props.gap ? props.gap : "0")};
  justify-content: ${(props) => (props.center ? "center" : "start")};
`;

export const RespRow = styled.div<FlexRowProps>`
  display: flex;
  @media ${breakpoint.xs} {
    flex-direction: column;
  }
  gap: ${(props) => (props.gap ? props.gap : "0")};
  justify-content: ${(props) => (props.center ? "center" : "start")};
`;

export const FlexCol = styled.div<FlexColProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? props.gap : "0")};
  width: ${(props) => (props.width2 ? props.width2 : "inherit")};
`;

export const FlexColC = styled(FlexCol)`
  align-items: center;
`;

type ColorProps = {
  color: string;
};

export const HR2 = styled.hr<ColorProps>`
  border: 0;
  border-bottom: 1px solid ${(props) => props.color};
  width: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

type PageProps = {
  maxWidth: string;
};

export const PageBox = styled.div<PageProps>`
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  margin: 3rem 1rem;
`;

export const Page = ({ maxWidth, children }: { maxWidth: string; children: React.ReactNode }) => {
  return (
    <PageFlow>
      <PageBox maxWidth={maxWidth}>{children}</PageBox>
    </PageFlow>
  );
};

export const PageFlow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
