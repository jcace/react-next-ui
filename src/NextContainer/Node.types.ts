
export interface NxNode {
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
  selected: () => boolean;
  enable: () => boolean;
  node: () => NxNode;
  links: () => any; // TODO: Links type
  linkSets: () => any; // TODO: Link Sets type
  connectedNodes: () => any; // TODO

  init: () => any;
  move: (Coordinates) => void;
  moveTo: (
    x: number,
    y: number,
    callback: any,
    isAnimated: boolean,
    duration: number
  ) => void;
  translateTo: (x: number, y: number, callback: any) => void;
  eachLink: (callback: any, context: any) => void;
  eachLinkSet: (callback: any, context: any) => void;
  eachConnectedNode: (callback: any, context: any) => void;
  dispose: () => void;
}
