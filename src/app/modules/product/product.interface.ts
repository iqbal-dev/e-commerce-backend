export type TVariant = {
  type: string
  value: string
}

export type TInventory = {
  quantity: number
  inStock: boolean
}
export type TProduct = {
  sku: string
  name: string
  description: string
  price: number
  tags: string[]
  variants: TVariant[]
  inventory: TInventory
  category: string
  weight: number
}
