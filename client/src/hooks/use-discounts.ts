import { DiscountList } from '../types'
import { formatMoney } from '../utils/format-money'

// TODO: fetch data from server
const discountList: DiscountList = {
  orange: {
    count: 2,
    info: `Today's special: Get 2 for ${formatMoney(3)}`,
    name: 'orange',
    price: 1.5,
  },
}

export function useDiscounts(): DiscountList {
  return discountList
}
