interface AdvertHistory {
    AdvertID: string,
    ChangedAt: string,
    ID: string,
    NewPrice: number,
    OldPrice: number 
}

export type AdvertPriceHistory = AdvertHistory[];

export interface Point {
    x: number,
    y: number,
    price: number
}

export type Points = Point[];