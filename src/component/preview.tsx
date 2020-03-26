import React, {
  useEffect,
  useState,
} from 'react'
import Worker from 'worker-loader!../worker/markdown.ts'
import HtmlToReact from 'html-to-react'

const htmlParser = new HtmlToReact.Parser()
const worker = new Worker()

interface Props {
  children: string
}

let modified: number = 0
export const Preview: React.FC<Props> = (props) => {
  const { children: text } = props
  const [previewHtml, setPreviewHtml] = useState('')

  useEffect(() => {
    const now = (new Date()).getTime()
    modified = now
    setTimeout(() => {
      if (modified === now) {
        worker.postMessage({ markdown: text })
      }
    }, 500)
  }, [text])

  useEffect(() => {
    worker.onmessage = (event) => {
      const { html } = event.data
      setPreviewHtml(html)
    }
  }, [])

  return (
    <div className="markdown-body">
      {htmlParser.parse(previewHtml)}
    </div>
  )
}
