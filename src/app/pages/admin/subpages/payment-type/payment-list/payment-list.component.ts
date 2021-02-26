import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {PaymentTypeControllerService} from 'src/app/core/api/services';
import {PaymentType} from '../../../../../core/api/models/payment-type';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.sass'],
})
export class PaymentListComponent implements OnInit, AfterViewInit {
    constructor(private service: PaymentTypeControllerService) {}

    listPaymentTypes: PaymentType[] = [];
    dataSource: any = null;
    displayedColumns: string[] = ['ID', 'Type', 'Actions'];
    ocultado = 'd-none';
    showSpinner = true;

    tipo: PaymentType[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.loadPaymentTypesList();
    }
    //methods
    loadPaymentTypesList(): void {
        setTimeout(() => {
            this.service.getAllUsingGET6().subscribe((paymentTypes) => {
                this.listPaymentTypes = paymentTypes;
                this.tipo = this.listPaymentTypes;
                this.chargingTableList();
                this.ocultado = paymentTypes.length == 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
    chargingTableList(): void {
        this.dataSource = new MatTableDataSource<PaymentType>(
            this.listPaymentTypes
        );
        this.dataSource.paginator = this.paginator;
    }

    delete(paymentType: PaymentType): void {
        swal
            .fire({
                title: '¿Esta seguro de borrarlo?',
                text: 'Este borrado es irrevertible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero borrarlo!',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    this.service
                        .deleteUsingDELETE5(paymentType.idPaymentType || 0)
                        .subscribe((e) => {
                            this.listPaymentTypes = this.listPaymentTypes.filter(
                                (cat) => cat.idPaymentType !== paymentType.idPaymentType
                            );
                            swal.fire(
                                'Borrado!',
                                `ElPaymentType ${paymentType.type} ha sido borrado`,
                                'success'
                            );
                            this.chargingTableList();
                        });
                }
            });
    }
    getstatus(estado: string) {
        this.showSpinner = true;
        if (estado == "Todos") {
            this.loadPaymentTypesList();
            this.chargingTableList();
        }
        this.service.getAllUsingGET6().subscribe((d) => {
            this.listPaymentTypes = d.filter((e) => e.type == estado);
            this.chargingTableList();

            this.ocultado = d.length == 0 ? 'd-none' : '';
            this.showSpinner = false;
        });
    }
}
