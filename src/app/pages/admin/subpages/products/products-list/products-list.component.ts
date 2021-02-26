import {Product} from 'src/app/core/api/models';
import {ProductControllerService} from 'src/app/core/api/services';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.sass'],
})
export class ProductsListComponent implements OnInit, AfterViewInit {
    constructor(private service: ProductControllerService) {}
    urlProduct = environment.url_products_images;
    listProduct: Product[] = [];
    dataSource: any = null;
    displayedColumns: string[] = [
        'ID',
        'Name',
        'Vendor',
        'Sale_Price',
        'Stock',
        'Thumbnail',
        'Actions',
    ];
    ocultado = 'd-none';
    showSpinner = true;
    timeout: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.loadProductList();
    }
    //methods
    loadProductList(): void {
        setTimeout(() => {
            this.service.getAllUsingGET7().subscribe((products) => {
                this.listProduct = products;
                this.chargingTableList();
                this.ocultado = products.length === 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
    chargingTableList(): void {
        this.dataSource = new MatTableDataSource<Product>(this.listProduct);
        this.dataSource.paginator = this.paginator;
    }

    delete(product: Product): void {
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
                        .deleteUsingDELETE6(product.idProduct || 0)
                        .subscribe((e) => {
                            this.listProduct = this.listProduct.filter(
                                (cat) => cat.idProduct !== product.idProduct
                            );
                            swal.fire(
                                'Borrado!',
                                `El Product ${product.description} ha sido borrado`,
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
            this.service.getAllUsingGET7().subscribe((pro) => {
                this.listProduct = pro.filter((o) => o.vendor?.company?.match(this.name));
                if (this.listProduct.length == 0) {
                    this.listProduct = pro;
                }

                this.chargingTableList();
                this.ocultado = pro.length === 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
}
