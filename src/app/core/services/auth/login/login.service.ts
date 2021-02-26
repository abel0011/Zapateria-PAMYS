import {Injectable} from '@angular/core';
import {Client} from '../../../api/models/client';
import {CartService} from '../../cart/cart.service';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    nameJWT = 'jwt';
    nameCLient = 'client';
    constructor(private cartService: CartService) {}

    saveJWT(jwt: string, user: Client): void {
        if (this.getJWT()) {
            localStorage.removeItem(this.nameJWT);
            localStorage.removeItem(this.nameCLient);
            localStorage.setItem(this.nameJWT, jwt);
            localStorage.setItem(this.nameCLient, JSON.stringify(user));
        }
        localStorage.setItem(this.nameJWT, jwt);
        localStorage.setItem(this.nameCLient, JSON.stringify(user));
    }

    getJWT(): string | null {
        return localStorage.getItem(this.nameJWT);
    }
    getUser(): Client {
        return JSON.parse(localStorage.getItem(this.nameCLient)!);
    }

    isLogged(): boolean {
        return this.getJWT() ? true : false;
    }

    logout(): void {
        localStorage.removeItem(this.nameJWT);
        localStorage.removeItem(this.nameCLient);
        localStorage.removeItem("cart");
        this.cartService.initialiseCart();
    }
    saveUser(user: Client): void {
        localStorage.removeItem(this.nameCLient);
        localStorage.setItem(this.nameCLient, JSON.stringify(user));
    }
}
