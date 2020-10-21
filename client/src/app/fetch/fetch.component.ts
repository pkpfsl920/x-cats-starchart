import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

import { Post } from '../post.model';

@Component({
  selector: 'app-fetch',
  templateUrl: './fetch.component.html',
  styleUrls: ['./fetch.component.css']
})

export class FetchComponent implements OnInit 
{
  dbArray: Post[] = [];
  isFetching = false;

  form: FormGroup;

  constructor(private http: HttpClient) 
  {
    this.form = new FormGroup(
      {
        id: new FormControl(''),
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        hours: new FormControl('', [Validators.required]),
        fundRaisingTriangle: new FormControl('', [Validators.required]),
        journalCircle: new FormControl('', [Validators.required]),
        communitySquare: new FormControl('', [Validators.required]),
        preSessionPaw: new FormControl('', [Validators.required]),
        extraHoursPaw: new FormControl('', [Validators.required]),
        fundRaisingPaw: new FormControl('', [Validators.required]),
        journalPaw: new FormControl('', [Validators.required]),
        communityPaw: new FormControl('', [Validators.required]),
        projectPaw: new FormControl('', [Validators.required]),
        casual: new FormControl('', [Validators.required]),
        juniorVarsity: new FormControl('', [Validators.required]),
        varsity: new FormControl('', [Validators.required]),
        targetVarsityHours: new FormControl('', [Validators.required])
     })  
  }

  ngOnInit() 
  {
    //this.fetchPosts();
  }

  onFetchPosts() 
  {
    // Send Http request
    this.fetchPosts();
  }

  private fetchPosts() 
  {
    console.log("IN fetchPosts() ... ");

    this.isFetching = true;
    this.http
      .get('/api/StarChart', {responseType: 'json'})
      
      .subscribe(responseData => 
        {
          console.log("Inside fetchPosts()-HttpGet-Subscribe")
          console.log(responseData);

          this.isFetching = false;
           
          let stringyData = JSON.stringify(responseData);
          var myObj = JSON.parse(stringyData);
          console.log(myObj);
          console.log("myObj length =  " + myObj.data.length);
          var len = myObj.data.length;

          this.dbArray = [];
          console.log("dbArray length =  " + this.dbArray.length);
          for (let i = 0; i < len; i++)
          {
            this.dbArray.push(myObj.data[i]);
            //console.log("dbArray length =  " + this.dbArray.length)
          }
        });
  }

  onFetchOnePost() 
  {
    console.log("IN onFetchOnePost() ... ");
    console.log("IN onFetchOnePost() ... this.form.value.id  " + this.form.value.id);

    this.isFetching = true;
    this.http
      .get('/StarChart/' + this.form.value.id, {responseType: 'json'})
      
      .subscribe(responseData => 
        {
          console.log("Inside onFetchOnePost()-HttpGet-Subscribe")
          console.log(responseData);

          this.isFetching = false;
           
          let stringyData = JSON.stringify(responseData);
          var myObj = JSON.parse(stringyData);
          console.log(myObj);

          this.dbArray = [];
          this.dbArray.push(myObj.data);
          console.log("dbArray length =  " + this.dbArray.length);
          console.log(this.dbArray);
        });
  }

}
