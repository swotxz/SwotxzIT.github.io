import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { appUsers } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  signErrorMessage: string = '';
  constructor(private authSer: AuthService) { }

  ngOnInit() {
  }

  addAdmin(form){
    let data: appUsers = form.value;
    this.authSer.addAdmin(data).then().catch(
      error => {
        this.signErrorMessage = error.message;
      }
    );
  }

}
