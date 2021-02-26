import {Component, OnInit} from '@angular/core';
import {CLientClass} from '../../../../../core/models/Client';
import {ClientControllerService} from 'src/app/core/api/services';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {Client} from 'src/app/core/api/models';

@Component({
    selector: 'app-client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.sass'],
})
export class ClientDetailComponent implements OnInit {
    client: Client = {};
    titulo = 'Create Client';
    constructor(
        private service: ClientControllerService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.cargarclient();
    }
    create(): void {
        //  crea el cliente, luego le redirije
        console.log(this.client);
        this.client.idRol = 1;
        this.client.zip_code = 1;
        this.client.phone = this.client.phone?.toString();
        this.service.saveUsingPOST1(this.client).subscribe((res) => {
            this.router.navigate(['/admin/clients']);
            swal.fire(
                'Nuevo CLiente Creado',
                `Categoria ${res.firstName} ha sido registrada`,
                'success'
            );
        });
    }
    update(): void {
        //  crea el cliente, luego le redirije
        this.client.zip_code = 1;
        this.client.phone = this.client.phone?.toString();
        this.service.updateUsingPUT1(this.client).subscribe((client) => {
            this.router.navigate(['/admin/clients']);
            swal.fire(
                'Cliente Actualizado',
                `CLiente ${client.firstName} ha sido actualizado`,
                'success'
            );
        });
    }
    cargarclient(): void {
        this.activatedRoute.params.subscribe((params) => {
            const id = params.id;
            if (id) {
                this.titulo = 'Edit client';
                this.service.getByIdUsingGET1(id).subscribe((client) => {
                    client.password = "";
                    this.client = client;
                    console.log(client);
                });
            }
        });
    }
}
