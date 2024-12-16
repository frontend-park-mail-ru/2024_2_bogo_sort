import template from './orders.hbs';
import { DELIVERY_METHOD_MAPPING, DeliveryMethod, OrdersTemplateData, PURCHASE_STATUS_MAPPING } from './ordersTypes.ts';
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
        order.status = PURCHASE_STATUS_MAPPING[order.status as PurchaseStatus];

        order.delivery_method = DELIVERY_METHOD_MAPPING[order.delivery_method as DeliveryMethod];

        const advert = order.adverts[0];
        if(order.address === '') {
            order.address = advert.preview.location;
        }
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