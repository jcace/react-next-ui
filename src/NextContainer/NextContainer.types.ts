import { NxEvent } from "./Common.types";
import { NxNode } from "./Node.types";

export interface NextContainerProps {
  topologyConfig?: TopologyConfig;
  eventHandlers?: Object;
  topologyData?: Object;
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

export interface EventHandlers extends StageEvents, NodeEvents, LinkEvents {}

type StageEvents = Partial<{
  clickStage: NxEvent<any>;
  down: NxEvent<any>;
  dragStage: NxEvent<any>;
  dragStageStart: NxEvent<any>;
  dragStageEnd: NxEvent<any>;
  enter: NxEvent<any>;
  esc: NxEvent<any>;
  left: NxEvent<any>;
  right: NxEvent<any>;
  pressA: NxEvent<any>;
  pressF: NxEvent<any>;
  pressM: NxEvent<any>;
  pressR: NxEvent<any>;
  pressS: NxEvent<any>;
  pressStage: NxEvent<any>;
  space: NxEvent<any>;
  up: NxEvent<any>;
  zoomend: NxEvent<any>;
  zooming: NxEvent<any>;
}>;

type NodeEvents = Partial<{
  pressNode: NxEvent<NxNode>;
  clickNode: NxEvent<NxNode>;
  enterNode: NxEvent<NxNode>;
  leaveNode: NxEvent<NxNode>;
  dragNodeStart: NxEvent<NxNode>;
  dragNode: NxEvent<NxNode>;
  dragNodeEnd: NxEvent<NxNode>;
  selectNode: NxEvent<NxNode>;
}>;

type LinkEvents = Partial<{
  pressLink: NxEvent<any>;
  clickLink: NxEvent<any>;
  enterLink: NxEvent<any>;
  leaveLink: NxEvent<any>;
}>;


