'use client'

import {useClipboard} from '@/app/hooks/use-clipboard'
import {Check, Copy} from '@repo/design-system/components/icons'
import {Button} from '@repo/design-system/components/ui/button'

export function Share({url}: {url: string}) {
  const {hasCopied, onCopyToClipBoard} = useClipboard(url)

  return (
    <div className="flex items-center justify-center">
      <div className="text-sm px-4 py-2 border rounded">{url}</div>
      <Button
        title="Copy to clipboard"
        variant="ghost"
        onClick={onCopyToClipBoard}
        className="ml-2"
      >
        {hasCopied ? (
          <Check className="text-emerald h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
