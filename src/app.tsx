import React, {
  useState,
  useEffect,
} from 'react'
import { getQueryParams } from './util/query_params'

export const App: React.FC = () => {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    const queryParams = getQueryParams(window.location.search)
    if (queryParams.text != null && queryParams.text.trim() !== '') {
      setText(queryParams.text)
    }
  }, [])

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
