export interface cartInterface{
    name: string,
    quantity: string,
    category: string,
    unit_amount: {
      currency_code: string,
      value: string,
    }
}