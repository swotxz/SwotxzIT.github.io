import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit ,OnDestroy {

  users:any[];
  Subscribe:Subscription;
  filteredProducts:any[];
  isAdminMode=true;

  constructor( private uServ:UserService) {
   this.Subscribe= uServ.getAll().subscribe(
      res=>{
        this.filteredProducts = this.users=res;
    })
   }

   ngOnInit(){

}
filter(query:string){
  if(query){
    this.filteredProducts=this.users.filter(
      p=>p.payload.val().email.toLowerCase().includes(query.toLocaleLowerCase())
    )
  }else{ 
    this.filteredProducts=this.users;
  }
}

admin(){
this.isAdminMode=true;
}

user(){
this.isAdminMode=false;
}



ngOnDestroy(){
  this.Subscribe.unsubscribe();
}

}
