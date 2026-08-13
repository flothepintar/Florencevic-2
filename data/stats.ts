// Verified workspace figures. These are file counts, not achievement claims.

export interface Stat {
  value: number
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 488, suffix: '+', label: 'Automation & application code files' },
  { value: 134, label: 'PowerShell scripts' },
  { value: 102, label: 'Python files' },
  { value: 95, label: 'JavaScript files' },
  { value: 92, label: 'Java files' },
  { value: 56, label: 'CMD scripts' },
  { value: 8, label: 'VBS utilities' },
]
