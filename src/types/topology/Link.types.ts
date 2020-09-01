import { TopologyComponent } from "./Component.types";
import { TopologyNode } from "./Node.types";
import { Coordinates } from "../Common.types";

export interface TopologyAbstractLink extends TopologyComponent {
  // Properties
  sourceNode: () => TopologyNode;
  targetNode: () => TopologyNode;
  sourcePosition: () => Coordinates;
  targetPosition: () => Coordinates;
  sourceNodeID: () => number | string;
  targetNodeID: () => number | string;
  sourceX: () => number;
  sourceY: () => number;
  targetX: () => number;
  targetY: () => number;
  sourceVector: () => any;
  targetVector: () => any;
  position: () => { x1: number; x2: number; y1: number; y2: number };
  line: () => any; // TODO: line
  topology: () => any;
  id: () => number | string;
  linkKey: () => any;
  reverse: () => any;
  centerPoint: () => any;
  enable: (inValue?: boolean) => void | boolean;

  // Methods:
  update: () => void;
  dispose: () => void;
}

export interface TopologyLink extends TopologyAbstractLink {
  // Properties
  id: () => number | string;
  linkType: (inValue?: string) => string | boolean;
  offsetPercentage: () => number;
  offsetRadix: () => number;
  label: (inValue?: string) => void | string;
  color: (inValue?: string) => void | string;
  width: (inValue?: number) => void | number;
  stageScale: (inValue?: number) => void | number;
  dotted: (inValue?: boolean) => void | boolean;
  style: (inValue?: any) => void;
  parentLinkSet: () => any;
  enable: (inValue?: boolean) => void | boolean;
  drawMethod: (inValue?: any) => any;
  revisionScale: () => any;

  // Methods
  update: () => void;
  getPaddingLine: () => any;
  getOffset: () => number;
}
