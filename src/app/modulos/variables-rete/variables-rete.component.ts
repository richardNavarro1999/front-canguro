
import { Component, OnInit, Inject, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VariablesService } from 'src/app/services/variables.services';


@Component({
  selector: 'app-variables-rete',
  templateUrl: './variables-rete.component.html',
  styleUrls: ['./variables-rete.component.css']
})
export class VariablesReteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [ 'descripcion','desde', 'hasta', 'tarifa', 'resta', 'suma',  'opcion'];
   public variables: any;

  public valor: number;
  public fecha: string;
  public value: string;
  public tamaño: number;
  public dataSource:any;
  public uvtEdit:any;
  public id:any;

  public uvtPost = {
     rangoMin: 0,
     rangoMax: 0,
     tarifa: 0,
     descripcion: "",
     uvtSumar: 0
  };
  public baseUrl: string = "https://localhost:44386/api/";
  modalRef: BsModalRef;
  modalRefEditar: BsModalRef;
  constructor(private http: HttpClient,
    private _http: HttpClient,
    private modalService: BsModalService,
    private variablesService:VariablesService
  ) {
    this.fetchVariables();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  openModalEditar(template: TemplateRef<any>) {
    this.modalRefEditar = this.modalService.show(template);
  }


  ngOnInit() {



  }

  ngAfterViewInit() {
   }


   fetchVariables() {
    this.variablesService.getAllVariables()
    .subscribe(result => {
      this.variables = result
      this.dataSource=  new MatTableDataSource<any>(this.variables);
      this.dataSource.paginator = this.paginator;
      console.log(result)
   
    });
  }

  deleteVariables(id: string) {
    this.variablesService.deleteVariables(id)
    .subscribe(rta => {
      console.log(rta)
      this.fetchVariables();
    });
  }


  saveVariables() {
  
      this.variablesService.createVariables(this.uvtPost)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.fetchVariables();
      });
    }

  updateVariables() {
  
      this.variablesService.updateVariables(this.id,this.uvtEdit)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.fetchVariables();
      });
    }
  

  oneVariables(item){
    this.uvtEdit= item;
    this.id = item.id;
    console.log("fs",this.uvtEdit)

  }


/* 
  getVariable() {

    this.http.get<any>(this.baseUrl + 'Variable').subscribe(result => {
    
      console.log("LO  que sea", result)
    }, error => console.error(error));

  }

  PostVariables(_body): Observable<any> {
    let urlcom = this.baseUrl + 'Variables/';
    return this._http.post<any>(urlcom, _body);
  }




  Guardar() {
    this.PostVariables({
      fechaRetefuente: this.fecha,
      valorRetefuente: this.valor
    }).subscribe(res => { console.log(res) }, err => { });
    this.getVariable();
  } */
}



