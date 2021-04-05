import {AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConceptoService } from 'src/app/services/concepto.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { NovedadService } from 'src/app/services/novedades.service';

@Component({
  selector: 'app-novedades-rete',
  templateUrl: './novedades-rete.component.html',
  styleUrls: ['./novedades-rete.component.css']
})
export class NovedadesReteComponent implements  AfterViewInit {

    public value:string;
    public novedades:any;
    public empleados:string;
    public conceptos:string;
    public mostrar:boolean=false;
    public mostrar3:boolean=false;
    public conceptoSelect:any;
    public mostrar2:boolean=false;
    public empleadoSelect:any;
    public sueldo:number = 0;
    public cantidad:number=1;
    public valorU:number = 0;
    public valorTotal:number;
    public fecha: any;
    public seleOP: number=1;
    public nombre: string;
    public porcentaje: number;
    public operacion: string;
    public ruta: any;
    public cedula: number;
    public noveEdit: any;

    empleados2 = [
      {nombre:1005523663,id:2},
      {nombre:1205523663,id:2},
      {nombre:9052236635,id:2},
      {nombre:3002232663,id:2},
      {nombre:1001256663,id:2},
      ]
    
   

    displayedColumns: string[] = ['empleado', 'concepto', 'cantidad', 'valorU','valorT','opcion'];
   
    dataSource ;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    modalRef: BsModalRef;
    modalRefEditar: BsModalRef;
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

    openModalEditar(template: TemplateRef<any>) {
      this.modalRefEditar = this.modalService.show(template);
    }
    constructor(

      private novedadesService: NovedadService,
      private modalService: BsModalService,
      private empleadoService: EmpleadosService,
      private conceptoService: ConceptoService,
      private changeDetectorRefs: ChangeDetectorRef,
      private router: Router,
      private _router:ActivatedRoute
    ){
      
    }
    ngAfterViewInit() {
      this.getAllNovedades();
      this.getAllConceptos();
      this.getAllEmpleados();
      this.ruta = this._router.snapshot.paramMap.get('id');
      console.log(this.ruta)
     }





  getAllNovedades(){
    this.novedadesService.getAllNovedad().subscribe(result => {
       this.novedades = result;
        this.dataSource = new MatTableDataSource<any>(this.novedades);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
       console.log("Resultado", result)
    }, error => console.error(error));

  }
  getAllEmpleados(){
       this.empleadoService.getAllEmpleado().subscribe(result => {
       this.empleados= result;
       console.log("Empleados", result)
    }, error => console.error(error));

  }
  getAllConceptos(){
       this.conceptoService.getAllConceptos().subscribe(result => {
        this.conceptos= result; 
       console.log("Conceptos", result)
    }, error => console.error(error));

  }

  getOneNovedad(item){
   this.noveEdit = item;
  }

  calculos(){
      if(this.conceptoSelect.porcentaje> 0){
        this.valorU = (this.conceptoSelect.porcentaje/100)* this.sueldo ;
        this.valorU = Math.round(this.valorU)
        this.porcentaje= this.conceptoSelect.porcentaje;
        this.operacion= this.conceptoSelect.operacion;
        this.valorTotal =this.valorU* this.cantidad;
         this.mostrar= true;
         this.mostrar3=false;
        }else{
          this.mostrar=false;
          this.mostrar3= true;
          this.valorTotal= this.valorU;
          this.porcentaje= 0;

          
        
        }
      
    }
  calculos2(){
    if( this.sueldo>0){
      this.calculos()
    }
         this.sueldo = this.empleadoSelect.salario;
         this.nombre = this.empleadoSelect.nombre;
         this.cedula = this.empleadoSelect.cedula;
         this.mostrar2= true;
        
         
      
    }

    guardar(){

      let body =  {
          "cantidad": this.cantidad,
          "valorTotal": this.valorTotal,
          "valorUnitario": this.valorU,
          "idEmpleado": this.empleadoSelect.id,
          "idConcepto": this.conceptoSelect.id,
          "fechaNovedad": this.fecha
      }
      this.novedadesService.pushNovedad(body).subscribe(result => {
       console.log("resul", result);
       this.getAllNovedades()
    }, error => console.error(error));
       }
    Actualizar(){

      let body =  {
          "id": this.noveEdit.id,
          "cantidad": this.cantidad,
          "valorTotal": this.valorTotal,
          "valorUnitario": this.valorU,
          "idEmpleado": this.empleadoSelect.id,
          "idConcepto": this.conceptoSelect.id,
          "fechaNovedad": this.noveEdit.fechaNovedad
      }
      this.novedadesService.updateNovedad(this.noveEdit.id,body).subscribe(result => {
       console.log("resul", result);
       this.getAllNovedades()
    }, error => console.error(error));
       }

    eliminar(item){

    
      this.novedadesService.deleteNovedad(item.id).subscribe(result => {
       console.log("resul", result);
       this.getAllNovedades();
    }, error => console.error(error));
        }

    
  }
  