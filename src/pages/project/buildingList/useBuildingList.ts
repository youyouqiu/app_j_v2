import { useState, useEffect, useRef } from 'react'
import api, {
  IBuildingPreviewWithShare,
  BuildingListSearchConditions,
  BuildingListRequestConditions,
} from '@/services/building/buildingList'

interface Buildings {
  data: IBuildingPreviewWithShare[]
  totalCount: number
  loading: boolean
}

const useBuildingList = (initSearchConditions?: BuildingListSearchConditions) => {
  const [inited, setInited] = useState(false)
  const [buildings, setBuildings] = useState<Buildings>({
    data: [undefined!, undefined!],
    totalCount: 0,
    loading: false,
  })
  const searchConditions = useRef(initSearchConditions)
  const pagination = useRef({ pageIndex: 0, pageSize: 15 })
  const syncLoading = useRef(false)

  useEffect(() => {
    initData()
  }, [])

  // 初始化楼盘列表数据
  const initData = async () => {
    const requestConditions = {
      pageIndex: pagination.current.pageIndex,
      pageSize: pagination.current.pageSize,
      ...initSearchConditions,
    }
    await fetchBuildingList(requestConditions)
    setInited(true)
  }

  // 请求楼盘列表接口(含搜索)
  const fetchBuildingList = async (requestConditions: BuildingListRequestConditions) => {
    if (syncLoading.current) return
    syncLoading.current = true
    const setBuildingLoading = (loading: boolean) => {
      setBuildings({ ...buildings, loading })
    }
    setBuildingLoading(true)
    try {
      const { extension, pageIndex, totalCount } = await api.postBuildingList(requestConditions)
      pagination.current.pageIndex = pageIndex
      setBuildings({
        data: pageIndex ? [...buildings.data, ...extension] : [undefined!, undefined!, ...extension],
        totalCount,
        loading: false,
      })
    } catch (err) {
      console.log(err)
      setBuildingLoading(false)
    }
    syncLoading.current = false
  }

  // 上拉加载
  const fetchNextPageOfBuildings = async () => {
    if (inited && buildings.data.length - 2 === buildings.totalCount) return
    const requestConditions = {
      pageIndex: pagination.current.pageIndex + 1,
      pageSize: pagination.current.pageSize,
      ...searchConditions.current,
    }
    await fetchBuildingList(requestConditions)
  }

  // 选择搜索条件
  const fetchBuildingsByConditions = async (_searchConditions: BuildingListSearchConditions) => {
    searchConditions.current = _searchConditions
    const requestConditions = {
      pageIndex: 0,
      pageSize: pagination.current.pageSize,
      ..._searchConditions,
    }
    // 后端问题字段处理
    if (requestConditions.projectType !== undefined) {
      requestConditions.projectType = requestConditions.projectType ? 1 : undefined
    }
    await fetchBuildingList(requestConditions)
  }

  return {
    inited,
    buildings,
    fetchNextPageOfBuildings,
    fetchBuildingsByConditions,
  }
}

export default useBuildingList
