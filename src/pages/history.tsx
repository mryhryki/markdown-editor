import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '../components/button'

export const History: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <h1>History</h1>
      <Button onClick={() => history.push('/editor')}>
        エディタへ戻る
      </Button>
    </>
  )
}
