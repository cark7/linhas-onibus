import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';
import { Onibus, Lotacao, Itinerario } from './services/modelos'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'avalia-onibus';
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  listLotacao: Lotacao[] = new Array
  listOnibus: Onibus[] = new Array
  listItinerario: Itinerario[] = new Array
  numsIters: string[] = []
  filterValue: string
  showItinerario: boolean = false
  linkIter: string = "https://www.google.com/maps/" 

  //google
  showMap: boolean = false;
  position = {
    lat: -30.03076057730300000,
    lng: -51.22776510938000000
  }
  label = {
    color: 'blue',
    text: 'Punto 1'
  }
  apiLoaded: Observable<boolean>;
  constructor(
    private services: ServicesService,
    private httpClient: HttpClient
  ){
    this.apiLoaded = httpClient.jsonp('https://maps.google.com/maps/api/js?sensor=false', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
  
  ngOnInit(){
    this.getListOnibus('o')
  }

  

  tab(num:number){
    this.showItinerario = !this.showItinerario
    if(num == 2 && this.listLotacao.length == 0){
      this.getListOnibus('l')
    }
  }

  getListOnibus(type: string){
    this.services.getlista('nc','%', type).subscribe(
      res => {
        if (type == 'o') {
          this.listOnibus = res
        }
        if (type == 'l') {
          this.listLotacao = res
        }
      },
      error =>{
        console.log("error: ", error)
      }
    )
  }
  getListItinerario(type: string, id: number){
    this.services.getItinerario(type, id).subscribe(
      res => {
        console.log('Resp it: ',res);
        this.listItinerario = res
        this.numsIters = Object.keys(this.listItinerario)
        this.numsIters.splice(this.numsIters.length -3, 3); 
        console.log('carlos ', this.numsIters)
        this.showMap = true
      },
      error =>{
        console.log("error: ", error)
      }
    )
    
  }
  applyFilter(value: string, type: number) {
    if(type == 1){
      let tempList: Onibus[] = this.listOnibus
      console.log(' filter: ', value)
      
      this.listOnibus = tempList.filter( e => {
        return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }else {
      let tempList: Lotacao[] = this.listLotacao
      console.log(' filter: ', value)
      
      this.listLotacao = tempList.filter( e => {
        return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }
    
    
  }
  resetFiler(type: number){
    this.filterValue = '';
    (type == 1)? this.getListOnibus('o'): this.getListOnibus('l')
  }

}

