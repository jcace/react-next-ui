import { NxId, TopologyEvent } from "../types/Common.types";
import { TopologyNode } from "../types/topology/Node.types";
import { TopologyLink } from "../types/topology/Link.types";
import { CSSProperties } from "react";

// TODO: These types are split up in the actual NX Library,
// They should be defined in topology, topologyconfig, nodemixin, stagemixin, etc.
// Here they are just defined for the meantime.

export interface TopologyData {
  nodes: Array<{
    id: NxId;
    [x: string]: any;
  }>;
  links: Array<{
    source: NxId;
    target: NxId;
    [x: string]: any;
  }>;
}

export interface NextContainerProps {
  topologyConfig?: NxTopologyConfig;
  eventHandlers?: Object;
  topologyData?: TopologyData;
  style?: CSSProperties;
  callback?: (nxApp: any) => any;
  afterDraw?: () => void;
}

export type NxTopologyConfig = Partial<NxTopology>;

export type NxTopology = {
  // Properties
  adaptive: boolean;
  autoLayout: boolean;
  currentSceneName: string;
  dataProcessor: string;
  enableGradualScaling: boolean;
  enableSmartLabel: boolean;
  enableSmartNode: boolean;
  height: number;
  width: number;
  identityKey: string;
  linkSetInstanceClass: string;
  nodeDraggable: object;
  nodeInstanceClass: any;
  nodeSetInstanceClass: any;
  padding: number;
  scalable: boolean;
  scenes: any;
  scenesMap: any;
  selectedNodes: any;
  showIcon: boolean;
  showNavigation: boolean;
  stage: any;
  status: string;
  supportMultipleLink: boolean;
  theme: string;
  tooltipManager: any;
  tooltipManagerConfig: any;
  viewSettingPanel: any;
  nodeConfig: object;
  linkConfig: object;

  // Methods
  addNodeSet: (nodeSet: TopologyNode) => TopologyNode;
  addNode: (node: TopologyNode) => void;
  addLink: (node: TopologyLink) => void;
  adaptToContainer: () => void;
  eachNode: (callback: (node: TopologyNode) => void) => void;
  eachLink: (callback: (link: TopologyLink) => void) => void;
  getNode: (id: NxId) => TopologyNode;
  getLink: (id: NxId) => TopologyLink;
  getData: () => TopologyData;
  layoutType: (inValue?: string) => void | string;
  linkInstanceClass: (inValue?: string) => void | string;
  setData: (data: TopologyData) => void;
  insertData: (data: TopologyData) => void;
  stageScale: (inValue?: any) => void | number;
  removeNode: (nodeId: NxId | TopologyNode) => void;
  removeLink: (linkId: NxId | TopologyLink) => void;
  zoom: (value: number) => void;
  zoomByNodes: (nodes: TopologyNode[], callback?: any, context?: any) => void;
  resize: (width: number, height: number) => void;
  move: (x: number, y: number, duration?: number) => void;
  fit: () => void;
  clear: () => void;
  adjustLayout: () => void;
};

export interface EventHandlers
  extends StageEvents,
    NodeEvents,
    LinkEvents,
    TopologyEvents {}

type TopologyEvents = Partial<{
  afterSetData: TopologyEvent<any>;
  beforeSetData: TopologyEvent<any>;
  fit: TopologyEvent<any>;
  insertData: TopologyEvent<any>;
  ready: TopologyEvent<any>;
  resizeStage: TopologyEvent<any>;
  topologyGenerated: TopologyEvent<null, NxTopology>;
}>;

type StageEvents = Partial<{
  clickStage: TopologyEvent<any>;
  down: TopologyEvent<KeyboardEvent>;
  dragStage: TopologyEvent<any>;
  dragStageStart: TopologyEvent<any>;
  dragStageEnd: TopologyEvent<any>;
  enter: TopologyEvent<KeyboardEvent>;
  esc: TopologyEvent<KeyboardEvent>;
  left: TopologyEvent<KeyboardEvent>;
  right: TopologyEvent<KeyboardEvent>;
  pressA: TopologyEvent<KeyboardEvent>;
  pressF: TopologyEvent<KeyboardEvent>;
  pressM: TopologyEvent<KeyboardEvent>;
  pressR: TopologyEvent<KeyboardEvent>;
  pressS: TopologyEvent<KeyboardEvent>;
  pressStage: TopologyEvent<any>;
  space: TopologyEvent<KeyboardEvent>;
  up: TopologyEvent<KeyboardEvent>;
  zoomend: TopologyEvent<any>;
  zooming: TopologyEvent<any>;
}>;

type NodeEvents = Partial<{
  pressNode: TopologyEvent<TopologyNode>;
  clickNode: TopologyEvent<TopologyNode>;
  enterNode: TopologyEvent<TopologyNode>;
  leaveNode: TopologyEvent<TopologyNode>;
  dragNodeStart: TopologyEvent<TopologyNode>;
  dragNode: TopologyEvent<TopologyNode>;
  dragNodeEnd: TopologyEvent<TopologyNode>;
  selectNode: TopologyEvent<TopologyNode>;
}>;

type LinkEvents = Partial<{
  pressLink: TopologyEvent<TopologyLink>;
  clickLink: TopologyEvent<TopologyLink>;
  enterLink: TopologyEvent<TopologyLink>;
  leaveLink: TopologyEvent<TopologyLink>;
}>;
