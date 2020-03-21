interface QueryParams {
  [key: string]: string
}

export const getQueryParams = (query: string): QueryParams => {
  if (query === '') {
    return {}
  }

  const object: QueryParams = {}
  query
    .substr(1) // 先頭の '?' を除去
    .split('&')
    .forEach((str): void => {
      const [key, value] = str.split('=', 2)
      object[key] = decodeURIComponent(value)
    })

  return object
}
