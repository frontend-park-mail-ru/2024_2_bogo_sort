import template from './orders.hbs';
import { DeliveryMethod, OrdersTemplateData } from './ordersTypes.ts';
import { informationStorage } from '@modules/informationStorage.ts';
import ajax from '@modules/ajax.ts';
import { ResponseSeller, ResponseUser } from '@modules/ajaxTypes.ts';
import { PurchaseStatus } from './ordersTypes.ts';

export async function renderOrders(data: OrdersTemplateData) {
    if(!data.orders){
        return template({ notEmpty: data.notEmpty, orders: data.orders});
    }
    const orders = data.orders;
    for(const order of orders) {
        switch(order.status) {
            case PurchaseStatus.Pending:
                order.status = PurchaseStatus.PendingRus;
                break;
            case PurchaseStatus.InProgress:
                order.status = PurchaseStatus.InProgressRus;
                break;
            case PurchaseStatus.Completed:
                order.status = PurchaseStatus.CompletedRus;
                break;
            case PurchaseStatus.Cancelled:
                order.status = PurchaseStatus.CancelledRus;
                break;
        }

        switch(order.delivery_method){
            case DeliveryMethod.Pickup:
                order.delivery_method = DeliveryMethod.PickupRus;
                if(order.address === ''){
                    order.address = order.adverts[0].preview.location;
                }
                break;
            case DeliveryMethod.Delivery:
                order.delivery_method = DeliveryMethod.DeliveryRus;
                break;
        }
        const advert = order.adverts[0];
        order.id = order.id.slice(0, order.id.indexOf('-'));
        order.image_url = informationStorage.getImageUrl(advert.preview.image_id);
        order.price = advert.preview.price;
        order.title = advert.preview.title;
        const seller = await ajax.get<ResponseSeller>(`/seller/${order.seller_id}`);
        const user = await ajax.get<ResponseUser>(`/profile/${seller.user_id}`);
        order.sellerPhone = user.phone;
    }
    return template({ notEmpty: data.notEmpty, orders: data.orders});
}