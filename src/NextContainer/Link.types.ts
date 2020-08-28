import { NxComponent } from "./Component.types";

export interface NxLink extends NxComponent {
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
