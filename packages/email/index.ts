import {render as renderJSX, renderPlainText} from 'jsx-email'

import inlineCss from 'inline-css'

/**
 * Render a React component to an to be used in an email
 *
 * @param component The template to render
 * @returns
 */
export const render = async (component: React.ReactElement) => {
  const html = await renderJSX(component)
  return {
    text: await renderPlainText(component),
    html: await inlineCss(html, {url: ''}),
  }
}
