export class GameConfig {
  // Display Settings
  static readonly SCREEN_WIDTH = 1024
  static readonly SCREEN_HEIGHT = 768
  
  // Physics Settings
  static readonly GRAVITY = 800
  static readonly PLAYER_SPEED = 200
  static readonly JUMP_FORCE = -400
  
  // Gameplay Settings
  static readonly ESSENCE_ABSORPTION_RANGE = 50
  static readonly ESSENCE_IMBUE_RANGE = 80
  static readonly MAX_ESSENCE_CAPACITY = 1
  
  // Visual Settings
  static readonly FADED_COLOR = '#666666'
  static readonly RESTORED_COLOR = '#ffffff'
  static readonly LILA_COLOR = '#90ee90'
  static readonly KAEL_COLOR = '#ffa500'
  
  // Essence Colors
  static readonly ESSENCE_COLORS = {
    bouncy: '#ff8c00',
    sticky: '#32cd32',
    growth: '#228b22',
    solidify: '#708090',
    heavy: '#2f4f4f',
    resonance: '#9370db'
  } as const
  
  // Layer Depths
  static readonly LAYERS = {
    background: -10,
    platforms: 0,
    objects: 10,
    players: 20,
    effects: 30,
    ui: 100
  } as const
} 