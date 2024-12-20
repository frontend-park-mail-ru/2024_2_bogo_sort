export interface User { 
    avatar_id: string,
    created_at: string,
    email: string,
    id: string,
    phone: string,
    status: string,
    updated_at: string,
    username: string
}

export interface Seller {
    description: string,
    id: string,
    user_id: string
}

export type AdvertStatus = 'active' | 'inactive' | 'reserved';

export interface AdvertPreview {
    category_id: string,
    has_delivery: boolean,
    id: string,
    image_id: string,
    location: string,
    price: number,
    promoted_until: string,
    seller_id: string,
    status: AdvertStatus;
    title: string
}

export interface AdvertCard { 
    is_saved: boolean,
    is_viewed: boolean,
    preview: AdvertPreview,
    image_url?: string
};

export type AdvertCards = AdvertCard[];

export interface MyAdvert {
    preview: AdvertPreview,
    saves_number: number,
    views_number: number
}

export type MyAdverts = MyAdvert[];

export interface Category {
    name: string,
    iconUrl: string,
    redirectUrl: string,
    id: string
};

export type Categories = Category[];

export interface Callback {
    callback: (() => void) | null;
}

export interface PipeNames {
    updateHeader: Callback,
    showAuthForm: Callback,
    showSignupForm: Callback,
    [key: string]: Callback
}

interface Route {
    href: string,
    name: string,
    render: ((arg1: HTMLElement, arg2?: string) => void),
    [key: string]: string | ((arg1: HTMLElement, arg2?: string) => void)
}

export interface Routes {
    '/': Route,
    '/login': Route,
    '/signup': Route,
    '/item': Route,
    '/create': Route,
    '/cart': Route,
    '/category': Route,
    '/edit': Route,
    '/user': Route,
    '/seller': Route,
    '/search': Route,
    [key: string]: Route
}

interface menuItem {
    name: string,
    iconUrl: string,
    redirectUrl: string,
    engName: string
}

type menuItems = menuItem[]

export interface HeaderData {
    checkAuth: boolean,
    userName: string | null,
    userImgUrl: string | null,
    category: Categories,
    cartItems: number,
    cartItemsClass: string,
    menuItems: menuItems
}

export interface Months {
    [key: number]: string
}