export type ProductsType = {
  key: string
  category: string
  name: string
  content: string
  price: string
  stock: number
  disabled: boolean
}

enum CATEGORY {
  CERVEZAS,
  LICORES,
  ENERGIZANTES,
  GASEOSAS,
  SODAS,
  CIGARROS,
  PAPAS,
  MECATOS
}