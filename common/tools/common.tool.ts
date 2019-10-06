export default {
  hash: (s: string) => {
    let h = 0,
      l = s.length,
      i = 0
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0

    if (h < 0) return h * -1
    else return h + h
  }
}

export const toArray = (myEnum: any) => {
  return Object.keys(myEnum).map(key => myEnum[key])
}

// add types from screenshooter class
export const log = (name: any) => {
  console.log(name)
}

export const isNonEmpty = (obj: any) => {
  return obj !== undefined && obj !== null && obj !== ''
}

export const isNonEmptyList = (list: any[]) => {
  let flag = true
  for (var i = 0; i < list.length; i++) {
    if (!isNonEmpty(list[i])) {
      flag = false
      break
    }
  }
  return flag
}
