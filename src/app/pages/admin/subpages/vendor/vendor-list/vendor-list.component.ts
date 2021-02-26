import {Component, OnInit, ViewChild} from '@angular/core';
import {Vendor} from 'src/app/core/api/models';
import {VendorControllerService} from 'src/app/core/api/services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';

@Component({
    selector: 'app-vendor-list',
    templateUrl: './vendor-list.component.html',
    styleUrls: ['./vendor-list.component.sass'],
})
export class VendorListComponent implements OnInit {
    constructor(private service: VendorControllerService) {}

    listVendors: Vendor[] = [];
    dataSource: any = null;
    displayedColumns: string[] = ['ID', 'Company', 'Description', 'Actions'];
    ocultado = 'd-none';
    showSpinner = true;
    timeout: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.loadVendorList();
    }
    //methods
    loadVendorList(): void {
        setTimeout(() => {
            this.service.getAllUsingGET9().subscribe((vendors) => {
                this.listVendors = vendors;
                this.chargingTableList();
                this.ocultado = vendors.length == 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
    chargingTableList(): void {
        this.dataSource = new MatTableDataSource<Vendor>(this.listVendors);
        this.dataSource.paginator = this.paginator;
    }

    delete(vendor: Vendor): void {
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
                        .deleteUsingDELETE8(vendor.idVendor || 0)
                        .subscribe((e) => {
                            this.listVendors = this.listVendors.filter(
                                (cat) => cat.idVendor !== vendor.idVendor
                            );
                            swal.fire(
                                'Borrado!',
                                `El Vendor ${vendor.company} ha sido borrado`,
                                'success'
                            );
                            this.chargingTableList();
                        });
                }
            });
    }
    name: string = '';
    filterByName() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.service.getAllUsingGET9().subscribe((v) => {
                this.listVendors = v.filter((o) => o.company?.match(this.name));
                if (this.listVendors.length == 0) {
                    this.listVendors = v;
                }

                this.chargingTableList();
                this.ocultado = v.length === 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
}
