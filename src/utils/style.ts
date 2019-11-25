import { StyleProp } from 'react-native'

export function isObjStyle<T>(style: StyleProp<T>): style is T {
  return typeof style === 'object'
    && style !== null
    && !Array.isArray(style)
}

export function flatStyle<T>(style: StyleProp<T>): T {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.flat(Infinity))
  }
  if (isObjStyle(style)) {
    return style
  }
  return {} as T
}
