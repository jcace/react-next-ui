export type Coordinates = { x: number; y: number };

export type TopologyEvent<T, S = string> = (sender: S, event: T) => any;
