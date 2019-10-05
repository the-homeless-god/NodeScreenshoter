export function createPostHeaders(param: any) {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(param)
  }
}
