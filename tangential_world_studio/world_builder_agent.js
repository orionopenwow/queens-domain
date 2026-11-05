// tangential_world_studio/world_builder_agent.js
// Standalone Spatial Placement & World Generation Harness for Claude Agent Integration
// Reverse-engineered from Spawn Engine 6.0 / Plunder World Architecture

const CELL_SIZE = 128; // 128 meters per cell

/**
 * Resolves world coordinates to the spatial cell scene filename
 * @param {number} x - World X
 * @param {number} z - World Z
 * @returns {string} e.g. "x0z1.scene"
 */
function getSceneCellKey(x, z) {
  const cx = Math.round(x / CELL_SIZE);
  const cz = Math.round(z / CELL_SIZE);
  return `x${cx}z${cz}`;
}

/**
 * Computes radial cluster placements around a central origin
 * @param {object} origin - {x, z} center point
 * @param {Array} items - Array of { id, template, distance, angleDeg, tags }
 * @returns {Array} List of resolved object placement specifications
 */
function generateRadialCluster(origin, items) {
  return items.map(item => {
    const rad = (item.angleDeg * Math.PI) / 180;
    const px = +(origin.x + Math.sin(rad) * item.distance).toFixed(2);
    const pz = +(origin.z + Math.cos(rad) * item.distance).toFixed(2);
    // Yaw angle facing inward towards center by default
    const facingYaw = +(((item.angleDeg + 180) % 360) - 180).toFixed(1);

    return {
      id: item.id,
      feetPosition: { x: px, y: { terrain: 0 }, z: pz },
      rotation: { yaw: item.yaw !== undefined ? item.yaw : facingYaw },
      template: item.template,
      model: item.model,
      physics: item.physics || { body: 'static', collider: 'auto' },
      tags: item.tags || []
    };
  });
}

/**
 * Serializes placement objects into spawn-scene v2 YAML format
 * @param {string} cellKey - e.g. "x0z0"
 * @param {Array} objects - Array of placement objects
 * @returns {string} Formatted YAML file content
 */
function serializeSceneYaml(cellKey, objects) {
  let out = `# spawn-scene v2 yaml ${cellKey}\n`;
  for (const obj of objects) {
    out += `"${obj.id}":\n`;
    if (obj.template) {
      out += `  template: "${obj.template}"\n`;
      out += `  overrides:\n`;
      out += `    feetPosition: { x: ${obj.feetPosition.x}, y: { terrain: 0 }, z: ${obj.feetPosition.z} }\n`;
      out += `    rotation: { yaw: ${obj.rotation.yaw} }\n`;
    } else {
      out += `  feetPosition: { x: ${obj.feetPosition.x}, y: { terrain: 0 }, z: ${obj.feetPosition.z} }\n`;
      out += `  rotation: { yaw: ${obj.rotation.yaw} }\n`;
      if (obj.model) out += `  model: "${obj.model}"\n`;
      if (obj.physics) out += `  physics: { body: "${obj.physics.body || 'static'}", collider: "${obj.physics.collider || 'auto'}" }\n`;
    }
    if (obj.tags && obj.tags.length > 0) {
      out += `  tags: [${obj.tags.map(t => `"${t}"`).join(', ')}]\n`;
    }
  }
  return out;
}

/**
 * Validates collision clearance between placed entities
 * @param {Array} objects - List of placement objects
 * @param {number} minDistance - Minimum allowed clearance between entities in meters
 * @returns {object} { valid: boolean, collisions: Array }
 */
function validateClearance(objects, minDistance = 1.2) {
  const collisions = [];
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      const a = objects[i];
      const b = objects[j];
      const dx = a.feetPosition.x - b.feetPosition.x;
      const dz = a.feetPosition.z - b.feetPosition.z;
      const dist = Math.hypot(dx, dz);
      if (dist < minDistance) {
        collisions.push({ a: a.id, b: b.id, distance: +dist.toFixed(2) });
      }
    }
  }
  return { valid: collisions.length === 0, collisions };
}

module.exports = {
  CELL_SIZE,
  getSceneCellKey,
  generateRadialCluster,
  serializeSceneYaml,
  validateClearance
};
