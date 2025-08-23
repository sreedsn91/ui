// angular import
import { Component, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// project import
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { MenuService } from 'src/app/services/menu/menu.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchPipePipe } from './search-pipe.pipe';
import Swal from 'sweetalert2';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { LoadingComponent } from '../../loadingPanel/loading/loading.component';
interface MenuItem {
  Id: number;
  Title: string;
  Type: string;
  Icon: string;
  Children: any[]; // Optional for submenus
}
@Component({
  selector: 'app-admin',
  imports: [RouterModule, CommonModule,LoadingComponent, BreadcrumbsComponent,FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers:[SearchPipePipe],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AdminComponent {

  @ViewChild('jsonModal') jsonModal!: ElementRef;
  jsonData: any = null;

  // Function to get JSON and open modal

   

  // Your JSON-fetching logic (can be from API too)
  getJson() {
    return {
      id: 1,
      name: 'Sample Item',
      status: 'Active',
      date: new Date()
    };
  }
  // public props
  usernName: string;
  usernRole: string;
  logo: string;
  img: string;
  searchText: string = '';
  navCollapsed;
  navCollapsedMob: boolean;
  windowWidth: number;
  showDropdown: boolean = false;
  activeMenu: string = 'Dashboard';
  navigations!: any[];
  filteredMenuItems: any[] = [];
  // constructor
  constructor(private service: MenuService, private userInfo: AuthService,private searchPipe: SearchPipePipe,private router: Router ,private sharedDataService:SharedDataService) {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }
  scrollTo(type: string): void {
  const el = document.querySelector(`[id^="${type}-"]`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
navigateToDetails(type: string, id: number) {
  const myData = { name: type, id:  id  };
      this.sharedDataService.setData(myData);
    this.router.navigate(['/reload']);

  // if(type=='plant')
  // {
  //    this.router.navigate(['/clientplant/edit'], {
  //     state: { plantData: { id: id } }
  //   });

  // }
  //  if(type=='area')
  // {
  //    this.router.navigate(['/clientarea/edit'], {
  //     state: { plantData: { id: id } }
  //   });

  // }
  //  if(type=='unit')
  // {
  //    this.router.navigate(['/clientunit/edit'], {
  //     state: { plantData: { id: id } }
  //   });

  // }
  //  if(type=='system')
  // {
  //    this.router.navigate(['/clientsystem/edit'], {
  //     state: { plantData: { id: id } }
  //   });

  // }
  //   if(type=='circuit')
  // {
  //    this.router.navigate(['/clientcircuit/edit'], {
  //     state: { plantData: { id: id } }
  //   });

  // }
  //   if(type=='equipment')
  // {
  //    this.router.navigate(['/clientequipment/edit'], {
  //     state: { plantData: { id: id } }
  //   });

  // }
}
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
  showJsonData() {
    // Simulate API call / logic
    this.jsonData = this.getJson();
 this.service.getHierarchy().subscribe((data: any) => {
      this.jsonData = data;
      debugger;
    });
    // Show Bootstrap modal
    const modal = new bootstrap.Modal(this.jsonModal.nativeElement,{
    backdrop: false,     // 🔹 No overlay
    keyboard: false      // 🔹 Optional: Esc key won't close it
  });

    modal.show();
  }
 toggle(item: any) {
    item.isExpanded = !item.isExpanded;
  }
  ngOnInit(): void {
    this.service.getMenu().subscribe((data: MenuItem) => {
      this.navigations = data[0].children;
    },
      error => {
        this.userInfo.logout();
        this.router.navigate(["login"]);
      }
    );
    this.getUser();
   // this.usernName = this.userInfo.getUserName();
    this.usernRole = this.userInfo.getUserRole();
    this.logo = this.userInfo.getLogo();
    this.img = this.userInfo.getUserImage();
    this.filteredMenuItems = this.navigations;

  }
  isMenuActive(item: any): boolean {
    return this.activeMenu === item.title || this.router.url === item.url;
  }

  setActiveMenu(item: any): void {
    this.activeMenu = item.title; // Set the clicked menu as active
  }
  async getUser(): Promise<string | null> {
   
    this.usernName = await this.userInfo.getUserName(); // Wait for user details to be set
    
    return this.usernName;
  }
  isFullScreen = false;

  viewProfile()
  {const userId = this.userInfo.getUserId();
    const myData = { name: 'userId', id: userId };
 this.sharedDataService.setData(myData); 
 
    this.router.navigate(['/profile']);
  }

toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    this.isFullScreen = true;
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    this.isFullScreen = false;
  }
}
  changePassword()
  {
    this.router.navigate(["changepasword"]);
  }
  onSearchChange() {
    if (!this.searchText.trim()) {
      this.filteredMenuItems = [];
      this.showDropdown = false;
    } else {
      this.filteredMenuItems = this.searchPipe.transform(this.navigations, this.searchText);
      this.showDropdown = this.filteredMenuItems.length > 0;
    }
  }

  hideDropdownAfterDelay() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Allow time for clicks before hiding
  }
logout(){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to log out!',
    icon: 'warning',
    width: '300px',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!'
  }).then((result) => {
    if (result.isConfirmed) {
      
      this.userInfo.logout();
      this.router.navigate(["login"]);
    }
  });
}


  navigateTo(url: string) {
    this.router.navigate([url]);
    this.searchText = '';
    this.showDropdown = false;
  }
  // public method
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  // this is for eslint rule
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
    }
  }

 
}
