import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrderStatus} from 'src/app/core/api/models';
import {OrderStatusControllerService} from 'src/app/core/api/services';
import swal from 'sweetalert2';
@Component({
    selector: 'app-order-list',
    templateUrl: './order-status-list.component.html',
    styleUrls: ['./order-status-list.component.sass'],
})
export class OrderStatusListComponent implements OnInit {
    constructor(private service: OrderStatusControllerService) {}

    listOrderStatus: OrderStatus[] = [];
    dataSource: any = null;
    displayedColumns: string[] = ['idOrderStatus', 'status', 'Actions'];
    ocultado = 'd-none';
    showSpinner = true;

    estado: OrderStatus[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.loadOrderStatuses();
    }
    //methods
    loadOrderStatuses(): void {
        setTimeout(() => {
            this.service.getAllUsingGET4().subscribe((orderStatus) => {
                this.listOrderStatus = orderStatus;
                this.estado = this.listOrderStatus;
                this.chargingTableList();
                this.ocultado = orderStatus.length == 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
    chargingTableList(): void {
        this.dataSource = new MatTableDataSource<OrderStatus>(this.listOrderStatus);
        this.dataSource.paginator = this.paginator;
    }

    delete(orderStatus: OrderStatus): void {
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
                        .deleteUsingDELETE4(orderStatus.idOrderStatus || 0)
                        .subscribe((e) => {
                            this.listOrderStatus = this.listOrderStatus.filter(
                                (cat) => cat.idOrderStatus !== orderStatus.idOrderStatus
                            );
                            swal.fire(
                                'Borrado!',
                                `El order ${orderStatus.status} ha sido borrado`,
                                'success'
                            );
                            this.chargingTableList();
                        });
                }
            });
    }

    getstatus(estado: string) {
        this.showSpinner = true;
        setTimeout(() => {
            if (estado == "Todos") {
                this.loadOrderStatuses();
                this.chargingTableList();
            }
            this.service.getAllUsingGET4().subscribe((d) => {
                this.listOrderStatus = d.filter((e) => e.status == estado);
                this.chargingTableList();

                this.ocultado = d.length == 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300)
    }
}
