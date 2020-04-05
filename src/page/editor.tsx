import React, {
  ChangeEvent,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import Worker from 'worker-loader!../worker/markdown.ts'
import {
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Header } from '../component/header'
import { Button } from '../component/button'
import { Link } from '../component/link'
import HtmlToReact from 'html-to-react'
import { getQueryParams } from '../util/query_params'
import { getHistory } from '../util/history'

const htmlParser = new HtmlToReact.Parser()
const worker = new Worker()

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

interface Props {
  onSave: () => void
  text: string
  setText: (text: string) => void
}

let modified: number = 0
export const Editor: React.FC<Props> = (props) => {
  const { onSave, text, setText } = props
  const [previewHtml, setPreviewHtml] = useState('')
  const history = useHistory()
  const location = useLocation()

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
    const queryParams = getQueryParams(location.search)
    const { id } = queryParams
    if (id != null) {
      getHistory(id).then((history) => {
        if (history != null) {
          setText(history.text)
        }
      })
    }

    worker.onmessage = (event) => {
      const { html } = event.data
      setPreviewHtml(html)
    }
  }, [])

  return (
    <>
      <Header title="Markdown Editor">
        <Button onClick={onSave}>
          保存する
        </Button>
        <Link href="/history">
          履歴を見る
        </Link>
      </Header>
      <Wrapper>
        <TextArea
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
          value={text}
        />
        <Preview className="markdown-body">
          {htmlParser.parse(previewHtml)}
        </Preview>
      </Wrapper>
    </>
  )
}
