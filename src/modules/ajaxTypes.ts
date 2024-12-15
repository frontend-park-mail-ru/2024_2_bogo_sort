import { AdvertCreated, AdvertCreateFormData } from "@components/advertCreate/advertCreateTypes.ts";
import { User, Seller, AdvertCards, Categories, MyAdverts } from "@constants/sharedTypes.ts";
import { AuthData } from "@components/auth/authTypes.ts";
import { Advert } from "@components/obyavlenie/obyavlenieTypes.ts";
import { AdvertPriceHistory } from "@components/priceHistory/priceHistoryTypes.ts"
import { Cart } from "@components/cart/cartTypes.ts";
import { Purchases } from "@components/orders/ordersTypes.ts";

export interface ResponseError {
    error: string,
    code: number | undefined
}

export type ResponseUser = User; 

export type ResponseSeller = Seller;

export type ResponseSellerUser = ResponseSeller;

export type ResponseAdvertPost = AdvertCreated;

export type RequestAdvertPost = AdvertCreateFormData;

export type ResponseAdvertCards = AdvertCards;

interface ResponseCategory {
    ID: string,
    Title: string
}

export type ResponseCategories = ResponseCategory[];

export type ResponseAuth = string;

export type RequestAuth = AuthData;

export type ResponseAdvert = Advert;

export interface ResponseCartExists {
    cart_id: string
}

export type ResponseCart = Cart;

export type ResponseMyAdverts = MyAdverts;

export type ResponsePurchases = Purchases;

export type ResponseAdvertPriceHistory = AdvertPriceHistory;

export interface RequeestPaymentInit {
    item_id: string
} 

export interface ResponsePaymentInit {
    payment_url: string
}