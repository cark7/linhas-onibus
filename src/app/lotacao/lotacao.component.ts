import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Onibus, Lotacao, ItinerarioHeader, Locate } from '../services/modelos'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './lotacao.component.html',
  styleUrls: ['./lotacao.component.scss']
})
export class LotacaoComponent {
  title = 'avalia-onibus';
  listLotacao: Lotacao[] = new Array
  listLotacaoOrigin: Onibus[] = new Array
  //Itinerario
  itinerarioHead: ItinerarioHeader
  listItinerario: Locate[] = new Array
  numsIters: string[] = []
  filterValue: string
  showItinerario: boolean = false
  linkIter: string = "https://www.google.com/maps/?q=" 

  //google
  isChecked: boolean = true // check map
  showMap: boolean = false;
  position = {
    lat: -30.03076057730300000,
    lng: -51.22776510938000000
  }
  label = [
    {
    color: 'blue',
    text: 'Punto 1'
    }
  ]
  center: google.maps.LatLngLiteral = {lat: 30.0318349, lng: -51.1705089}; 
  zoom = 13;

  vertices: google.maps.LatLngLiteral[];


  titleMap= 'Punto 1'
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
    this.getLisLotacao('l')
  }


  getLisLotacao(type: string){
    this.services.getlista('nc','%', type).subscribe(
      res => {
        this.listLotacao = res
        this.listLotacaoOrigin = res
        console.log('lista lotacao ', this.listLotacao)
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
        this.itinerarioHead = {
          idlinha: res.idlinha,
          nome: res.nome,
          codigo: res.codigo,
        }
        this.numsIters = Object.keys(res)
        this.numsIters.splice(this.numsIters.length -3, 3); 
        //this.listItinerario = res.splice(this.numsIters.length -3, 3)
        this.listItinerario = Object.values(res)
        this.listItinerario.splice(this.listItinerario.length-3,3)
        console.log('carlos ', this.listItinerario)
        this.listItinerario.forEach((e, index) => {
          let item: Locate
          item = {
            lat: parseFloat(e.lat.slice(0,-11)),
            lng: parseFloat(e.lng.slice(0,-11))
          } 
          this.listItinerario[index] = item
        })
        
        this.vertices = this.listItinerario;
        console.log('carlos 2', this.listItinerario)
        console.log('carlos 2 itine', this.vertices)
        /*
        this.listItinerario.forEach(e => {
          console.log(e) 
        })
        */
        this.showMap = true
        
      },
      error =>{
        console.log("error: ", error)
      }
    )
    
  }
  applyFilter(event: any,value: string, type: number) {
    if(event.keyCode == 46 || event.keyCode == 8){ // en caso de borrado reset el listado 
      this.listLotacao = this.listLotacaoOrigin
    }
    let tempList: Lotacao[] = this.listLotacao
      console.log(' filter: ', value)
      
    this.listLotacao = tempList.filter( e => {
        return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    /*
    if(type == 1){
      let tempList: Onibus[] = this.listOnibus
      console.log(' filter: ', value)
      
      this.listOnibus = tempList.filter( e => {
        return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }else {
      
    }
    */
    
  }
  resetFiler(type: number){
    this.filterValue = '';
    this.getLisLotacao('l')
  }

  
  
  formatLocate(item:Locate){
    let temLocate: Locate = {
      lat: item.lat.slice(0,-11),
      lng: item.lng.slice(0,-11)
    }
    return temLocate;
  }

  //console.log(getPersonFromJSON(personJSON));
}

