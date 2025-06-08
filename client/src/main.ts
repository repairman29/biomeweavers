import { Engine, DisplayMode, Vector, Color } from 'excalibur'
import { WhisperingWoodsScene } from './scenes/levels/WhisperingWoodsScene'
import { GameConfig } from './config/GameConfig'

class BiomeWeaversGame {
  private engine: Engine

  constructor() {
    // Initialize the game engine
    this.engine = new Engine({
      width: GameConfig.SCREEN_WIDTH,
      height: GameConfig.SCREEN_HEIGHT,
      displayMode: DisplayMode.FitScreen,
      backgroundColor: Color.fromHex('#1a1a2e'),
      canvasElementId: 'game-container',
      suppressPlayButton: true
    })

    this.setupScenes()
    this.hideLoadingScreen()
  }

  private setupScenes(): void {
    // Add all game scenes
    this.engine.addScene('whispering-woods', new WhisperingWoodsScene())
  }

  private hideLoadingScreen(): void {
    const loadingElement = document.getElementById('loading')
    if (loadingElement) {
      loadingElement.style.display = 'none'
    }
  }

  public async start(): Promise<void> {
    try {
      await this.engine.start()
      
      // Start with the first level
      this.engine.goToScene('whispering-woods')
      
      console.log('🌱 Biome Weavers started successfully!')
    } catch (error) {
      console.error('Failed to start Biome Weavers:', error)
    }
  }
}

// Initialize and start the game
const game = new BiomeWeaversGame()
game.start() 