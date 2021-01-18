import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JugueteComponent } from './juguete.component';

const routes: Routes = [{ path: '', component: JugueteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugueteRoutingModule { }
