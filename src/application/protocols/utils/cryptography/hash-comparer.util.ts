export interface HashComparer {
  compare: (hash: string, value: string) => Promise<boolean>
}
