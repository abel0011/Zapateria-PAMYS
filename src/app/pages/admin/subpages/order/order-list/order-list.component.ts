import { HtmlAstPath } from '@angular/compiler';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChange,
  ValueSansProvider,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client, Order, OrderStatus, Product } from 'src/app/core/api/models';
import {
  ClientControllerService,
  OrderControllerService,
  OrderStatusControllerService,
} from 'src/app/core/api/services';
// import * as html2pdf from 'html2pdf.js/types/index';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/core/services/auth/login/login.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  order: Order = {};
  users: Client[] = [];
  orderStatuses: OrderStatus[] = [];
  showModalDetail = false;
  selectSearcher: FormControl = new FormControl();
  selectedStatus = '';
  dateCreated = '';
  editDate = false;
  editStatus = false;
  isPrinting = false;
  loading = true;
  productImagesUrl: string = environment.url_products_images;

  isFirstLoad = true;
  filterFunction: any;
  user: Client = {};
  statusSelected = '';

  value = '';
  constructor(
    private orderService: OrderControllerService,
    private orderStatusesService: OrderStatusControllerService,
    private usersService: ClientControllerService,
    private clientService: LoginService
  ) {
    this.user = clientService.getUser();
  }

  ngOnInit(): void {
    if (this.isFirstLoad) {
      setTimeout(() => {
        this.orderService.getAllUsingGET3().subscribe((orders) => {
          this.orders = orders;
          this.orderStatusesService.getAllUsingGET4().subscribe((statuses) => {
            this.orderStatuses = statuses;
          });
          this.loading = false;
        });
      }, 300);
    }
    this.isFirstLoad = false;
  }

  getImageUrl(product: Product): string {
    return this.productImagesUrl + product.thumbnailUrl;
  }

  toggleEditDate(): void {
    this.editDate = !this.editDate;
  }

  toggleEditStatus(): void {
    this.editStatus = !this.editStatus;
    const newStatusID = this.orderStatuses.find(
      (e) => e.status === this.selectedStatus
    )?.idOrderStatus;
    this.order.idOrderStatus = newStatusID;
  }

  togglePrintState(): void {
    this.editStatus = false;
    this.editDate = false;
    this.isPrinting = !this.isPrinting;
  }

  getUserImageURL(order: Order): string {
    // tslint:disable-next-line: no-non-null-assertion
    return environment.url_client_images + order.client!.profilePictureUrl;
  }

  showDetail(order: Order): void {
    this.order = order;
    // tslint:disable-next-line: no-non-null-assertion
    this.selectedStatus = order.orderStatus?.status!;
    // tslint:disable-next-line: no-non-null-assertion
    this.dateCreated = order.dateCreated!;
    this.editDate = false;
    this.editStatus = false;
    this.showModalDetail = true;
  }

  closeDetail(): void {
    this.showModalDetail = false;
  }

  getSubTotalRow(price: number, quantity: number): number {
    return price * quantity;
  }

  getSubTotal(): number {
    // tslint:disable-next-line: no-non-null-assertion
    return this.order.products!.reduce(
      // tslint:disable-next-line: no-non-null-assertion
      (i, j) => i + j.product!.price! * j.quantity!,
      0
    );
  }

  getIgv(): number {
    return this.getSubTotal() * 0.18;
  }

  getTotal(): number {
    return this.getSubTotal() * 1.18;
  }

  formatDate(): string {
    const res = this.dateCreated.replace('/', '-') + 'T12:00:00Z';
    // console.log(res);
    return res;
  }

  updateOrder(): void {
    const newStatusID = this.orderStatuses.find(
      (e) => e.status === this.selectedStatus
    )?.idOrderStatus;
    this.order.idOrderStatus = newStatusID;
    this.order.igv = this.getIgv();
    this.order.total = this.getTotal();
    this.order.subtotal = this.getSubTotal();
    this.order.dateCreated =
      this.dateCreated === this.order.dateCreated
        ? this.order.dateCreated + 'Z'
        : this.formatDate();
    this.order.orderStatus = this.orderStatuses.find(
      (e) => e.idOrderStatus === newStatusID
    );
    console.log(this.order);
    this.orderService.updateUsingPUT3(this.order).subscribe(() => {
      this.closeDetail();
      this.ngOnInit();
    });
  }

  printOrder(): void {
    this.togglePrintState();
    const data = document.getElementById('orderDetail');
    // tslint:disable-next-line: no-non-null-assertion
    html2canvas(data!)
      .then((canvas) => {
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(`Pedido-${this.order.idOrder}.pdf`); // Generated PDF
      })
      .then(() => {
        this.togglePrintState();
      });
  }

  changedate(date: string): void {
    this.loading = true;
    this.filterFunction = setTimeout(() => {
      this.orderService.getAllUsingGET3().subscribe((orders) => {
        this.orders = orders.filter((e) => e.dateCreated?.match(date));
        this.loading = false;
        this.ngOnInit();
      });
    }, 300);
  }

  filterByStatus(estado: string): void {
    this.loading = true;
    this.filterFunction = setTimeout(() => {
      this.orderService.getAllUsingGET3().subscribe((orders) => {
        if (estado === 'Todos') {
          this.orders = orders;
        } else {
          this.orders = orders.filter((e) =>
            // tslint:disable-next-line: no-non-null-assertion
            e.orderStatus?.status!.match(estado)
          );
        }

        this.loading = false;
        this.ngOnInit();
      });
    }, 300);
  }
}
