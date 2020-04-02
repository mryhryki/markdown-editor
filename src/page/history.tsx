import React, {
  useEffect,
  useState,
} from 'react'
import {
  useHistory,
  Link,
} from 'react-router-dom'
import { Header } from '../component/header'
import { Button } from '../component/button'
import styled from 'styled-components'
import {
  countHistory,
  listHistory,
  NUM_PER_PAGE,
} from '../util/history'

const Histories = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HistoryCard = styled(Link)`
  border: 1px solid silver;
  color: black;
  display: block;
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
  height: 1rem;
  line-height: 1rem;
  overflow: hidden;
  padding: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const HistoryDatetime = styled.div`
  font-size: 0.85rem;
  margin-top: 0.5rem;
  text-align: right;
`

const Pager = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  height: 3rem;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
`

const PagerButton = styled.button`
  border: none;
  padding: 0;
  margin: 0 0.5rem;
  
`

export const History: React.FC = () => {
  const browserHistory = useHistory()
  const [page, setPage] = useState(1)
  const [history, setHistory] = useState([])
  const [totalPage, setTotalPage] = useState(1)

  const onChangePage = (newPage: number): void => {
    setPage(newPage)
    listHistory(newPage).then((history) => {
      setHistory(history)
    })
  }

  useEffect(() => {
    onChangePage(1)
    countHistory().then((count) => {
      setTotalPage(Math.ceil(count / NUM_PER_PAGE))
    })
  }, [])

  return (
    <>
      <Header title="履歴">
        <Button onClick={() => browserHistory.push('/')}>
          エディタに戻る
        </Button>
      </Header>
      <Histories>
        {history.map(h => (
          <HistoryCard to={`/#id=${encodeURIComponent(h.datetime)}`} key={h.datetime}>
            <HistoryTitle>{h.title}</HistoryTitle>
            <HistoryText>{h.text}</HistoryText>
            <HistoryDatetime>{h.datetime}</HistoryDatetime>
          </HistoryCard>
        ))}
      </Histories>
      <Pager>
        <PagerButton onClick={() => onChangePage(page - 1)} disabled={page <= 1}>＜</PagerButton>
        {page} / {totalPage}
        <PagerButton onClick={() => onChangePage(page + 1)} disabled={page >= totalPage}>＞</PagerButton>
      </Pager>
    </>
  )
}
