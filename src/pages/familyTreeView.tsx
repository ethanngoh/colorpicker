import { ControlsContainer, FullScreenControl, SearchControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { familyGraph } from "../model/familyGraph";

export const FamilyTreeView = () => {
  familyGraph.layout();
  return (
    <SigmaContainer style={{ height: "100vh", width: "100vw" }} graph={familyGraph.graph}>
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
      </ControlsContainer>
      <ControlsContainer position={"top-right"}>
        <SearchControl />
      </ControlsContainer>
    </SigmaContainer>
  );
};
