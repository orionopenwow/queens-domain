# Reverse-Engineered Architecture: Plunder World & Tangential Studio Spec
## Autonomous World Building & Spatial Placement Engine with Claude as Lead Architect

> **Status:** Tangential Module — Ready for extraction, testing, and implementation.
> **Engine Basis:** Spawn Engine 6.0 (Three.js / WebGPU Declarative Architecture).
> **Primary Source:** Reverse-engineered from `C:\Users\campw\Desktop\Plunder World\knotty-forest`.

---

## 1. Engine Core Mechanics & File Anatomy

In the analyzed architecture (`knotty-forest`), the game world is not a monolithic binary blob. It is **pure declarative text**, organized spatially and modularly:

```
world.config.yaml           # Global engine configuration, default place, inputs, camera/player templates
places/
  main/
    config.yaml             # Atmosphere (Hosek sky, clouds, fog, orbital sun), terrain heightmap, spawn
    sim.js                  # Place referee (day/night loop, weather events, slash commands)
    cells/
      x0z0.scene            # Spatial cell (-64m to +64m): entity placements
      x1z0.scene            # Spatial cell (+64m to +192m): entity placements
      x-1z0.scene           # Spatial cell (-192m to -64m): entity placements
templates/                  # Reusable archetypes (player.js, camera.js, road-kit.js, elwynn.js)
scripts/                    # Behavior modules (pure ctx hooks: onSpawn, update, onCollide)
ui/                         # HUD HTML/CSS sandboxed in an inner iframe
```

### 1.1 The 128-Meter Spatial Hashing Formula
Every physical object in the world is placed into a `.scene` file based on the coordinates of its feet:
$$\text{cell}_x = \text{Math.round}\left(\frac{x}{128}\right)$$
$$\text{cell}_z = \text{Math.round}\left(\frac{z}{128}\right)$$

- `x0z0.scene` holds $-64 \le x < 64$ and $-64 \le z < 64$.
- `x1z0.scene` holds $+64 \le x < 192$ and $-64 \le z < 64$.
- An object placed at $(x=150, z=20)$ automatically hashes to `x1z0.scene`.

### 1.2 Declarative Entity Grammar
```yaml
# spawn-scene v2 yaml x0z0
"bandit-camp-fire":
  "feetPosition": { "x": 14.5, "y": { "terrain": 0 }, "z": 32.1 }
  "rotation": { "yaw": 0 }
  "template": "templates/camp.js#fire"
  "tags": ["camp", "interactive", "rest-xp"]

"bandit-tent-1":
  "feetPosition": { "x": 10.2, "y": { "terrain": 0 }, "z": 30.0 }
  "rotation": { "yaw": 62.4 }
  "model": "cdn/tent-leather.glb"
  "physics": { "body": "static", "collider": "auto" }
  "tags": ["dressing", "shelter"]
```

Key principles:
1. `feetPosition`: The contact point with ground. Setting `y: { terrain: 0 }` tells the engine's physics kernel to raycast down to the terrain heightmap automatically, eliminating manual altitude calculations.
2. `rotation.yaw`: Facing angle in degrees.
3. `template`: Points to a blueprint export (e.g. `templates/camp.js#fire`).
4. `overrides`: Selective differences from the template.

---

## 2. Claude as Lead World-Building & Placement Agent

Claude excels at spatial reasoning and structured scene compilation when provided with a deterministic math harness.

### 2.1 The World-Builder Agent Protocol
When a designer requests:
> *"Create a fortified bandit checkpoint on the north road near x=40, z=110 with a watchtower, 2 barricades, a bonfire, and 2 patrolling guards."*

Claude executes the following 4-step spatial pipeline:

```
[Designer Prompt] 
       │
       ▼
1. Coordinate Hashing & Cell Resolution
   cx = round(40 / 128) = 0, cz = round(110 / 128) = 1  --> Target: places/main/cells/x0z1.scene
       │
       ▼
2. Spatial Clearance & Radial Math
   - Central Fire: (x=40.0, z=110.0)
   - Watchtower: (x=46.0, z=115.0), yaw=225° (facing south toward road)
   - Barricade 1: (x=36.0, z=102.0), yaw=15°
   - Barricade 2: (x=44.0, z=102.0), yaw=-15°
   - Guard 1 Patrol Anchor: (x=40.0, z=105.0)
   - Guard 2 Lookout: (x=46.0, z=115.0, y=watchtower_deck)
       │
       ▼
3. Declarative YAML Scene Generation
   - Generates compliant spawn-scene v2 YAML blocks with correct templates, physics, and tags.
       │
       ▼
4. Scene Verification & Hot-Reload
   - Ensures no overlapping collision hulls (distance > min_clearance).
   - Validates terrain conformity.
```

---

## 3. Tangential Implementation Engine: `WorldBuilderAgent`

Below is the standalone JavaScript engine (`world_builder_agent.js`) that provides:
1. Spatial cell resolution (`getSceneCell(x, z)`).
2. Procedural cluster placement algorithms (radial camps, road alignments, village clusters).
3. YAML scene file generator and parser.
4. Validation harness preventing floating assets or colliding hulls.

This module is self-contained and ready to be imported into any visual studio or agent CLI.
