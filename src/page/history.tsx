import React, {
  useEffect,
  useState,
} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Header } from '../component/header'
import { Button } from '../component/button'
import styled from 'styled-components'
import { listHistory } from '../util/history'

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HistoryCard = styled(Link)`
  border: 1px solid silver;
  display: block;
  color: black;
  margin: 0.5rem auto;
  max-width: 48rem;
  padding: 1rem;
  text-decoration: none;
`

const HistoryTitle = styled.h2`
  font-size: 1rem;
`

const HistoryText = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  height: 1rem;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const HistoryDatetime = styled.div`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  text-align: right;
`

export const History: React.FC = () => {
  const browserHistory = useHistory()
  const [page, setPage] = useState(1)
  const [history, setHistory] = useState([])

  const onChangePage = (newPage: number): void => {
    setPage(newPage)
    listHistory().then((history) => {
      setHistory(history)
    })
  }

  useEffect(() => onChangePage(1), [])

  return (
    <>
      <Header title="履歴">
        <Button onClick={() => browserHistory.push('/')}>
          エディタに戻る
        </Button>
      </Header>
      <Wrapper>
        {history.map(h => (
          <HistoryCard to={`/#id=${encodeURIComponent(h.datetime)}`} key={h.datetime}>
            <HistoryTitle>{h.title}</HistoryTitle>
            <HistoryText>{h.text}</HistoryText>
            <HistoryDatetime>{h.datetime}</HistoryDatetime>
          </HistoryCard>
        ))}
      </Wrapper>
    </>
  )
}
