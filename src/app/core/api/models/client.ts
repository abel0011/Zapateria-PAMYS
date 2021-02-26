/* tslint:disable */
import {Role} from './role';
export interface Client {
    active?: number;
    address?: string;
    email?: string;
    firstName?: string;
    idClient?: number;
    idRol?: number;
    lastName?: string;
    password?: string;
    phone?: string;
    profilePictureUrl?: string;
    role?: Role;
    username?: string;
    zip_code?: number;
}
