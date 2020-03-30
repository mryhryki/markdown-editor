import React, {
  useState,
  useEffect,
} from 'react'
import dayjs from 'dayjs'
import { getQueryParams } from './util/query_params'
import {
  addHistory,
  listHistory,
} from './util/history'
import { Header } from './component/header'
import { Button } from './component/button'
import { Editor } from './component/editor'

export const App: React.FC = () => {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    const queryParams = getQueryParams(window.location.search)
    if (queryParams.text != null && queryParams.text.trim() !== '') {
      setText(queryParams.text)
    } else {
      listHistory(0).then((histories) => {
        if (histories[0] != null) {
          setText(histories[0].text)
        }
      })
    }
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
      <Editor text={text} setText={setText} />
    </div>
  )
}
