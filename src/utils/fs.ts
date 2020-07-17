import rnfs from 'react-native-fs'

export async function downloadFile(url: string, ext: string) {
  const pathName = `${new Date().getTime()}.${ext}`
  const downloadDest = `${rnfs.DocumentDirectoryPath}/${pathName}`
  const res = await rnfs.downloadFile({ fromUrl: url, toFile: downloadDest }).promise
  if (!res || res.statusCode !== 200) {
    throw new Error(`${url}下载失败`)
  }
  return `file://${downloadDest}`
}
