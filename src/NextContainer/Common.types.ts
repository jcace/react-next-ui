export type Coordinates = { x: number; y: number };

export type NxEvent<T> = (sender: string, event: T) => any;
