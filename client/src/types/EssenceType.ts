export enum EssenceType {
  // Lila's Life-Weaver essences
  Bouncy = 'bouncy',
  Sticky = 'sticky', 
  Growth = 'growth',
  
  // Kael's Earth-Shaper essences
  Solidify = 'solidify',
  Heavy = 'heavy',
  Resonance = 'resonance'
}

export type EssenceEffect = {
  type: EssenceType
  duration?: number
  strength?: number
} 