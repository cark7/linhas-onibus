import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';
import { Onibus, Lotacao, Itinerario } from './services/modelos'
import { query } from '@angular/animations';

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
  linkIter: string = "https://www.google.com/maps/" //?q=

  constructor(
    private services: ServicesService
  ){}
  
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
      },
      error =>{
        console.log("error: ", error)
      }
    )
    
  }
  applyFilter(value: string) {
    let tempList: Onibus[] = this.listOnibus
    console.log(' filter: ', value)
    
    this.listOnibus = tempList.filter( e => {
      return e.nome.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
    
  }
  resetFiler(){
    this.filterValue = ''
    this.getListOnibus('o')
  }

}

