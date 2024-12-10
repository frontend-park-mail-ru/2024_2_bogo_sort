import { AdvertStatus } from "../../constants/sharedTypes"

interface AdvertInternal {
    category_id: string,
    created_at: string,
    description: string,
    has_delivery: boolean,
    id: string,
    image_id: string,
    location: string,
    price: number,
    saves_number: number,
    seller_id: string,
    status: AdvertStatus,
    title: string,
    updated_at: string,
    views_number: number
}

export interface Advert {
    is_saved: boolean,
    is_viewed: boolean,
    advert: AdvertInternal
}

export interface AdvertTemplateData {
    isLiked: boolean,
    title: string,
    imageUrl: string,
    description: string,
    price: number,
    views: number,
    likes: number,

    category: string,
    categoryUrl: string,

    isAuthor: boolean,
    reserved: boolean,
    inactive: boolean,
    normal: boolean,
    inCart: boolean,

    sellerName: string,
    sellerImgUrl: string,
    sellerPhone: string,
    sellerTimestamp: string,

    location: string,
    createdAt: string,
}