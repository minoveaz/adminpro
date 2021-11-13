import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public uploadImage: File;
  public imgTem:any = null;

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService
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

  uploadImagen(){

    const id = this.modalImagenService.id;
    const type = this.modalImagenService.type;

    this.fileUploadService
      .updateUserPhoto( this.uploadImage, type, id)
      .then( img => {
        Swal.fire({title:'Photo Updated', text:'The phot has been saved in your profile', icon:'success', timer: 2500});
        this.modalImagenService.newImg.emit(img);
        this.closeModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'Could not upload the image', 'error')
      });
    
  }

}
