import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reload',
  imports: [],
  templateUrl: './reload.component.html',
  styleUrl: './reload.component.scss'
})
export class ReloadComponent {
  id: any = 0;
  type: string = '';
  receivedData: any;
  constructor(private sharedDataService: SharedDataService,private router: Router)
  {
     this.receivedData = this.sharedDataService.getData();
     debugger;
    this.id = this.receivedData.id;











































































































































































    
     this.type = this.receivedData.name;
    alert(this.type)

  if(this.type=='plant')
  {
     this.router.navigate(['/clientplant/edit'], {
      state: { plantData: { id: this.id } }
    });

  }
   if(this.type=='area')
  {
     this.router.navigate(['/clientarea/edit'], {
      state: { plantData: { id: this.id } }
    });

  }
   if(this.type=='unit')
  {
     this.router.navigate(['/clientunit/edit'], {
      state: { plantData: { id: this.id } }
    });

  }
   if(this.type=='system')
  {
     this.router.navigate(['/clientsystem/edit'], {
      state: { plantData: { id: this.id } }
    });

  }
    if(this.type=='circuit')
  {
     this.router.navigate(['/clientcircuit/edit'], {
      state: { plantData: { id: this.id } }
    });

  }
    if(this.type=='equipment')
  {
     this.router.navigate(['/clientequipment/edit'], {
      state: { plantData: { id: this.id } }
    });

  }
  }
}
