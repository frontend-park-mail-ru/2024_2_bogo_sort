import { AdvertCards } from "../../constants/sharedTypes.ts";

export enum PurchaseStatus {
    Pending = 'pending',
    PendingRus = 'В ожидании',
    InProgress = 'in_progress',
    InProgressRus = 'Активен',
    Completed = 'completed',
    CompletedRus = 'Завершен',
    Cancelled = 'cancelled',
    CancelledRus = 'Отменен',
}

export enum DeliveryMethod { 
    Pickup = 'pickup',
    PickupRus = 'Самовывоз у продавца',
    Delivery = 'delivery',
    DeliveryRus = 'Доставка',
}
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
