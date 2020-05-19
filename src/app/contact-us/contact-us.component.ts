import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contact/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private conServ :ContactsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    var winH = $(window).height();
    $('.bgImage').height('100');
    
  }
  AddContact(contact:NgForm){
    this.conServ.create(contact.value);
    contact.reset();
  }

}
