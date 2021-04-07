import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NovedadService {
    private va_arrayEndPoints: any;
    constructor(
        private _http: HttpClient,) {
    }

    public baseUrl: string = "http://192.168.160.189:9095/api/";
  //  public baseUrl: string= "https://localhost:44386/api/"



    getAllNovedad(): Observable<any> {
        let url = this.baseUrl + 'Novedad';
        return this._http.get( url)
    }
    getFiltrarNovedad(f1,f2): Observable<any> {
        let url = this.baseUrl + 'Novedad/'+f1+'/'+f2;
        return this._http.get( url)
    }

    pushNovedad(info): Observable<any> {
        let url = this.baseUrl + 'Novedad';
        let header = new HttpHeaders()
        header.append("Content-Type", "application/json")
        return this._http.post(url, info, {
            headers: header
        })
    }
    deleteNovedad(info): Observable<any> {
        let url = this.baseUrl + 'Novedad/'+info;
        let header = new HttpHeaders()
        header.append("Content-Type", "application/json")
        return this._http.delete(url, {
            headers: header
        })
    }



    updateNovedad(id, info): Observable<any> {
        let url =  this.baseUrl + 'Novedad/'+id;
        let header = new HttpHeaders()
        header.append("Content-Type", "application/json")
        return this._http.put(url, info, {
            headers: header
        })
    }



}
