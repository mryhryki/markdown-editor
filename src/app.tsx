import React, {
  useState,
  useEffect,
} from 'react'
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import dayjs from 'dayjs'
import { addHistory } from './util/history'
import { Editor } from './page/editor'
import { History } from './page/history'
import { SaveModal } from './component/save_modal'

export const App: React.FC = () => {
  const [text, _setText] = useState<string>('')
  const [modal, setModal] = useState<React.ReactNode | null>(null)

  const setText = (text: string): void => {
    _setText(text)
    localStorage.setItem('text', text)
  }

  useEffect(() => {
    _setText(localStorage.getItem('text') || '')
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
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Editor
              text={text}
              setText={setText}
              onSave={onSave}
            />
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
          <Redirect to="/" path="*" />
        </Switch>
      </HashRouter>
      {modal != null ? modal : null}
    </>
  )
}
