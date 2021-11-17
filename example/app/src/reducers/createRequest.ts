import { setFunctionName } from 'redux-use'

const createRequest = <Data, Params = void>(url: string, method: string = 'GET') => {
  const prefix = 'http://localhost:4040/'
  const { [url]: fn } = {
    [url]: async (params: Params): Promise<Data> => {
      let rurl = `${prefix}${url}`
      if (method === 'PATCH') rurl += '/' + (params as any).id
      return fetch(rurl, {
        method,
        body: JSON.stringify(params),
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) => res.json())
    }
  }
  return setFunctionName(`[${method}]${url}`, fn)
}

export default createRequest