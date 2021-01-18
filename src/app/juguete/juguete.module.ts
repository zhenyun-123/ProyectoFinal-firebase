
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugueteRoutingModule } from './juguete.routing.module';
import { JugueteComponent } from './juguete.component';
import {NgxPaginationModule} from 'ngx-pagination'
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [JugueteComponent],
  imports: [
   
    CommonModule,
    JugueteRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [],
  bootstrap: [JugueteComponent]

})
export class JugueteModule { }
