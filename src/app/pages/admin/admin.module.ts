import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavComponent} from './components/nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModule} from 'src/app/core/modules/material/material.module';
import {CategoryListComponent} from './subpages/category/category-list/category-list.component';
import {CategoryDetailComponent} from './subpages/category/category-detail/category-detail.component';
import {SharedModule} from 'src/app/core/modules/shared/shared.module';
import {CirculoIconCardComponent} from '../../core/modules/shared/components/circulo-icon-card/circulo-icon-card.component';
import {HeaderCustomComponent} from './components/header-custom/header-custom.component';
import {AdminRoutesModule} from './admin-routes.module';
import {VendorListComponent} from './subpages/vendor/vendor-list/vendor-list.component';
import {VendorDetailComponent} from './subpages/vendor/vendor-detail/vendor-detail.component';
import {ClientListComponent} from './subpages/client/client-list/client-list.component';
import {ClientDetailComponent} from './subpages/client/client-detail/client-detail.component';
import {PaymentListComponent} from './subpages/payment-type/payment-list/payment-list.component';
import {DocumentListComponent} from './subpages/document-type/document-list/document-list.component';
import {DocumentDetailComponent} from './subpages/document-type/document-detail/document-detail.component';
import {OrderListComponent} from './subpages/order/order-list/order-list.component';
import {OrderStatusListComponent} from './subpages/order-status/status-list/order-status-list.component';
import {OrderStatusDetailComponent} from './subpages/order-status/status-detail/order-status-detail.component';
import {PaymentDetailComponent} from './subpages/payment-type/payment-detail/payment-detail.component'
import {ProductsListComponent} from './subpages/products/products-list/products-list.component'
import {ProductsDetailComponent} from './subpages/products/products-detail/products-detail.component';
import {ProducstImageListComponent} from './subpages/products-image/producst-image-list/producst-image-list.component';
import {ProducstImageDetailComponent} from './subpages/products-image/producst-image-detail/producst-image-detail.component';
import {DashboardComponent} from './subpages/dashboard/dashboard.component';

@NgModule({
    declarations: [
        NavComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        HeaderCustomComponent,
        VendorListComponent,
        VendorDetailComponent,
        ClientListComponent,
        ClientDetailComponent,
        PaymentListComponent,
        PaymentDetailComponent,
        OrderListComponent,
        OrderStatusListComponent,
        OrderStatusDetailComponent,
        DocumentListComponent,
        DocumentDetailComponent,
        ProductsListComponent,
        ProductsDetailComponent,
        ProducstImageListComponent,
        ProducstImageDetailComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        AdminRoutesModule,
        ReactiveFormsModule,
        MaterialModule,
        LayoutModule,
        SharedModule,
        FormsModule,
    ],
})
export class AdminModule {}
