'use client'

import { Button } from '~/components/ui/button'

export function TestButton() {
  return (
    <Button onClick={() => alert('Button works! 🚀')} variant="default">
      Click to test me
    </Button>
  )
}
