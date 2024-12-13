import { AdvertCards } from '../../constants/sharedTypes'

export interface CartTemplateData {
    notEmpty: boolean,
    imgUrl: string,
    adverts: AdvertCards,
    numberOfItems: string,
    totalPrice: string
}

interface CartPurchase {
    adverts: AdvertCards,
    seller_id: string
}

export interface Cart {
    cart_purchases: CartPurchase[]
    id: string,
    status: string,
    user_id: string
}