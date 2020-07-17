import { TShopPreview } from '@/services/shop/shopListSpecial'

interface SpecialLabels {
  label: string
  key: keyof TShopPreview
  judge: (v: any) => boolean
}

export const specialLabels: SpecialLabels[] = [{
  label: '超挑高',
  key: 'shopHeight',
  judge: (v: number | null) => v !== null && v >= 5.5
}, {
  label: '大开间',
  key: 'shopWidth',
  judge: (v: number | null) => v !== null && v >= 5
}, {
  label: '超大外摆',
  key: 'shopOutsideArea',
  judge: (v: number | null) => v !== null && v >= 7
}, {
  label: '转角铺',
  key: 'shopIsCorner',
  judge: (v: boolean | null) => !!v
}, {
  label: '一拖二',
  key: 'shopIsDoubleLayer',
  judge: (v: boolean | null) => !!v
}]
