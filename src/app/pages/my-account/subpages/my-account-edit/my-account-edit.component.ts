import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientControllerService} from 'src/app/core/api/services';
import {CLientClass} from 'src/app/core/models/Client';
import {LoginService} from 'src/app/core/services/auth/login/login.service';
import {SwalAlerts} from 'src/app/core/modules/shared/swalAlerts/SwalAlerts';
import {TypeMessageSwal} from 'src/app/core/modules/shared/swalAlerts/TypeMessageSwal';

@Component({
    selector: 'app-my-account-edit',
    templateUrl: './my-account-edit.component.html',
    styleUrls: ['./my-account-edit.component.sass']
})
export class MyAccountEditComponent implements OnInit {

    user: CLientClass = new CLientClass();
    swal: SwalAlerts = new SwalAlerts();

    constructor(
        private loginService: LoginService,
        private service: ClientControllerService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.cargarUser();
    }

    cargarUser(): void {
        // tslint:disable-next-line: no-non-null-assertion
        this.user = this.loginService.getUser()!;
        this.user.password = "";
    }

    updateUser() {
        if (this.user.password != "") {
            this.service.updateUsingPUT1(this.user).subscribe((client) => {
                this.swal.showMessage("Correcto",
                    "Datos actualizados.",
                    TypeMessageSwal.SUCCESS,
                    1000, false);
                this.loginService.logout();
                this.router.navigate(['/login']);
            });
        } else {
            this.swal.showMessage("Error",
                "Debe ingresar su contraseña para continuar.",
                TypeMessageSwal.ERROR,
                1000, false);
        }
    }

}
