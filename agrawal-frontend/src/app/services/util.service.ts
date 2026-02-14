import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private http: HttpService
  ) { }

  openSnackBar(message: string, action?: string) {
    action = action || "Close";
    if (message) {
      this._snackBar.open(message, action, {
        duration: 13000
      })
    }
  }





  decycle(obj:any, stack:any[] = []):any {
    if (!obj || typeof obj !== 'object')
      return obj;

    if (stack.includes(obj))
      return null;

    let s = stack.concat([obj]);

    return Array.isArray(obj)
      ? obj.map((x:any) => this.decycle(x, s))
      : Object.fromEntries(
        Object.entries(obj)
          .map(([k, v]) => [k, this.decycle(v, s)]));
  }

  sortByArray(inputArr:any[], orderedArr:string[], valueFn = (a: any) => a){
    return inputArr.sort((a, b) => orderedArr.indexOf(valueFn(a)) - orderedArr.indexOf(valueFn(b)));
  }

  onlyUnique(inputArr:any[], valueFn?: (a: any) => any) {
    inputArr.filter((value, index, array)=>array.indexOf(value) === index)
  }

  uniqueArray(arr:any[], key:string){
    return [...new Map(arr.map(item =>[item[key], item])).values()]
  }

  blobtoPdf(data: Blob, title: string, mime:string) {
    const fileStream = new Blob([data], {type: mime});
    const fileURL = URL.createObjectURL(fileStream);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = fileURL;
    a.target = '_blank'
    a.click();
  }

  validateMinMax(value:string|null|undefined, min:number, max?:number){
    let minValidate = value ? value.length >= min : false;
    if(!minValidate) return false;
    if(!max) return true;
    let maxValidate = value ? value.length <= max : false;
    return maxValidate;
  }

  checkLen(event: any, length: number) {
    const val = event.target.value.replace(/ /g, '');
    if(event.keyCode != 8 && event.keyCode != 46 && val.length >= length) {
      event.preventDefault();
    }
  }

  datePipe(date:Date, format?:string){
    format = format || 'MM/dd/yyyy';
    return this.datepipe.transform(new Date(date), 'MM/dd/yyyy');
  }

  

  urlToBlob(url:string, data:any, title:string){
    return this.http.get(url,data, {responseType: 'blob'}).pipe(
      map((x:any)=>{
        if(x) {
          this.blobtoDownload(x, title);
          return true;
        }
        else {
          this.openSnackBar('Something went wrong with Download');
          return false;
        }
      }),
      catchError((error) => {
        this.openSnackBar('Something went wrong with Download');
        return of(false);
      })
      
    );
  }

  blobtoDownload(data: Blob, title: string) {
    title = this.hasExtension(title) ? title : title+'.pdf'; 
    const fileStream = new Blob([data], {type: 'application/octet-stream'});
    const anchorTag = document.createElement('a');
    document.body.appendChild(anchorTag);
    const fileURL = URL.createObjectURL(fileStream);
    anchorTag.href = fileURL;
    anchorTag.download = title;
    anchorTag.target = '_blank';
    anchorTag.click();
  }

 

  hasExtension(filename:string) {
    return /\.[^\/\\]+$/.test(filename);
  }
}
