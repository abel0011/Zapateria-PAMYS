import {HttpEvent, HttpRequest, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ClientUploadService {
    urlEndPoint = `${environment.apiURL}/api/client/photos/upload`;
    constructor(private http: HttpClient) {}
    // subir foto del cliente
    subirFoto(archivo: File, idCli: number): Observable<HttpEvent<{}>> {
        const formData = new FormData();
        formData.append('imgFile', archivo);
        console.log(archivo);
        formData.append('idClient', idCli!.toString());

        const req = new HttpRequest('POST', `${this.urlEndPoint}`, formData, {
            reportProgress: true,
        });
        return this.http.request(req);
    }
}
