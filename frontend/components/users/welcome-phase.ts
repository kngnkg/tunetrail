export type Phase = "username" | "profile" | "complete"

export const isPhase = (phase: string): phase is Phase => {
  return ["username", "profile", "complete"].includes(phase)
}
