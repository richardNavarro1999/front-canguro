import { Component, OnInit, Inject, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';






@Component({
  selector: 'app-uvt-rete',
  templateUrl: './uvt-rete.component.html',
  styleUrls: ['./uvt-rete.component.css']
})
export class UvtReteComponent implements OnInit {

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
   valortributario: any=[];
  
    displayedColumns: string[] = ['id', 'valor', 'fecha','opcion'];
    
    dataSource ;
  
   public years = [
    {year: 2018},
    {year: 2019},
    {year: 2020},
    {year: 2021},
    {year: 2022}
   
   ]
  
    public valorTri: any;
  
    public valor: number;
    public fecha: string;
    public tamaño: number;
    public value : string;
    //public baseUrl: string = "http://192.168.160.189:9095/api/";
    public baseUrl: string= "https://localhost:44386/api/"

    modalRef: BsModalRef;
    modalRefEditar: BsModalRef;
  
    constructor(
      private _http: HttpClient,
      private modalService: BsModalService
    ) {
      
      
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
  
  
    openModalEditar(template: TemplateRef<any>) {
      this.modalRefEditar = this.modalService.show(template);
    }
  
    ngOnInit() {
      this.getUvt();
      
    }
  
    getUvt() {
    
      this._http.get<ValorTributario[]>(this.baseUrl+'ValorTributario').subscribe(result => {
        this.valortributario = result;
        this.tamaño = this.valortributario.length;
        this.dataSource=  new MatTableDataSource<any>(this.valortributario);
        this.dataSource.paginator = this.paginator;
         console.log("LO  que sea", result)
      }, error => console.error(error));
  
  }
  
    PostUvt(_body): Observable<any> {
      let urlcom = this.baseUrl +'ValorTributario/';
      const headers = new HttpHeaders();
  
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Accept', 'application/json');
     
      return this._http.post<any>(urlcom, _body);
    }
  
  
    getOne(item) {
      console.log("d",item)
      this.valorTri = item;
  
    }
  
    PutUvt(_body,id): Observable<any> {
      let urlcom = this.baseUrl + 'ValorTributario/'+id;
      return this._http.put<any>(urlcom, _body);
    }
  
    DeleteUvt(id): Observable<any> {
      let urlcom = this.baseUrl + 'ValorTributario/'+id;
      return this._http.delete<any>(urlcom);

    }
  
    
  
    Guardar()
    {
      this.PostUvt({
        fechaRetefuente: this.fecha,
        valorRetefuente: this.valor
      }).subscribe(res => { console.log(res)
        this.getUvt();
      }, err => { });
      this.getUvt();
    }
  
    Actualizar()
    {
      this.PutUvt({
        fechaRetefuente: this.valorTri.fechaRetefuente,
        valorRetefuente: this.valorTri.valorRetefuente
      }, this.valorTri.idRetefuente).subscribe(res => { 
        this.getUvt();
        console.log(res) }, err => { });
     
    }
  
  
    Eliminar(id)
    {
      this.DeleteUvt(id).subscribe(res => { 
        console.log(res) ;
        this.getUvt();
      }, err => { });
     
     
  
    }

  
  
  }


  
  
  
  
  
  interface ValorTributario {
    idRetefuente: string;
    fechaRetefuente: string;
    valorRetefuente: number;
  }
  
  