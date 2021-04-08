import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConceptoService {
    private va_arrayEndPoints: any;
    constructor(
        private _http: HttpClient,) {
    }

      public baseUrl: string = "http://192.168.160.189:9095/api/";
    //public baseUrl: string= "https://localhost:44386/api/"


    getAllConceptos(): Observable<any> {
        let url = this.baseUrl + 'Concepto';
        return this._http.get( url)
    }

    getConcepto(id: string) {
        return this._http.get<any>(`${this.baseUrl}Concepto/${id}`);
      }
/* 
    pushAssetsType(info): Observable<any> {
        let url = '' + 'api/v1/assets_type';
        let header = new HttpHeaders()
        header.append("Content-Type", "application/json")
        return this._http.put(url, info, {
            headers: header
        }).map(res => res.json())
    }



    updateTypeAssets(id, info): Observable<any> {
        let url = '' + `api/v1/assets_type?id=${id}`;
        let header = new HttpHeaders()
        header.append("Content-Type", "application/json")
        return this._http.post(url, info, {
            headers: header
        }).map(res => res.json())
    }
 */



}
