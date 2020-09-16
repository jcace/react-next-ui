import { TopologyEvent } from "../types/Common.types";
import { TopologyNode } from "../types/topology/Node.types";
import { TopologyLink } from "../types/topology/Link.types";
import { CSSProperties } from "react";

// TODO: These types are split up in the actual NX Library,
// They should be defined in topology, topologyconfig, nodemixin, stagemixin, etc.
// Here they are just defined for the meantime.

export interface TopologyData {
  nodes: Array<{
    id: string | number;
    [x: string]: any;
  }>;
  links: Array<{
    source: string | number;
    target: string | number;
    [x: string]: any;
  }>;
}

export interface NextContainerProps {
  topologyConfig?: TopologyConfig;
  eventHandlers?: Object;
  topologyData?: TopologyData;
  style?: CSSProperties;
  callback?: (nxApp: any) => any;
}

export type TopologyConfig = Partial<{
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
}>;

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
  topologyGenerated: TopologyEvent<any>;
}>;

type StageEvents = Partial<{
  clickStage: TopologyEvent<any>;
  down: TopologyEvent<any>;
  dragStage: TopologyEvent<any>;
  dragStageStart: TopologyEvent<any>;
  dragStageEnd: TopologyEvent<any>;
  enter: TopologyEvent<any>;
  esc: TopologyEvent<any>;
  left: TopologyEvent<any>;
  right: TopologyEvent<any>;
  pressA: TopologyEvent<any>;
  pressF: TopologyEvent<any>;
  pressM: TopologyEvent<any>;
  pressR: TopologyEvent<any>;
  pressS: TopologyEvent<any>;
  pressStage: TopologyEvent<any>;
  space: TopologyEvent<any>;
  up: TopologyEvent<any>;
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
