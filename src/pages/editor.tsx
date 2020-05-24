import * as React from 'react'
import styled from 'styled-components'
import * as ReactMarkdown from 'react-markdown'

const { useState } = React

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

const StorageKey = 'pages/editor:text'

export const Editor: React.FC = () => {
  const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '')

  return (
    <>
      <Header>
        Markdown Editor
      </Header>
      <Wrapper>
        <TextArea
          onChange={(event) => {
            const changedText = event.target.value
            localStorage.setItem(StorageKey, changedText)
            setText(changedText)
          }}
          value={text}
        />
        <Preview>
          <ReactMarkdown source={text} />
        </Preview>
      </Wrapper>
    </>
  )
}
