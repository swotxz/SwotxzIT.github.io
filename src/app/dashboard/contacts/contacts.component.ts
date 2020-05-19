import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contact/contacts.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts=[];

  constructor( private conServ:ContactsService) { 
    conServ.getAll().subscribe(res=>{this.contacts=res;})
  }

  ngOnInit() {
  }

  Message(a){
    Swal.fire({
      title: 'Message 📧 ',
     text:a
    })
  }


  remove(id){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure ?',
      text: "to remove this User Contact!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes , delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.conServ.delete(id);;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  removeAll(){    
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure ?',
      text: "to remove All Users Contact!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes , delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.conServ.deleteAll();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

}
