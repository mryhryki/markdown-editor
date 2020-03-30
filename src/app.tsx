import React, {
  useState,
  useEffect,
} from 'react'
import dayjs from 'dayjs'
import { addHistory } from './util/history'
import { Header } from './component/header'
import { Button } from './component/button'
import { Editor } from './component/editor'
import { SaveModal } from './component/save_modal'

export const App: React.FC = () => {
  const [text, setText] = useState<string>('')
  const [modal, setModal] = useState<React.ReactNode | null>(null)

  const onChangeText = (text: string): void => {
    setText(text)
    localStorage.setItem('text', text)
  }

  useEffect(() => {
    setText(localStorage.getItem('text') || '')
  }, [])

  const onSave = (): void => {
    setModal(
      <SaveModal
        onSave={(title) => {
          addHistory(dayjs().format('YYYY-MM-DD HH:mm:ss'), title, text)
            .catch(console.error)
            .finally(() => setModal(null))
        }}
        onCancel={() => setModal(null)}
      />,
    )
  }

  return (
    <>
      <Header>
        <Button onClick={onSave}>
          保存
        </Button>
      </Header>
      <Editor text={text} setText={onChangeText} />
      {modal != null ? modal : null}
    </>
  )
}
