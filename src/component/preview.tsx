import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Worker from 'worker-loader!../worker/markdown.ts'

const worker = new Worker()

interface Props {
  children: string
}

export const Preview: React.FC<Props> = (props) => {
  const { children: text } = props

  useEffect(() => {
    worker.postMessage({ text: 'DUMMY' })
    worker.onmessage = (event) => {
      console.log(event.data)
    }
  }, [])

  return (
    <div className="markdown-body">
      <ReactMarkdown source={text} />
    </div>
  )
}
