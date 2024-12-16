import { AdvertCards } from "../../constants/sharedTypes.ts";

export enum PurchaseStatus {
    Pending = 'pending',
    InProgress = 'in_progress',
    Completed = 'completed',
    Cancelled = 'cancelled',
}

export const PURCHASE_STATUS_MAPPING = {
    [PurchaseStatus.Pending]: 'В ожидании',
    [PurchaseStatus.InProgress]: 'Активен',
    [PurchaseStatus.Completed]: 'Завершен',
    [PurchaseStatus.Cancelled]: 'Отменен',
}


export enum DeliveryMethod { 
    Pickup = 'pickup',
    Delivery = 'delivery',
}

export const DELIVERY_METHOD_MAPPING = {
    [DeliveryMethod.Pickup]: 'Заберу у продавца',
    [DeliveryMethod.Delivery]:'Доставка',
}

type PaymentMethod = 'cash' | 'card';

export interface Purchase {
    address: string,
    customer_id: string,
    delivery_method: DeliveryMethod | string,
    id: string,
    payment_method: PaymentMethod,
    seller_id: string,
    status: PurchaseStatus | string,
    adverts: AdvertCards,
    image_url?: string,
    price?: number,
    title?: string,
    sellerPhone?: string
}

export type Purchases = Purchase[];

export interface OrdersTemplateData {
    notEmpty: boolean,
    orders: Purchases | null,
}
