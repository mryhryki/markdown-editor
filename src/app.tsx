import React, {
  useState,
  useEffect,
} from 'react'
import dayjs from 'dayjs'
import { addHistory } from './util/history'
import { Header } from './component/header'
import { Button } from './component/button'
import { Editor } from './component/editor'

export const App: React.FC = () => {
  const [text, setText] = useState<string>('')

  const onChangeText = (text: string): void => {
    setText(text)
    localStorage.setItem('text', text)
  }

  useEffect(() => {
    setText(localStorage.getItem('text') || '')
  }, [])

  return (
    <div id="wrapper">
      <Header>
        <Button
          onClick={() => {
            const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss')
            addHistory(datetime, datetime, text)
              .catch(console.error)
          }}
        >
          保存
        </Button>
      </Header>
      <Editor text={text} setText={onChangeText} />
    </div>
  )
}
