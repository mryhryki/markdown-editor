import React, {
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import { Button } from './button'
import dayjs from 'dayjs'

const Wrapper = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`

const Control = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`

interface Props {
  onSave: (title: string) => void
  onCancel: () => void
}

export const SaveModal: React.FC<Props> = props => {
  const { onCancel, onSave } = props
  const [title, setTitle] = useState('')

  useEffect(() => {
    setTitle(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  }, [])

  return (
    <Wrapper>
      <Modal>
        <p>テキストの内容を保存します。</p>
        <p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
        <p>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <Control>
          <Button onClick={onCancel}>
            キャンセル
          </Button>
          <Button onClick={() => onSave(title)} action>
            保存
          </Button>
        </Control>
      </Modal>
    </Wrapper>
  )
}
