import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  children: string
}

export const Preview: React.FC<Props> = (props) => {
  const { children: text } = props

  return (
    <ReactMarkdown source={text} />
  )
}
