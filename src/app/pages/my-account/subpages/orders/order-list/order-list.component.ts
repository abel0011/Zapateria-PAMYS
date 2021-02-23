import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client, Order } from 'src/app/core/api/models';
import {
  OrderControllerService,
  OrderStatusControllerService,
} from 'src/app/core/api/services';
import { LoginService } from 'src/app/core/services/auth/login/login.service';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../../../../../core/api/models/order-status';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private orderService: OrderControllerService,
    private orderStatusService: OrderStatusControllerService,
    private clientService: LoginService,
    private router: Router
  ) {
    this.user = this.clientService.getUser();
  }
  loading = true;
  orders: Order[] = [];
  orderStatuses: OrderStatus[] = [];
  user: Client = {};
  imagesUrl: string = environment.url_client_images;
  statusSelected = '';
  filterFunction: any;

  datenow: any;

  ngOnInit(): void {
    if (this.orders.length === 0) {
      setTimeout(() => {
        this.orderService.getAllUsingGET3().subscribe((orders) => {
          this.orders = orders.filter((o) => o.idClient === this.user.idClient);
          this.loading = false;
        });

        this.orderStatusService.getAllUsingGET4().subscribe((status) => {
          this.orderStatuses = status;
        });
      }, 300);
    }
  }

  getUserImageURL(): string {
    return this.imagesUrl + this.user.profilePictureUrl;
  }

  uploadVoucher(): void {
    this.router.navigate(['/my-account/voucher']);
  }
  changedate(date: string): void {
    date += 'T00:00:00';
    console.log(date);
    this.orderService.getAllUsingGET3().subscribe((orders) => {
      console.log(orders);
      this.orders = orders
        .filter((o) => o.idClient === this.user.idClient)
        .filter((e) => e.dateCreated === date);

      console.log(this.orders);

      if (this.orders.length === 0) {
        // tslint:disable-next-line: no-shadowed-variable
        this.orderService.getAllUsingGET3().subscribe((orders) => {
          this.orders = orders.filter((e) => e.idClient === this.user.idClient);
        });
      }
    });
  }
  filterByStatus(estado: string): void {
    this.loading = true;
    this.filterFunction = setTimeout(() => {
      this.orderService.getAllUsingGET3().subscribe((orders) => {
        if (estado === 'Todos') {
          this.orders = orders.filter((o) => o.idClient === this.user.idClient);
        } else {
          this.orders = orders.filter(
            (o) =>
              o.idClient === this.user.idClient &&
              // tslint:disable-next-line: no-non-null-assertion
              o.orderStatus?.status! === estado
          );
        }

        this.loading = false;
      });
    }, 300);
  }
  // filterByStatus() {
  //   clearTimeout(this.filterFunction);
  //   this.loading = true;
  //   this.filterFunction = setTimeout(() => {
  //     this.orderService.getAllUsingGET3().subscribe((orders) => {
  //       this.ngOnInit();
  //       this.orders = orders.filter(
  //         (o) =>
  //           o.idClient == this.user.idClient &&
  //           o.orderStatus?.status! == this.statusSelected
  //       );
  //       this.loading = false;
  //     });
  //   }, 300);
  // }
}
