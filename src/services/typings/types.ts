/**
 * 分页请求体
 */
export interface RequestPagination {
  pageIndex: number
  pageSize: number
}

/**
 * 普通响应体
 */
export interface ResponseCommon<T> {
  code: string
  message: string | null
  extension: T
}

/**
 * 分页响应体
 */
export interface ResponsePagination<T> extends ResponseCommon<T> {
  pageIndex: number
  pageSize: number
  pageCount: number
  totalCount: number
}
