import React, { FC, memo } from 'react'
import BuildingPreview from '@/businessComponents/BuildingPreview'
import { IBuildingPreviewWithShare } from '@/services/building/buildingList'
// import { scaleSize } from '@/utils/screenUtil'
import BdtItem from '@/businessComponents/Bdt'

interface IProps {
  data: IBuildingPreviewWithShare
  pageFrom: string
  separator?: boolean
}

const BuildingPreviewWithShare: FC<IProps> = ({ data, separator, pageFrom }) => {
  return (
    <BuildingPreview
      data={data}
      separator={separator}
      extention={<BdtItem
        buildingFormat={data.buildingFormat}
        name={data.buildingTreeName}
        buildingTreeId={data.buildingTreeId}
        avatorSourceList={data.avatarList}
        number={data.number}
      />}
    />
  )
}

export default memo(BuildingPreviewWithShare)
