import { getQueryParams } from './query_params'

describe('getQueryParams', () => {
  it('空文字の場合は空のオブジェクトが返ること', () => {
    const expectObject = {}
    const result = getQueryParams('')
    expect(result).toEqual(expectObject)
  })

  it('正常にパースされたオブジェクトが返ること', () => {
    const expectObject = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    }
    const result = getQueryParams('?key1=value1&key2=value2&key3=value3')
    expect(result).toEqual(expectObject)
  })

  it('URLエンコードされたクエリパラメータが正常にデコードされて返ること', () => {
    const kigou = ';,/?:@&=+$#'
    const hiragana = 'あいうえお'
    const kanji = '値'
    const emoji = '😆🎉'

    const expectObject = { kigou, hiragana, kanji, emoji }
    const query = [
      `kigou=${encodeURIComponent(kigou)}`,
      `hiragana=${encodeURIComponent(hiragana)}`,
      `kanji=${encodeURIComponent(kanji)}`,
      `emoji=${encodeURIComponent(emoji)}`
    ].join('&')

    const result = getQueryParams(`?${query}`)
    expect(result).toEqual(expectObject)
  })
})
