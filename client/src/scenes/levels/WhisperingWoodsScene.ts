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
    // Create ground platform
    const ground = new Actor({
      pos: new Vector(GameConfig.SCREEN_WIDTH / 2, GameConfig.SCREEN_HEIGHT - 16),
      width: GameConfig.SCREEN_WIDTH,
      height: 32,
      color: Color.fromHex('#4a4a4a'),
      collisionType: CollisionType.Fixed
    })
    this.add(ground)

    // Create some platforms
    const platforms = [
      { x: 200, y: 500, width: 150, height: 20 },
      { x: 500, y: 400, width: 150, height: 20 },
      { x: 800, y: 300, width: 150, height: 20 }
    ]

    platforms.forEach(platform => {
      const p = new Actor({
        pos: new Vector(platform.x, platform.y),
        width: platform.width,
        height: platform.height,
        color: Color.fromHex('#666666'),
        collisionType: CollisionType.Fixed
      })
      this.add(p)
    })

    // Add essence sources
    this.addEssenceSource(150, 450, EssenceType.Bouncy)
    this.addEssenceSource(750, 250, EssenceType.Sticky)

    // Add faded objects
    this.addFadedObject(350, 350, 100, 20)
    this.addFadedObject(650, 200, 20, 80)
  }

  private setupPlayer(): void {
    this.player = new Player(100, 400)
    this.add(this.player)
  }

  private setupUI(): void {
    // UI will be added here later
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