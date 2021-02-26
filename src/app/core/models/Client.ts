import {Client, Role} from '../api/models';

export class CLientClass implements Client {
    constructor(
        public active?: number,
        public address?: string,
        public email?: string,
        public firstName?: string,
        public idClient?: number,
        public idRol?: number,
        public lastName?: string,
        public password?: string,
        public phone?: string,
        public username?: string,
        public zip_code?: number,
        public role?: Role
    ) {}
}
