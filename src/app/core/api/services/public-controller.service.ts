/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {map as __map, filter as __filter} from 'rxjs/operators';

import {Client} from '../models/client';
import {Resource} from '../models/resource';
import {Product} from '../models/product';

/**
 * Public Controller
 */
@Injectable({
    providedIn: 'root',
})
class PublicControllerService extends __BaseService {
    static readonly saveClientUsingPOSTPath = '/api/public/client';
    static readonly showPhotoClientUsingGETPath = '/api/public/clients/photos/{nombreFoto}';
    static readonly getAllProductsUsingGETPath = '/api/public/product';
    static readonly showOtherPhotoProductUsingGETPath = '/api/public/product/photos/others/{nombreFoto}';
    static readonly showPhotoProductUsingGETPath = '/api/public/product/photos/{nombreFoto}';
    static readonly getByNameUsingGET1Path = '/api/public/product/search/{name}';
    static readonly getProductBySlugUsingGETPath = '/api/public/product/slug/{slug}';
    static readonly showPhotoVoucherUsingGETPath = '/api/public/vouchers/photos/{nombreFoto}';

    constructor(
        config: __Configuration,
        http: HttpClient
    ) {
        super(config, http);
    }

    /**
     * Save a Client
     * @param client client
     * @return OK
     */
    saveClientUsingPOSTResponse(client: Client): __Observable<__StrictHttpResponse<Client>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = client;
        let req = new HttpRequest<any>(
            'POST',
            this.rootUrl + `/api/public/client`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Client>;
            })
        );
    }
    /**
     * Save a Client
     * @param client client
     * @return OK
     */
    saveClientUsingPOST(client: Client): __Observable<Client> {
        return this.saveClientUsingPOSTResponse(client).pipe(
            __map(_r => _r.body as Client)
        );
    }

    /**
     * showPhotoClient
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showPhotoClientUsingGETResponse(nombreFoto: string): __Observable<__StrictHttpResponse<Resource>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/clients/photos/${encodeURIComponent(nombreFoto)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Resource>;
            })
        );
    }
    /**
     * showPhotoClient
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showPhotoClientUsingGET(nombreFoto: string): __Observable<Resource> {
        return this.showPhotoClientUsingGETResponse(nombreFoto).pipe(
            __map(_r => _r.body as Resource)
        );
    }

    /**
     * Get all products
     * @return OK
     */
    getAllProductsUsingGETResponse(): __Observable<__StrictHttpResponse<Array<Product>>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/product`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Array<Product>>;
            })
        );
    }
    /**
     * Get all products
     * @return OK
     */
    getAllProductsUsingGET(): __Observable<Array<Product>> {
        return this.getAllProductsUsingGETResponse().pipe(
            __map(_r => _r.body as Array<Product>)
        );
    }

    /**
     * showOtherPhotoProduct
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showOtherPhotoProductUsingGETResponse(nombreFoto: string): __Observable<__StrictHttpResponse<Resource>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/product/photos/others/${encodeURIComponent(nombreFoto)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Resource>;
            })
        );
    }
    /**
     * showOtherPhotoProduct
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showOtherPhotoProductUsingGET(nombreFoto: string): __Observable<Resource> {
        return this.showOtherPhotoProductUsingGETResponse(nombreFoto).pipe(
            __map(_r => _r.body as Resource)
        );
    }

    /**
     * showPhotoProduct
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showPhotoProductUsingGETResponse(nombreFoto: string): __Observable<__StrictHttpResponse<Resource>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/product/photos/${encodeURIComponent(nombreFoto)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Resource>;
            })
        );
    }
    /**
     * showPhotoProduct
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showPhotoProductUsingGET(nombreFoto: string): __Observable<Resource> {
        return this.showPhotoProductUsingGETResponse(nombreFoto).pipe(
            __map(_r => _r.body as Resource)
        );
    }

    /**
     * Search a product with your name Company
     * @param name Product Name
     * @return OK
     */
    getByNameUsingGET1Response(name: string): __Observable<__StrictHttpResponse<Array<Product>>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/product/search/${encodeURIComponent(name)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Array<Product>>;
            })
        );
    }
    /**
     * Search a product with your name Company
     * @param name Product Name
     * @return OK
     */
    getByNameUsingGET1(name: string): __Observable<Array<Product>> {
        return this.getByNameUsingGET1Response(name).pipe(
            __map(_r => _r.body as Array<Product>)
        );
    }

    /**
     * Search a product with a slug
     * @param slug The slug of the product
     * @return OK
     */
    getProductBySlugUsingGETResponse(slug: string): __Observable<__StrictHttpResponse<Product>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/product/slug/${encodeURIComponent(slug)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Product>;
            })
        );
    }
    /**
     * Search a product with a slug
     * @param slug The slug of the product
     * @return OK
     */
    getProductBySlugUsingGET(slug: string): __Observable<Product> {
        return this.getProductBySlugUsingGETResponse(slug).pipe(
            __map(_r => _r.body as Product)
        );
    }

    /**
     * showPhotoVoucher
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showPhotoVoucherUsingGETResponse(nombreFoto: string): __Observable<__StrictHttpResponse<Resource>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/public/vouchers/photos/${encodeURIComponent(nombreFoto)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Resource>;
            })
        );
    }
    /**
     * showPhotoVoucher
     * @param nombreFoto nombreFoto
     * @return OK
     */
    showPhotoVoucherUsingGET(nombreFoto: string): __Observable<Resource> {
        return this.showPhotoVoucherUsingGETResponse(nombreFoto).pipe(
            __map(_r => _r.body as Resource)
        );
    }
}

module PublicControllerService {
}

export {PublicControllerService}
