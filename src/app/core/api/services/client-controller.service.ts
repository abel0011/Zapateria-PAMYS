/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {BaseService as __BaseService} from '../base-service';
import {ApiConfiguration as __Configuration} from '../api-configuration';
import {StrictHttpResponse as __StrictHttpResponse} from '../strict-http-response';
import {Observable as __Observable} from 'rxjs';
import {map as __map, filter as __filter} from 'rxjs/operators';

import {Client} from '../models/client';

/**
 * Client Controller
 */
@Injectable({
    providedIn: 'root',
})
class ClientControllerService extends __BaseService {
    static readonly saveUsingPOST1Path = '/api/client';
    static readonly updateUsingPUT1Path = '/api/client';
    static readonly getAllUsingGET1Path = '/api/client/all';
    static readonly uploadPhotoClientUsingPOSTPath = '/api/client/photos/upload';
    static readonly getByIdUsingGET1Path = '/api/client/{id}';
    static readonly deleteUsingDELETE1Path = '/api/client/{id}';

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
    saveUsingPOST1Response(client: Client): __Observable<__StrictHttpResponse<Client>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = client;
        let req = new HttpRequest<any>(
            'POST',
            this.rootUrl + `/api/client`,
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
    saveUsingPOST1(client: Client): __Observable<Client> {
        return this.saveUsingPOST1Response(client).pipe(
            __map(_r => _r.body as Client)
        );
    }

    /**
     * Update a Client
     * @param client client
     * @return OK
     */
    updateUsingPUT1Response(client: Client): __Observable<__StrictHttpResponse<Client>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = client;
        let req = new HttpRequest<any>(
            'PUT',
            this.rootUrl + `/api/client`,
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
     * Update a Client
     * @param client client
     * @return OK
     */
    updateUsingPUT1(client: Client): __Observable<Client> {
        return this.updateUsingPUT1Response(client).pipe(
            __map(_r => _r.body as Client)
        );
    }

    /**
     * Get all clients
     * @return OK
     */
    getAllUsingGET1Response(): __Observable<__StrictHttpResponse<Array<Client>>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/client/all`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<Array<Client>>;
            })
        );
    }
    /**
     * Get all clients
     * @return OK
     */
    getAllUsingGET1(): __Observable<Array<Client>> {
        return this.getAllUsingGET1Response().pipe(
            __map(_r => _r.body as Array<Client>)
        );
    }

    /**
     * uploadPhotoClient
     * @param params The `ClientControllerService.UploadPhotoClientUsingPOSTParams` containing the following parameters:
     *
     * - `imgFile`: imgFile
     *
     * - `idClient`: idClient
     *
     * @return OK
     */
    uploadPhotoClientUsingPOSTResponse(params: ClientControllerService.UploadPhotoClientUsingPOSTParams): __Observable<__StrictHttpResponse<Client>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = params.imgFile;
        if (params.idClient != null) __params = __params.set('idClient', params.idClient.toString());
        let req = new HttpRequest<any>(
            'POST',
            this.rootUrl + `/api/client/photos/upload`,
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
     * uploadPhotoClient
     * @param params The `ClientControllerService.UploadPhotoClientUsingPOSTParams` containing the following parameters:
     *
     * - `imgFile`: imgFile
     *
     * - `idClient`: idClient
     *
     * @return OK
     */
    uploadPhotoClientUsingPOST(params: ClientControllerService.UploadPhotoClientUsingPOSTParams): __Observable<Client> {
        return this.uploadPhotoClientUsingPOSTResponse(params).pipe(
            __map(_r => _r.body as Client)
        );
    }

    /**
     * Search a client with a ID
     * @param id The id of the client
     * @return OK
     */
    getByIdUsingGET1Response(id: number): __Observable<__StrictHttpResponse<Client>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'GET',
            this.rootUrl + `/api/client/${encodeURIComponent(id)}`,
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
     * Search a client with a ID
     * @param id The id of the client
     * @return OK
     */
    getByIdUsingGET1(id: number): __Observable<Client> {
        return this.getByIdUsingGET1Response(id).pipe(
            __map(_r => _r.body as Client)
        );
    }

    /**
     * Delete a Client by ID
     * @param id The id of the client
     * @return OK
     */
    deleteUsingDELETE1Response(id: number): __Observable<__StrictHttpResponse<{}>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            'DELETE',
            this.rootUrl + `/api/client/${encodeURIComponent(id)}`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            __filter(_r => _r instanceof HttpResponse),
            __map((_r) => {
                return _r as __StrictHttpResponse<{}>;
            })
        );
    }
    /**
     * Delete a Client by ID
     * @param id The id of the client
     * @return OK
     */
    deleteUsingDELETE1(id: number): __Observable<{}> {
        return this.deleteUsingDELETE1Response(id).pipe(
            __map(_r => _r.body as {})
        );
    }

    newSaveClient(jwt: string, client: Client) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${jwt}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(client);

        fetch("http://localhost:5000/api/client", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

}

module ClientControllerService {

    /**
     * Parameters for uploadPhotoClientUsingPOST
     */
    export interface UploadPhotoClientUsingPOSTParams {

        /**
         * imgFile
         */
        imgFile: string;

        /**
         * idClient
         */
        idClient: number;
    }
}

export {ClientControllerService}
