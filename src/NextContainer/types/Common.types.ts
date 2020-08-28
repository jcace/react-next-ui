export type Coordinates = { x: number; y: number };

export type TopologyEvent<T> = (sender: string, event: T) => any;
