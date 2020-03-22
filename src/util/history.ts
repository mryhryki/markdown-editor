import Dexie from 'dexie'

export interface History {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('history')
database.version(1)
        .stores({ histories: '&datetime,title,text' })
const histories: Dexie.Table<History, string> = (database as any).histories

export const addHistory = async (datetime: string, title: string, text: string): Promise<void> => {
  await histories.put({ datetime, title, text })
}

export const getHistory = async (datetime: string): Promise<History | null> => {
  const history = await histories.where({ datetime })
  const count = await history.count()
  if (count > 0) {
    return history.first()
  }
  return null
}

const NUM_PER_PAGE = 50
export const listHistory = async (page: number = 1): Promise<Array<History>> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return await histories.orderBy('datetime')
                        .reverse()
                        .offset(offset)
                        .limit(NUM_PER_PAGE)
                        .toArray()
}
