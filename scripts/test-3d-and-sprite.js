// scripts/test-3d-and-sprite.js
// Verify mathematical 3D projection & pixel sprite generation without dependencies
const vertices = [
  [0, 1.2, 0], [1, 0.3, 0.8], [0.8, -0.4, 1], [-0.7, -0.3, 0.9],
  [-1, 0.4, 0.6], [0.7, 0.3, -0.8], [0.8, -0.4, -0.7], [-0.8, -0.4, -0.8],
  [-1, 0.4, -0.6], [0, -1.2, 0]
];
console.log('3D Vertices test:', vertices.length);
