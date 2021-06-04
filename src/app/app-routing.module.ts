import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LotacaoComponent } from './lotacao/lotacao.component';
import { OnibusComponent } from './onibus/onibus.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      
    { path: '', redirectTo: 'onibus', pathMatch: 'full' },
    { path: 'onibus',         component: OnibusComponent },
    { path: 'lotacao',         component: LotacaoComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
