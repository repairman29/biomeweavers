import { Actor, Vector, Color, CollisionType } from 'excalibur'
import { GameConfig } from '../config/GameConfig'
import { EssenceType } from '../types/EssenceType'

export class EssenceSource extends Actor {
  public readonly essenceType: EssenceType
  public isConsumed = false

  constructor(x: number, y: number, essenceType: EssenceType) {
    const color = GameConfig.ESSENCE_COLORS[essenceType]
    
    super({
      pos: new Vector(x, y),
      width: 24,
      height: 24,
      color: Color.fromHex(color),
      collisionType: CollisionType.Passive
    })
    
    this.essenceType = essenceType
  }

  public consume(): void {
    this.isConsumed = true
    this.kill()
    console.log(`💫 ${this.essenceType} essence source consumed`)
  }
} 