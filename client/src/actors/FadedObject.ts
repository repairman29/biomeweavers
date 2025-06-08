import { Actor, Vector, Color, CollisionType } from 'excalibur'
import { GameConfig } from '../config/GameConfig'
import { EssenceType } from '../types/EssenceType'

export class FadedObject extends Actor {
  public isImbued = false
  private imbuedEssence: EssenceType | null = null

  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new Vector(x, y),
      width,
      height,
      color: Color.fromHex(GameConfig.FADED_COLOR),
      collisionType: CollisionType.Fixed
    })
  }

  public imbueWithEssence(essenceType: EssenceType): void {
    if (this.isImbued) return

    this.isImbued = true
    this.imbuedEssence = essenceType
    
    // Change visual appearance
    const essenceColor = GameConfig.ESSENCE_COLORS[essenceType]
    this.color = Color.fromHex(essenceColor)
    
    // Apply essence-specific behaviors
    this.applyEssenceEffect(essenceType)
    
    console.log(`🔮 Object imbued with ${essenceType} essence`)
  }

  private applyEssenceEffect(essenceType: EssenceType): void {
    switch (essenceType) {
      case EssenceType.Bouncy:
        // Make the object bouncy - this would affect collision behavior
        this.body.bounciness = 1.5
        break
        
      case EssenceType.Sticky:
        // Make the object sticky - reduce friction/bouncing
        this.body.friction = 2.0
        this.body.bounciness = 0.1
        break
        
      case EssenceType.Growth:
        // Could make the object grow or sprout something
        break
        
      case EssenceType.Solidify:
        // Make the object more solid/stable
        this.body.mass = 1000
        break
        
      case EssenceType.Heavy:
        // Make the object heavy
        this.body.mass = 500
        break
        
      case EssenceType.Resonance:
        // Could create vibration or sound effects
        break
    }
  }

  public getImbuedEssence(): EssenceType | null {
    return this.imbuedEssence
  }
} 