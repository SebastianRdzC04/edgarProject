import { MaterialBase } from "./material.model";


export interface QuoteCreate {
    fullName: string;
    phoneContact: string;
    title: string;
    text: string;
    address: string;
    materialsList?: string[];

}

export interface QuoteMaterialBase {
    id: string;
    quoteId: string;
    materialId: string;
    quantity: number;
    price: number;
    material: MaterialBase;
}

export interface QuoteBase {
    id: string;
    fullName: string;
    phoneContact: string;
    title: string;
    text: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    materials?: MaterialBase[];
    quoteMaterials?: QuoteMaterialBase[];
}

/*

{
    "message": "Quote created successfully",
    "data": {
        "quote": {
            "fullName": "pendejazo",
            "phoneContact": "1234567890",
            "title": "quiero otra cacacaca",
            "text": "la  verdad no quiero otra asdfasdf",
            "address": "torrddddeon",
            "createdAt": "2025-08-17T18:31:16.291+00:00",
            "updatedAt": "2025-08-17T18:31:16.291+00:00",
            "id": "b1715aa7-b998-4dd7-bfeb-b64115ab44bd",
            "materials": [
                {
                    "id": "da257171-55a8-41a3-b217-0d780061937a",
                    "name": "Casillas",
                    "description": "blocks chido rico sabroso",
                    "createdAt": "2025-08-17T17:52:07.779+00:00",
                    "updatedAt": "2025-08-17T17:52:07.779+00:00"
                },
                {
                    "id": "4d99e6db-9f26-4320-a3da-0baf35ab91b1",
                    "name": "masillas",
                    "description": "blocks chido rico sabroso",
                    "createdAt": "2025-08-17T17:53:46.751+00:00",
                    "updatedAt": "2025-08-17T17:53:46.751+00:00"
                }
            ]
        }
    }
}

*/

export interface QuoteResponse {
    message: string;
    data: {
        quote: QuoteBase;
    };
}

export interface QuoteResponseAll {
    message: string;
    data: {
        quotes: QuoteBase[];
    }
}