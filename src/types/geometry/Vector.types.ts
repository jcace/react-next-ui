export interface GeometryVector {
  // Methods
  add: (v: GeometryVector) => GeometryVector;
  angle: () => number;
  circumferentialAngle: () => number;
  clone: () => GeometryVector;
  divide: (k: number) => GeometryVector;
  equals: (v: GeometryVector) => boolean;
  length: () => number;
  multiply: (k: number) => GeometryVector;
  negate: () => GeometryVector;
  normal: () => GeometryVector;
  normalize: () => GeometryVector;
  rotate: (a: number) => GeometryVector;
  slope: () => number;
  squaredLength: () => number;
  subtract: (v: GeometryVector) => GeometryVector;

  // Properties:
  matrixInversion: any; // TODO: MatrixSupport type
}
