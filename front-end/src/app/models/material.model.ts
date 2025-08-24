export interface MaterialRequest {
    name: string;
    description: string;
}

export interface MaterialBase {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface MaterialResponse {
    message: string;
    data: {
        material: MaterialBase;
    };
}


export interface MaterialResponseAll {
    message: string;
    data: {
        materials: MaterialBase[];
    };
}
