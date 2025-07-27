import type { Product } from '@/types/Product.ts'
export type State = {
  allProducts: Product[]
  displayedCount: number
  showDifferences: boolean
  replaceModal: {
    isOpen: boolean
    targetProductId: number | null
  }
}
