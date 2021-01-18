import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JugueteServiceService } from './service/juguete.service.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-juguete',
  templateUrl: './juguete.component.html',
  styleUrls: ['./juguete.component.css']
})

export class JugueteComponent implements OnInit {
closeResult = '';
  productoForm: FormGroup;
  idFirebaseActualizar: string;
  actualizar:boolean;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private jugueteServiceService: JugueteServiceService
  ) { }
  config: any;
  collection = { count: 0, data: [] }

  ngOnInit(): void {
    this.idFirebaseActualizar = "";
    this.actualizar = false;
    this.config = {
      itemsPerPage: 5,
      currenPage: 1,
      totalIteams: this.collection.data.length
    };



    this.productoForm = this.fb.group({

     
     
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
    });
    //cargando todos los productos de firebase
    this.jugueteServiceService.getProductos().subscribe(resp => {
      this.collection.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          nombre: e.payload.doc.data().nombre,
          precio: e.payload.doc.data().precio,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error);
      }
    );
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  eliminar(item: any): void {
    this.jugueteServiceService.deleteProducto(item.idFirebase);
  }

  guardarProducto(): void {

    this.jugueteServiceService.createProducto(this.productoForm.value).then(resp => {
      this.productoForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.error(error)
    })
  }
    actualizarProducto(){
      if (!isNullOrUndefined(this.idFirebaseActualizar)) {
        this.jugueteServiceService.updateProducto(this.idFirebaseActualizar,this.productoForm.value).then(resp => {
          this.productoForm.reset();
          this.modalService.dismissAll();
        }).catch(error => {
          console.error(error);
        });
      }

}

openEditar(content, item: any) {
    this.productoForm.setValue({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
    });
    this.idFirebaseActualizar = item.idFirebase;
    this.actualizar =true;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  open(content) {
    this.actualizar= false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.productoForm.reset();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


