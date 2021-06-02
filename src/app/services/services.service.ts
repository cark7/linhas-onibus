import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Onibus, Lotacao, Itinerario } from './modelos'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(
    private http: HttpClient,
  ) { }
  
  // Headers
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }
  url = "http://www.poatransporte.com.br/php/facades/process.php?";
  tempUrl = "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%&t=o";
  
  getlista(a: string,p:string, t: string){
    let response;
    try {
      response = this.http.get<any>(`${this.url}`+'a='+a+'&p='+p+'&t='+t, this.httpOptions);
    } catch (error) {
      console.log("error:" + error)
    }
    return response;
  }
  getItinerario(a: string,p:number){
    let response;
    try {
      response = this.http.get<any>(`${this.url}`+'a='+a+'&p='+p, this.httpOptions);
    } catch (error) {
      console.log("error:" + error)
    }
    return response;
  }
}
