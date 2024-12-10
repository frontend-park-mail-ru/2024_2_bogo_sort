import { Categories } from '../../constants/sharedTypes';

export interface AdvertCreateTemplateData {
    category: Categories,
    imagePreview: boolean
};

export type AdvertStatus = 'active' | 'inactive' | 'reserved';

export interface AdvertCreateFormData {
    title: string,
    price: string | Number,
    location: string,
    category_id: string,
    description: string,
    seller_id: string,
    has_delivery: boolean,
    status: AdvertStatus
};

export interface AdvertCreated {
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

