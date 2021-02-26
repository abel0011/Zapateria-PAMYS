import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {LoginService} from '../../../../core/services/auth/login/login.service';
import {Client} from '../../../../core/api/models/client';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {ClientUploadService} from '../../services/client-upload.service';
import {HttpEventType} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'my-account-container',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.sass'],
})
export class MyAccountComponent implements OnInit {
    user: Client = {};
    urlImageClient = environment.url_client_images;
    photoSelected!: File;
    @ViewChild('inputFileElement', {static: false})
    inputFileElement!: ElementRef;
    constructor(
        private router: Router,
        private loginService: LoginService,
        private uploadService: ClientUploadService
    ) {}

    ngOnInit(): void {
        this.cargarUser();
        console.log(this.user.profilePictureUrl);
    }
    seleccionarImagen(): void {
        this.inputFileElement.nativeElement.click();
        // console.log(this.inputFileElement.nativeElement.files[0]);
    }
    seleccionarFoto(event: any): void {
        this.photoSelected = event.target.files[0];
        this.uploadService
            .subirFoto(this.photoSelected, this.user.idClient || 0)
            // tslint:disable-next-line: no-shadowed-variable
            .subscribe((event) => {
                // cuando me una respuesta
                if (event.type === HttpEventType.Response) {
                    const response: any = event.body;
                    // obtengo la respuesta y lo guardo en un prop y en el localstorage
                    this.user = response as Client;
                    console.log(this.user);
                    this.loginService.saveUser(this.user);
                    // mostrar mensaje de actualizacion de imagen
                    Swal.fire({
                        title: 'Foto de perfil actualizada!',
                        text: 'Que bonita foto.',
                        imageUrl: `${this.urlImageClient}${this.user.profilePictureUrl}`,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'this.user.profilePictureUrl',
                    });
                }
            });
    }

    cerrarSesion(): void {
        this.loginService.logout();
        this.router.navigate(['/home']);
    }
    cargarUser(): void {
        // tslint:disable-next-line: no-non-null-assertion
        this.user = this.loginService.getUser()!;
    }
}
