import { Routes } from "@angular/router";
import { CimlAddComponent } from "./ciml-add/ciml-add.component";
import { CimlEditComponent } from "./ciml-edit/ciml-edit.component";
import { CimlListComponent } from "./ciml-list/ciml-list.component";
import { CimlComponent } from "./ciml/ciml.component";
export const CIML_ROUTES: Routes = [
  {
    path: '',
    component: CimlComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: CimlListComponent },
      { path: 'add', component: CimlAddComponent },
      { path: 'edit', component: CimlEditComponent },
      { path: 'ciml', component: CimlComponent },
    ]
  }
];
