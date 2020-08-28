import { NxLink } from "./Link.types";
import { NxComponent } from "./Component.types";

export interface NxAbstractNode extends NxComponent {
  // Properties
  position: (obj?: Coordinates) => Coordinates;
  absolutePosition: (obj?: Coordinates) => Coordinates;
  matrix: [];
  vector: any; // TODO: Vector type
  x: (x?: number) => number;
  y: (y?: number) => number;
  lockXAxle: () => boolean;
  lockYAxle: () => boolean;
  stageScale: (value: number) => any;
  topology: () => any; // TODO: Topology type
  id: () => number | string;
  enable: (inValue?: boolean) => void | boolean;
  node: () => NxNode;
  showIcon: (inValue?: boolean) => void | boolean;
  links: () => [NxLink]; // TODO: Links type
  linkSets: () => any; // TODO: Link Sets type
  connectedNodes: () => any; // TODO

  // Methods
  init: (args?: any) => void;
  setModel: (model?: any) => void;
  update: () => any;
  move: (x?: number, y?: number) => void;
  moveTo: (
    isAnimated: boolean,
    x?: number,
    y?: number,
    callback?: any,
    duration?: number
  ) => void;
  translateTo: (x?: number, y?: number, callback?: any) => void;
  eachLink: (callback: any, context?: any) => void;
  eachLinkSet: (callback: any, context?: any) => void;
  eachConnectedNode: (callback: any, context?: any) => void;
  dispose: () => void;
}

export interface NxNode extends NxAbstractNode {
  // Properties
  label: (inValue?: string) => void | string;
  iconType: (inValue?: string) => void | boolean;
  showIcon: (inValue: boolean) => void;
  enableSmartLabel: () => void;
  labelAngle: () => void;
  labelVisibility: (inValue: boolean) => void;
  revisionScale: (value: number) => void;
  color: (inValue: string) => void;
  scale: (inValue?: number) => void | number;
  selectedRingRadius: () => number;
  selected: (inValue?: boolean) => void | boolean;
  enable: (inValue?: boolean) => void | boolean;
  parentNodeSet: () => NxNode | null;
  rootNodeSet: () => NxNode | null;

  // Methods
  translateTo: (x?: number, y?: number, callback?: any, context?: any) => void;
  getBound: (onlyGraphic: boolean) => any;
  updateConnectedNodeLabelPosition: () => void;
  calcLabelPosition: (force: boolean) => void;
  updateByMaxObtuseAngle: (angle: number) => void;
  dispose: () => void;
}
