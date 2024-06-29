export interface IUser{
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite?: string;
        city?: string;
        zipcode?: string;
        geo: {
            lat?: number;
            lng?: number
        }
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase?: string;
        bs?: string;
    }
};

export interface ILogin{
    userName:string;
    password:string;
}

export interface IToken{
    token:string;
}

