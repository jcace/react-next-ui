import { NxTopology } from "../NextContainer/NextContainer.types";

export type Coordinates = { x: number; y: number };

export type TopologyEvent<T, S = NxTopology> = (sender: S, event: T) => any;

export type NxId = string | number;
