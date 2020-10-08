import { Coordinates } from "../Common.types";
import { GeometryVector } from "../geometry/Vector.types";

// https://developer.cisco.com/site/neXt/document/api-reference-manual/classes/nx.data.Vertex/
export interface Vertex {
  // Properties
  id: () => number | string;
  positionGetter: () => Coordinates;
  positionSetter: () => boolean;
  position: (obj?: Coordinates) => void | Coordinates;
  x: (value?: number) => number;
  y: (value?: number) => number;
  vector: () => GeometryVector;
  visible: (value?: boolean) => void | boolean;
  generated: () => boolean;
  updated: () => boolean;
  type: () => string;
  edgeSets: () => any;
  edgeSetCollections: () => any;
  edges: () => any;
  connectedVerticies: () => Vertex[];
  graph: () => any; // TODO: nx.data.ObservableGraph
  parentVertexSet: () => any; // TODO: nx.data.VertexSet
  rootVertexSet: () => any; // TODO: nx.data.VertexSet
  generatedRootVertexSet: () => any; // TODO: nx.data.VertexSet
  selected: () => boolean;

  // Methods
  set: (key: string, value: any) => void;
  get: (key: string) => any;
  has: (name: string) => boolean;
  getData: () => any;
  addEdgeSet: (edgeSet: any, linkKey: string) => void; //todo: nx.data.EdgeSet
  removeEdgeSet: (linkKey: string) => void;
  addEdgeSetCollection: (esc: any, linkKey: string) => void;
  eachConnectedVertex: (callback: any, context: any) => void;
  translate: (Coordinates) => void;
}
