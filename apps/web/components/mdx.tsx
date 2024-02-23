import React from 'react'
import {cn} from '@repo/design-system/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

function Table({data}: {data: {headers: string[]; rows: string[][]}}) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function RoundedImage({alt, ...props}: React.ComponentProps<typeof Image>) {
  return <Image alt={alt} className="rounded-md border" {...props} />
}

function Callout(props: {emoji: string; children: React.ReactNode}) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  )
}

export let baseComponents = {
  h1: ({className, ...props}: React.ComponentProps<'h1'>) => (
    <h1
      className={cn(
        'title text-primary mt-2 scroll-m-20 text-2xl font-medium tracking-tighter',
        className,
      )}
      {...props}
    />
  ),
  h2: ({className, ...props}: React.ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'text-primary mt-10 scroll-m-20 border-b pb-1 text-xl font-medium tracking-tighter first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({className, ...props}: React.ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'text-primary mt-8 scroll-m-20 text-lg font-medium tracking-tighter',
        className,
      )}
      {...props}
    />
  ),
  h4: ({className, ...props}: React.ComponentProps<'h3'>) => (
    <h4
      className={cn(
        'text-md text-primary mt-8 scroll-m-20 font-medium tracking-tighter',
        className,
      )}
      {...props}
    />
  ),
  h5: ({className, ...props}: React.ComponentProps<'h5'>) => (
    <h5
      className={cn(
        'text-primary mt-8 scroll-m-20 text-sm font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  h6: ({className, ...props}: React.ComponentProps<'h6'>) => (
    <h6
      className={cn(
        'text-primary mt-8 scroll-m-20 text-sm font-semibold tracking-tight',
        className,
      )}
      {...props}
    />
  ),
  p: ({className, ...props}: React.ComponentProps<'p'>) => (
    <p className={cn('[&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({className, ...props}: React.ComponentProps<'ul'>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({className, ...props}: React.ComponentProps<'ol'>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({className, ...props}: React.ComponentProps<'li'>) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  strong: ({className, ...props}: React.ComponentProps<'strong'>) => (
    <strong className={cn('font-medium', className)} {...props} />
  ),
  blockquote: ({className, ...props}: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...props} />
  ),
  hr: ({...props}) => <hr className="my-4 md:my-8" {...props} />,
  table: ({className, ...props}: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({className, ...props}: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('even:bg-muted m-0 border-t p-0', className)}
      {...props}
    />
  ),
  th: ({className, ...props}: React.ComponentProps<'th'>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({className, ...props}: React.ComponentProps<'td'>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  pre: ({className, ...props}: React.ComponentProps<'pre'>) => (
    <pre
      className={cn(
        'overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900',
        className,
      )}
      {...props}
    />
  ),
  a: ({
    href,
    // eslint-disable-next-line no-unused-vars
    ref,
    ...props
  }: Omit<React.ComponentProps<'a'>, 'href'> & {
    href?: string
  }) => {
    const className =
      'underline hover:no-underline hover:text-neutral-200 transition-all decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]'

    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {props.children}
        </Link>
      )
    }

    if (href?.startsWith('#')) {
      return <a className={className} {...props} />
    }

    return (
      <a
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  },
  Image: RoundedImage,
  Callout,
  Table,
}
