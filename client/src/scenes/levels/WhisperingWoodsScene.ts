import { Scene, Actor, Vector, Color, CollisionType, Keys, Physics } from 'excalibur'
import { GameConfig } from '../../config/GameConfig'
import { Player } from '../../actors/Player'
import { EssenceSource } from '../../actors/EssenceSource'
import { FadedObject } from '../../actors/FadedObject'
import { EssenceType } from '../../types/EssenceType'

export class WhisperingWoodsScene extends Scene {
  private player!: Player
  private essenceSources: EssenceSource[] = []
  private fadedObjects: FadedObject[] = []

  public onInitialize(): void {
    // Set up physics
    Physics.gravity = new Vector(0, GameConfig.GRAVITY)
    
    this.setupLevel()
    this.setupPlayer()
    this.setupUI()
    
    console.log('🌲 Whispering Woods scene initialized')
  }

  private setupLevel(): void {
    // Create ground platform (solid ground at bottom)
    const ground = new Actor({
      pos: new Vector(GameConfig.SCREEN_WIDTH / 2, GameConfig.SCREEN_HEIGHT - 16),
      width: GameConfig.SCREEN_WIDTH,
      height: 32,
      color: Color.fromHex('#2d5016'), // Darker green for ground
      collisionType: CollisionType.Fixed
    })
    this.add(ground)

    // Create some platforms with better positioning
    const platforms = [
      { x: 200, y: 600, width: 150, height: 20 },  // Lower platform
      { x: 450, y: 520, width: 120, height: 20 },  // Middle platform
      { x: 700, y: 440, width: 100, height: 20 },  // Higher platform
      { x: 150, y: 360, width: 80, height: 20 }    // Highest platform
    ]

    platforms.forEach(platform => {
      const p = new Actor({
        pos: new Vector(platform.x, platform.y),
        width: platform.width,
        height: platform.height,
        color: Color.fromHex('#8b4513'), // Brown for platforms
        collisionType: CollisionType.Fixed
      })
      this.add(p)
    })

    // Add essence sources positioned on platforms
    this.addEssenceSource(180, 580, EssenceType.Bouncy)  // On first platform
    this.addEssenceSource(450, 500, EssenceType.Sticky)  // On middle platform

    // Add faded objects that require essences to become useful
    this.addFadedObject(350, 450, 100, 20)  // A platform that could be made bouncy
    this.addFadedObject(600, 350, 20, 80)   // A wall that could be made sticky
    
    console.log('🌲 Level setup complete - platforms, essences, and faded objects added')
  }

  private setupPlayer(): void {
    // Spawn player on the ground, slightly above it
    this.player = new Player(100, GameConfig.SCREEN_HEIGHT - 80)
    this.add(this.player)
    console.log(`🧙‍♀️ Player spawned at ${this.player.pos.x}, ${this.player.pos.y}`)
  }

  private setupUI(): void {
    // Add instruction text
    const instructions = [
      'WASD/Arrow Keys: Move',
      'Space/W: Jump',
      'E: Imbue essence into gray objects',
      'Walk into colored objects to absorb essences'
    ]
    
    instructions.forEach((instruction, index) => {
      const text = new Actor({
        pos: new Vector(20, 20 + index * 25),
        width: 1,
        height: 1,
        color: Color.Transparent
      })
      // Note: In a real implementation, we'd add text rendering here
      // For now, we'll rely on console.log for feedback
      this.add(text)
    })
    
    console.log('📖 Instructions: Use WASD to move, Space to jump, E to imbue essences')
  }

  private addEssenceSource(x: number, y: number, essenceType: EssenceType): void {
    const source = new EssenceSource(x, y, essenceType)
    this.essenceSources.push(source)
    this.add(source)
  }

  private addFadedObject(x: number, y: number, width: number, height: number): void {
    const fadedObj = new FadedObject(x, y, width, height)
    this.fadedObjects.push(fadedObj)
    this.add(fadedObj)
  }

  public onPreUpdate(): void {
    // Check for essence absorption
    this.checkEssenceAbsorption()
    
    // Check for essence imbuing
    this.checkEssenceImbuing()
  }

  private checkEssenceAbsorption(): void {
    this.essenceSources.forEach(source => {
      if (!source.isConsumed && 
          Vector.distance(this.player.pos, source.pos) < GameConfig.ESSENCE_ABSORPTION_RANGE) {
        this.player.absorbEssence(source.essenceType)
        source.consume()
      }
    })
  }

  private checkEssenceImbuing(): void {
    if (this.engine.input.keyboard.wasPressed(Keys.E)) {
      const closestFaded = this.findClosestFadedObject()
      if (closestFaded && 
          Vector.distance(this.player.pos, closestFaded.pos) < GameConfig.ESSENCE_IMBUE_RANGE) {
        const essence = this.player.getHeldEssence()
        if (essence !== null) {
          closestFaded.imbueWithEssence(essence)
          this.player.consumeEssence()
        }
      }
    }
  }

  private findClosestFadedObject(): FadedObject | null {
    let closest: FadedObject | null = null
    let minDistance = Infinity

    this.fadedObjects.forEach(obj => {
      if (!obj.isImbued) {
        const distance = Vector.distance(this.player.pos, obj.pos)
        if (distance < minDistance) {
          minDistance = distance
          closest = obj
        }
      }
    })

    return closest
  }
} 