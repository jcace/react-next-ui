export interface NextContainerProps {
  topologyConfig?: TopologyConfig,
  eventHandlers?: Object;
  topologyData?: Object;
}

export type TopologyConfig = Partial<{
  adaptive: boolean,
  autoLayout: boolean,
  currentSceneName: string,
  dataProcessor: string,
  enableGradualScaling: boolean,
  enableSmartLabel: boolean,
  enableSmartNode: boolean,
  height: number,
  width: number,
  identityKey: string,
  linkSetInstanceClass: string,
  nodeDraggable: object,
  nodeInstanceClass: any,
  nodeSetInstanceClass: any,
  padding: number,
  scalable: boolean,
  scenes: any,
  scenesMap: any,
  selectedNodes: any,
  showIcon: boolean,
  showNavigation: boolean,
  stage: any,
  status: string,
  supportMultipleLink: boolean,
  theme: string,
  tooltipManager: any,
  tooltipManagerConfig: any,
  viewSettingPanel: any,
  nodeConfig: object,
  linkConfig: object,
}>