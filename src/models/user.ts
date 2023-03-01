export interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: string;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        }
    };
    phone: string;
};

export interface IUserList extends IUser {
    dateCreated: any
};