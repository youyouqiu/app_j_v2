/**
 * @author: zxs
 * @date: 2020/5/27
 */

export interface ICompanyCodePropsType {
  handleSaveCode?: () => void,
  handleShareCode?: () => void,
}

export interface ICompanyCodeStateType {
  qrCodeData: string,
  qrCodeError: string,
  qrCodeLoading: boolean
}
