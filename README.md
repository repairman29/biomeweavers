# 🌱 Biome Weavers

A cooperative 2D puzzle-platformer about restoring life to a fading world through the power of essence weaving.

## 🎮 Game Concept

Players take on the role of Lila, a young apprentice Biome Weaver who can manipulate elemental essences to solve environmental puzzles and restore color to a world consumed by the mysterious "Gray Fade."

### Core Mechanics
- **Absorb Essences**: Collect elemental properties from source objects
- **Imbue Objects**: Transfer essences to faded objects to restore their properties
- **Cooperative Gameplay**: Two players with complementary abilities work together

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [your-repo-url]
cd biome-weavers

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will open automatically in your browser at `http://localhost:3000`

## 🎯 Current Features (Phase 0 - Foundation)

### Implemented
- ✅ Modern TypeScript + Excalibur.js setup
- ✅ Basic player movement (WASD/Arrow keys)
- ✅ Essence absorption system
- ✅ Essence imbuing (Press E near faded objects)
- ✅ Visual feedback for essence states
- ✅ Basic physics and collision detection

### Controls
- **Movement**: WASD or Arrow Keys
- **Jump**: W or Spacebar
- **Imbue**: E (when near a faded object)

## 🛠️ Development Roadmap

### Phase 1: Core Mechanics (Current)
- [x] Project setup and basic structure
- [x] Player movement and physics
- [x] Essence absorption/imbuing system
- [ ] Enhanced visual effects
- [ ] Sound system integration
- [ ] Level progression

### Phase 2: Single-Player Polish
- [ ] Complete "Whispering Woods" level
- [ ] Narrative integration (Elara, story triggers)
- [ ] Puzzle design and balancing
- [ ] Art asset integration
- [ ] UI/UX improvements

### Phase 3: Multiplayer Foundation
- [ ] Server-authoritative architecture
- [ ] Real-time synchronization
- [ ] Two-player cooperative mechanics
- [ ] Asymmetric character abilities (Lila + Kael)
- [ ] Harmony Weaving system

### Phase 4: Production Ready
- [ ] Google Cloud Platform deployment
- [ ] User authentication (COPPA compliant)
- [ ] Analytics and telemetry
- [ ] Performance optimization
- [ ] Cross-platform testing

## 🎨 Technical Architecture

### Frontend
- **Engine**: Excalibur.js (TypeScript-first 2D game engine)
- **Build Tool**: Vite (fast development and optimized builds)
- **Language**: TypeScript (type safety and modern JS features)

### Backend (Future)
- **Server**: Node.js + Socket.IO
- **Database**: Google Firestore
- **Deployment**: Google Cloud Run
- **CDN**: Google Cloud CDN

## 📁 Project Structure

```
src/
├── main.ts              # Game entry point
├── config/
│   └── GameConfig.ts    # Game constants and settings
├── scenes/
│   └── WhisperingWoodsScene.ts  # Main game level
├── actors/
│   ├── Player.ts        # Player character logic
│   ├── EssenceSource.ts # Essence pickup objects
│   └── FadedObject.ts   # Objects that can be imbued
└── types/
    └── EssenceType.ts   # Essence type definitions
```

## 🎯 Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

## 🌟 Contributing

This project follows a phased development approach. Each phase builds upon the previous one while maintaining a playable, testable build at all times.

### Current Focus
We're currently in **Phase 0: Foundation Setup**. The immediate goals are:
1. ✅ Get a basic playable prototype running
2. 🔄 Implement core essence weaving mechanics
3. 🔄 Add visual polish and feedback
4. 🔄 Create the first complete puzzle

### Next Steps
If you want to contribute, here are the most impactful areas:
- **Visual Effects**: Particle systems for essence absorption/imbuing
- **Audio**: Sound effects for actions and ambient forest sounds
- **Level Design**: Expand the Whispering Woods with more interesting puzzles
- **UI/UX**: Create intuitive feedback for essence states and interactions

## 📋 Known Issues & Limitations

### Current Prototype Limitations
- Basic placeholder graphics (colored rectangles)
- No audio system yet
- Simple physics (will be enhanced)
- Single level only
- No save system

### Performance
- Target: 60fps on mid-range devices
- Current: Optimized for development, production builds will be further optimized

## 🎮 Try It Now!

The game is designed to be instantly playable. After running `npm run dev`:

1. **Move around** with WASD or arrow keys
2. **Jump** with W or Spacebar  
3. **Absorb essence** by walking near colored objects (orange = bouncy, green = sticky)
4. **Imbue objects** by pressing E near gray objects
5. **Experiment** with how different essences change object behavior

## 📞 Support & Feedback

This is an active development project. If you encounter issues or have suggestions:
- Open an issue on GitHub
- The code is designed to be readable and modular for easy contribution

---

**🌱 "In every faded leaf lies the potential for new growth" - Elara, Elder of the Canopy Village** 