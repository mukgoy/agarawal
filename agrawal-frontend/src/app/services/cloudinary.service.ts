import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
const YOUR_CLOUD_NAME = 'dlsafak15'; 
const YOUR_UPLOAD_PRESET = 'ml_default'; 

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  uploadUrl = 'https://api.cloudinary.com/v1_1/'+YOUR_CLOUD_NAME+'/image/upload';
  
  constructor(private http: HttpService) { }

  uploadImage(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', YOUR_UPLOAD_PRESET);
    return this.http.post(this.uploadUrl, formData)
    
  }
}
