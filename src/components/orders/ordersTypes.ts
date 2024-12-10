import { AdvertCards } from "../../constants/sharedTypes.ts";

type PurchaseStatus = 'pending' | 'В ожидании' | 'in_progress' | 'Активен' | 'completed' | 'Завершен' | 'cancelled' | 'Отменен';
type DeliveryMethod = 'pickup' | 'Самовывоз у продавца' | 'delivery' | 'Доставка';
type PaymentMethod = 'cash' | 'card';

export interface Purchase {
    address: string,
    customer_id: string,
    delivery_method: DeliveryMethod,
    id: string,
    payment_method: PaymentMethod,
    seller_id: string,
    status: PurchaseStatus,
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
