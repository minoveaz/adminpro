import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateUserPhoto(
    file: File,
    type: 'users'|'doctors'|'hospitals',
    id: any,
  ){
    try {
      const url = `${base_url}/upload/${type}/${id}`

      //formData hace parte de JS
      const formData = new FormData();
      formData.append('image',file);

      const resp = await fetch(url,{
        method:'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json()
      if (data.ok){
        return data.fileName
      }else{
        return false
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}