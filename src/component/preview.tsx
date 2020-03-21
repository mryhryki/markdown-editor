import React from 'react'

interface Props {
  children: string
}

export const Preview: React.FC<Props> = (props) => {
  const { children: text } = props

  return (
    <div>{text}</div>
  )
}
