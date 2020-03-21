import React, { useState } from 'react'

export const App: React.FC = () => {
  const [text, setText] = useState<string>('')

  return (
    <div id="wrapper">
      <header>
        Markdown Editor
      </header>
      <div id="editor">
        <textarea
          id="markdown-text"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <div id="markdown-preview">{text}</div>
      </div>
    </div>
  )
}
