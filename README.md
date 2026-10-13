# Dark Fantasy Platformer

A 2D dark-fantasy platformer built with **JavaScript, Phaser 3 and Vite**. The project focuses on responsive movement, atmospheric environments and carefully crafted level design, with inspiration from games such as *Hollow Knight*.

The goal is to create an exploration-focused platformer set in a forgotten world of ruined cities, ancient architecture and mysterious places.

> **Status:** Early development — core movement and the first environment prototype are in place.

---

## Vision

The game aims to combine precise platforming with a dark, atmospheric world that encourages exploration.

The visual direction is built around near-black environments, muted stone textures, subtle highlights and restrained use of color. Environments should feel ancient, abandoned and interconnected rather than like a collection of unrelated obstacles.

The focus is on quality over quantity: responsive controls, readable level layouts, strong atmosphere and intentional visual design.

### Design principles

- **Atmosphere first** — environments should communicate history and mystery.
- **Precise movement** — controls should feel responsive and consistent.
- **Exploration** — levels should reward curiosity and observation.
- **Visual restraint** — dark, minimal palettes with details that serve a purpose.
- **Modular architecture** — reusable systems separated from level-specific content.
- **Incremental development** — build and test each system before expanding the game.

---

## Current Features

### Player movement
- Horizontal movement and acceleration.
- Jumping with variable jump height.
- Coyote time and jump buffering.
- Double jump.
- Wall jump.
- Dash.
- Movement feedback through squash and stretch.
- Dash trail effects.

### Camera and world
- Camera follows the player.
- World and camera boundaries.
- Arcade physics and terrain collision.
- Multiple terrain sections with different heights.
- Gaps, raised walkways and broken passages.

### Environment
- Procedurally drawn stone terrain.
- Dark masonry, cracks and surface variation.
- Decorative ruined towers, walls and pillars.
- Early architectural variations, including arches.
- Layered parallax background.
- Separate layout data for terrain and scenery.

---

## Controls

| Input | Action |
|---|---|
| `A` | Move left |
| `D` | Move right |
| `Space` | Jump |
| `Shift` | Dash |

Additional movement actions, such as double jump and wall jump, depend on the player's situation.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Game logic and systems |
| Phaser 3 | Rendering, scenes, physics and input |
| Vite | Development server and build tooling |
| Arcade Physics | Player movement and terrain collision |

The project currently uses plain JavaScript modules rather than a frontend framework.

---

## Project Structure

```text
src/
├── main.js
├── GameScene.js
├── Movement.js
│
├── levels/
│   ├── Level1.js
│   └── Level1Layout.js
│
└── world/
    ├── Environment.js
    ├── TerrainBuilder.js
    ├── Ruins.js
    └── ParallaxBackground.js
```

### Core files

**`main.js`**
Initializes Phaser and configures the game dimensions, physics and scenes.

**`GameScene.js`**
Creates the level, initializes the player, connects terrain collisions, sets camera bounds and updates player movement.

**`Movement.js`**
Contains the reusable player movement system, including jumping, dashing, wall interactions and movement effects.

### Levels

**`levels/Level1.js`**
Assembles the first level by connecting its layout, environment and background.

**`levels/Level1Layout.js`**
Defines the world's dimensions, terrain sections and decorative structure placements. Level-specific layout data belongs here rather than inside reusable rendering systems.

### World and environment

**`world/Environment.js`**
Coordinates the creation of terrain and decorative scenery.

**`world/TerrainBuilder.js`**
Draws terrain surfaces, stone textures, masonry and damage, and creates the terrain collision bodies.

**`world/Ruins.js`**
Draws decorative architecture, including towers, pillars, walls and arches.

**`world/ParallaxBackground.js`**
Creates distant scenery that moves at different speeds to provide depth.

---

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/)
- npm
- A code editor such as Visual Studio Code

### Installation

1. Clone the repository or download the project.
2. Open the project folder in your terminal.
3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL printed by Vite in your browser.

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

These commands assume the corresponding scripts are present in `package.json`.

---

## Development Roadmap

The roadmap is intentionally flexible. Features should be added when they improve the overall experience, not simply to increase the feature count.

### Phase 1 — Movement and foundations
- [x] Set up Phaser and Vite.
- [x] Implement the player and basic physics.
- [x] Add responsive movement and advanced jumping.
- [x] Implement dash and movement effects.
- [x] Add camera following and world boundaries.
- [x] Separate level layout from environment rendering.
- [x] Create an initial dark stone environment.

### Phase 2 — Environment and level design
- [ ] Refine architectural silhouettes and proportions.
- [ ] Improve the transitions between terrain sections.
- [ ] Add foreground elements for greater depth.
- [ ] Improve lighting, shadows and atmospheric effects.
- [ ] Introduce more distinctive landmarks.
- [ ] Build a complete, playable first level.
- [ ] Test platform distances and movement consistency.

### Phase 3 — Core gameplay
- [ ] Add player health and damage.
- [ ] Introduce basic enemy behavior.
- [ ] Add checkpoints and respawning.
- [ ] Create simple environmental hazards.
- [ ] Add interactions and exploration rewards.

### Phase 4 — World and progression
- [ ] Expand the world with additional areas.
- [ ] Introduce interconnected paths and shortcuts.
- [ ] Add new movement or exploration abilities.
- [ ] Develop a coherent progression system.
- [ ] Add a save system when progression requires it.

### Phase 5 — Polish
- [ ] Improve animation and movement feedback.
- [ ] Add sound effects and ambient audio.
- [ ] Refine visual effects and environmental atmosphere.
- [ ] Add menus and settings.
- [ ] Optimize performance and test different screen sizes.
- [ ] Prepare a stable playable release.

---

## Architecture and Development Guidelines

To keep the project manageable as it grows:

1. **Keep movement independent.** Player controls and movement physics belong in `Movement.js`, not in level files.
2. **Keep layouts data-driven.** Terrain coordinates and scenery placements belong in the relevant layout file.
3. **Separate visuals from collision.** Decorative architecture should not create collision unless explicitly intended.
4. **Reuse world systems.** Environment builders should work across multiple levels wherever possible.
5. **Test incrementally.** Confirm existing movement, collision and camera behavior after changes.
6. **Avoid unnecessary complexity.** Add systems only when they solve a real gameplay or development problem.
7. **Keep level-specific logic local.** New levels should have their own level and layout files when their content warrants it.

---

## Visual Direction

The intended art direction is dark fantasy rather than science fiction or industrial horror.

**Palette**
- Near-black backgrounds.
- Charcoal and dark gray stone.
- Muted gray highlights.
- Occasional pale accents for important objects.
- Red reserved for deliberate visual emphasis.

**Environment**
- Forgotten ruined cities.
- Ancient temple structures.
- Broken arches, pillars and masonry.
- Deep openings, layered silhouettes and distant landmarks.
- Atmospheric depth without excessive visual noise.

The aim is to create an environment that feels cohesive, mysterious and memorable, with inspiration from *Hollow Knight* while developing its own identity.

---

## Current Limitations

This is an early prototype, not a complete game.

- The player is currently represented by a simple shape.
- The first level is an environment and movement test.
- Most architecture is drawn using Phaser graphics primitives.
- Enemies, combat, checkpoints, progression and saving have not yet been implemented.
- The final art direction and gameplay systems are still evolving.

---

## Long-Term Goal

Build a polished, exploration-focused 2D platformer with responsive movement, a distinctive dark-fantasy atmosphere and an interconnected world worth exploring.

The priority is to make a small section of the game feel excellent before expanding it into a larger experience.

---

*Built with JavaScript, Phaser 3 and Vite.*