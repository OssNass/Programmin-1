/* ./setup/shiki.ts */
import { defineShikiSetup } from '@slidev/types'
import PenguinTheme from './theme/penguin-theme.json'

export default defineShikiSetup(() => ({
  // theme: PenguinTheme,
  theme: 'catppuccin-latte',
  // theme: 'github-light',
}))
