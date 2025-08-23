import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../loading.service';
@Component({
  selector: 'app-loading',
  imports:[CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(public loadingService: LoadingService) {}

}
