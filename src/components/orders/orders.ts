import template from './orders.hbs';
import { OrdersTemplateData } from './ordersTypes.ts';
import { informationStorage } from '../../modules/informationStorage.ts';
import ajax from '../../modules/ajax.ts';
import { ResponseSeller, ResponseUser } from '../../modules/ajaxTypes.ts';
import { EmptyPlaceholderTemplateData } from '../emptyPlaceholder/emptyPlaceholderTypes.ts';
import { renderEmptyPlaceholder } from '../emptyPlaceholder/emptyPlaceholder.ts';

export async function renderOrders(data: OrdersTemplateData) {
    if(!data.orders){
        return template({ notEmpty: data.notEmpty, orders: data.orders});
    }
    const orders = data.orders;
    for(const order of orders) {
        switch(order.status) {
            case 'pending':
                order.status = 'В ожидании';
                break;
            case 'in_progress':
                order.status = 'Активен';
                break;
            case 'completed':
                order.status = 'Завершен';
                break;
            case 'cancelled':
                order.status = 'Отменен';
                break;
        }

        switch(order.delivery_method){
            case 'pickup':
                order.delivery_method = 'Самовывоз у продавца';
                if(order.address === ''){
                    order.address = order.adverts[0].preview.location;
                }
                break;
            case 'delivery':
                order.delivery_method = 'Доставка';
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