import { Coordinates } from "../Common.types";

export interface TopologyComponent {
  // Properties
  translateX: (value?: number) => void | number;
  translateY: (value?: number) => void | number;
  scale: (value?: number) => void | number;
  translate: (value?: Coordinates) => void | Coordinates;
  visible: (value?: boolean) => void | boolean;
  class: (value?: string) => boolean | string;

  // Methods
  init: (args?: any) => void;
  setTransform: (
    translateX?: number,
    translateY?: number,
    scale?: number,
    duration?: number
  ) => void;
  setStyle: (
    key: string,
    value: any,
    duration?: number,
    callback?: any,
    context?: any
  ) => void;
  setTransition: (callback?: any, context?: any, duration?: number) => void;
  append: (parent?: TopologyComponent) => void;
  remove: () => void;
  getBound: any; // todo: returns ClientRect
  hide: () => void;
  animate: (config: { to: any; duration?: number; complete?: any }) => void;
}
