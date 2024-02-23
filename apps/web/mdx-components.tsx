/**
 * This file is used to configure MDX pages.
 *
 * see more:
 * https://nextjs.org/docs/pages/building-your-application/configuring/mdx
 */

import type {MDXComponents} from 'mdx/types'

import {baseComponents} from './components/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  }
}
