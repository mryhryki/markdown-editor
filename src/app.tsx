import * as React from 'react'

export const App: React.FC = () => {
  return (
    <div id="wrapper">
      <header>
        <h1>Markdown Editor</h1>
      </header>
      <div id="editor">
        <textarea id="markdown-text">Text Area</textarea>
        <div id="markdown-preview">Preview Area</div>
      </div>
    </div>
  )
}
