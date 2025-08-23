// angular import
import { Component, OnDestroy, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-left',
  imports: [SharedModule, NavSearchComponent,RouterLink],
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent  {
 
}
