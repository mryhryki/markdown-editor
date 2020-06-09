import * as React from 'react'
import styled from 'styled-components'
import * as ReactMarkdown from 'react-markdown'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import set = Reflect.set

const { useState } = React

const Header = styled.header`
  align-content: center;
  display: flex;
  font-size: 1.5rem;
  height: 2rem;
  justify-content: space-between;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const HeaderControl = styled.div`
  height: 2rem;
  display: flex;
  align-content: center;
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
  const [text, setText] = useStateWithStorage('', StorageKey)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Header>
        Markdown Editor
        <HeaderControl>
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
        </HeaderControl>
      </Header>
      <Wrapper>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Preview>
          <ReactMarkdown source={text} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text)
            setShowModal(false)
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}
