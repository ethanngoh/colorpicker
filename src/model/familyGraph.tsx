import dagre from "dagre";
import { DirectedGraph } from "graphology";
import { bidirectional } from "graphology-shortest-path/unweighted";
import {
  assertPrimaryRelationship,
  assertRelationship,
  IndividualRaw,
  RelationKeyInverses,
  RelationRaw,
  Relationship
} from "./csvGraph";

export interface Relation {
  sourceName: string;
  targetName: string;
  relationship: Relationship;
}

export interface Individual {
  name: string;
  important?: boolean;
}

export interface RelationshipPath {
  relations: Relation[];
  individuals: { [key: string]: Individual };
}

interface FamilyGraphNode {
  name: string;
  important?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface FamilyGraphEdge {
  relationship: string;
}

const NODE_HEIGHT = 100;
const NODE_WIDTH = 100;

export class FamilyGraph {
  graph: DirectedGraph<FamilyGraphNode, FamilyGraphEdge>;
  nodesLoaded: boolean = false;
  edgesLoaded: boolean = false;

  constructor() {
    this.graph = new DirectedGraph();
  }

  public get individuals() {
    return this.graph.mapNodes((n) => {
      return { name: n };
    });
  }

  public buildGraphNodes(rows: IndividualRaw[]) {
    if (this.nodesLoaded) {
      return;
    }
    this.nodesLoaded = true;

    for (const r of rows) {
      if (!r.name) {
        continue;
      }
      var props: any = {
        name: r.name
      };
      if (r.name === "Sarah Bentivenga" || r.name === "Robert Cartmell") {
        props["important"] = true;
      }
      this.graph.addNode(r.name, props);
    }
  }

  public buildGraphEdges(rows: RelationRaw[]) {
    if (this.edgesLoaded) {
      return;
    }
    this.edgesLoaded = true;

    for (const r of rows) {
      if (!r.name_source || !r.name_target) {
        continue;
      }

      const relationInverse = RelationKeyInverses[assertPrimaryRelationship(r.relationship)];
      if (!relationInverse) {
        throw new Error(`Inverse relation of '${r.relationship}' not defined`);
      }

      this.graph.addEdgeWithKey(r.edge_id, r.name_source, r.name_target, {
        relationship: r.relationship
      });

      this.graph.addEdgeWithKey(`${r.edge_id}-back`, r.name_target, r.name_source, {
        relationship: relationInverse
      });
    }
  }

  public getPath(source: string, target: string): RelationshipPath {
    const path = bidirectional(this.graph, source, target);
    if (!path) {
      return { relations: [], individuals: {} };
    }

    var path2: RelationshipPath = { relations: [], individuals: {} };
    var nodesTemp: { [key: string]: Individual } = {};
    for (let i = 1; i < path.length; i++) {
      const s: string = path[i - 1];
      const t: string = path[i];

      const relationship = this.graph.getDirectedEdgeAttribute(s, t, "relationship");

      path2.relations.push({
        sourceName: s,
        targetName: t,
        relationship: assertRelationship(relationship)
      });

      if (!(s in nodesTemp)) {
        const attr = this.graph.getNodeAttributes(s);
        nodesTemp[s] = { ...attr, name: s };
      }
      if (!(t in nodesTemp)) {
        const attr = this.graph.getNodeAttributes(t);
        nodesTemp[t] = { ...attr, name: t };
      }
    }
    path2.individuals = nodesTemp;
    console.log(path2);
    return path2;
  }

  public layout() {
    var g = new dagre.graphlib.Graph();
    g.setGraph({});
    g.setDefaultEdgeLabel(() => {
      return {};
    });

    this.graph.forEachNode((n) => {
      g.setNode(n, { label: n, width: NODE_WIDTH, height: NODE_HEIGHT });
    });

    this.graph.forEachEdge((edgeKey) => {
      const s = this.graph.source(edgeKey);
      const t = this.graph.target(edgeKey);
      g.setEdge(s, t);
    });

    dagre.layout(g);

    g.nodes().forEach((n) => {
      const attr = g.node(n);
      this.graph.mergeNodeAttributes(n, attr);
    });
  }
}

export const familyGraph = new FamilyGraph();
