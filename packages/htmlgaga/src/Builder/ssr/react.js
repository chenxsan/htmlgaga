import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
export default function Render(App) {
  return renderToStaticMarkup(createElement(App))
}