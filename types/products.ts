export type ProductsType = {
  key: string
  category: CATEGORY
  name: string
  content: string
  price: string
  disabled: Boolean
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