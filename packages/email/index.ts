import {render as renderHtml, renderPlainText} from 'jsx-email'

/**
 * Render a React component to an to be used in an email
 *
 * @param component The template to render
 * @returns
 */
export const render = async (component: React.ReactElement) => {
  const [text, html] = await Promise.all([
    renderPlainText(component),
    renderHtml(component),
  ])

  return {
    text,
    html,
  }
}
