import { Actor, Vector, Color, CollisionType, Keys } from 'excalibur'
import { GameConfig } from '../config/GameConfig'
import { EssenceType } from '../types/EssenceType'

export class Player extends Actor {
  private heldEssence: EssenceType | null = null
  private isGrounded = false

  constructor(x: number, y: number) {
    super({
      pos: new Vector(x, y),
      width: 32,
      height: 48,
      color: Color.fromHex(GameConfig.LILA_COLOR),
      collisionType: CollisionType.Active
    })
    
    this.body.mass = 10
    this.body.friction = 0.3
  }

  public onInitialize(): void {
    // Set up collision detection for grounded state
    this.on('postcollision', (evt) => {
      // Check if we're touching ground from above (landing on platforms)
      if (evt.side === 'Bottom') {
        this.isGrounded = true
        console.log('🟢 Player grounded')
      }
    })
  }

  public onPreUpdate(): void {
    // Reset grounded state at start of each frame
    this.isGrounded = false
    
    this.handleInput()
    this.updateVisuals()
  }

  private handleInput(): void {
    const keyboard = this.scene?.engine.input.keyboard
    if (!keyboard) return

    let movement = 0

    // Horizontal movement
    if (keyboard.isHeld(Keys.A) || keyboard.isHeld(Keys.Left)) {
      movement = -1
    }
    if (keyboard.isHeld(Keys.D) || keyboard.isHeld(Keys.Right)) {
      movement = 1
    }

    // Apply horizontal velocity
    this.vel.x = movement * GameConfig.PLAYER_SPEED

    // Jumping - with debug info
    if (keyboard.wasPressed(Keys.W) || keyboard.wasPressed(Keys.Space)) {
      console.log(`🚀 Jump attempt: grounded=${this.isGrounded}, pos=${this.pos.x.toFixed(1)},${this.pos.y.toFixed(1)}`)
      if (this.isGrounded) {
        this.vel.y = GameConfig.JUMP_FORCE
        console.log('✅ Jumping!')
      } else {
        console.log('❌ Not grounded, cannot jump')
      }
    }
  }

  private updateVisuals(): void {
    // Change color based on held essence
    if (this.heldEssence) {
      const essenceColor = GameConfig.ESSENCE_COLORS[this.heldEssence]
      this.color = Color.fromHex(essenceColor)
    } else {
      this.color = Color.fromHex(GameConfig.LILA_COLOR)
    }
  }

  public absorbEssence(essenceType: EssenceType): void {
    if (this.heldEssence === null) {
      this.heldEssence = essenceType
      console.log(`🌱 Absorbed ${essenceType} essence`)
    }
  }

  public getHeldEssence(): EssenceType | null {
    return this.heldEssence
  }

  public consumeEssence(): void {
    if (this.heldEssence) {
      console.log(`✨ Imbued ${this.heldEssence} essence`)
      this.heldEssence = null
    }
  }

  public hasEssence(): boolean {
    return this.heldEssence !== null
  }
} 