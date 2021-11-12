import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public uploadImage: File;
  public imgTem:any = null;

  constructor( public modalImagenService: ModalImagenService
    ) { }

  //public closeModals: boolean = false

  ngOnInit(): void {
  }

  closeModal(){
   this.modalImagenService.ocultModal();
   this.imgTem = null
   //this.closeModals = true
  }

  changePhoto(event: any){
    const files = event.target.files;
    this.uploadImage = files[0]

    if(!this.uploadImage){return this.imgTem = null}

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(files[0])

    reader.onloadend = () => {
      this.imgTem = reader.result
    }
  }

}
