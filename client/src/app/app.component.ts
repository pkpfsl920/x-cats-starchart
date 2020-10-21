import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post, DocID } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit 
{
  constructor(private http: HttpClient)  {}

  ngOnInit() 
  {
    //this.fetchPosts();
  }
}
