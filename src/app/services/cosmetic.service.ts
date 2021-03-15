import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
@Injectable()
export class CosmeticService {

  constructor(private _http: HttpClient) { }
  
  private extractData(res:any){
    let body = res;
    return body || {} || [];
  }

  public getNewCosmetics() : Observable<any>{
    let language = navigator.language.substring(0, 2);
    return this._http.get(environment.endpoint + `v2/cosmetics/br/new/?language=${language}`)
    .pipe(map(this.extractData));
  }
}
