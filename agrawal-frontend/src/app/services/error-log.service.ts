import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import  packageJson from '../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {
  batches: any[] = [];
  isRunning = false;
  constructor(
    private injector: Injector,
    private http: HttpService,
  ) {}

  handleError(error: any, type:string = "javascript"){
    let status = error.status;
    let name = error.name;
    let message = error.message;
    let http = undefined;
    try{
      error.message = JSON.parse(error.message);
      status = error.message.response.status;
      name = error.message.response.name;
      message = error.message.response.message || error.message;
      http = type == "http" ? error.message : undefined;
    }catch{}
    
    const router = this.injector.get(Router);
    const reportOject = {
        timestamp: Date.now(),
        host:location.host,
        version:packageJson.version,
        type: type,
        status,
        name,
        message,
        http,
        stack: error.stack,
        url: location.href,
        route: router.url,
        userAgent:navigator.userAgent,
    };
    this.batches.push(reportOject);
    this.doWrite();
  }

  doWrite(){
    if(this.isRunning){
      setTimeout(this.doWrite.bind(this),1000);
    }else{
      this.makeHttpRequest();
    }
  }

  makeHttpRequest(){
    if(this.batches.length){
      console.log(this.batches);
      // this.http.post("error-report",this.batches).subscribe();
    }
    this.batches = [];
  }
}
