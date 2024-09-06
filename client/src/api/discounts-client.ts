import { DiscountList } from '../../../types'
import ApiClient from './api-client'

class DiscountsClient extends ApiClient {
  async getDiscounts(): Promise<DiscountList> {
    return this.get('/discounts')
  }
}

export default new DiscountsClient()
