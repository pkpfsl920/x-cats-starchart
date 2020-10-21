import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post, DocID } from '../post.model';


@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})

export class ChangeComponent implements OnInit 
{
  loadedPosts: Post[] = [];

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

  onPutPost() 
  {
    console.log("HELLO THERE FROM change: onPutPost")

    console.log(this.form.value.id,
                this.form.value.firstname, 
                this.form.value.lastname,
                this.form.value.hours,
                this.form.value.fundRaisingTriangle,
                this.form.value.journalCircle, 
                this.form.value.communitySquare,
                this.form.value.preSessionPaw,
                this.form.value.extraHoursPaw,
                this.form.value.fundRaisingPaw, 
                this.form.value.journalPaw,
                this.form.value.communityPaw,
                this.form.value.projectPaw,
                this.form.value.casual, 
                this.form.value.juniorVarsity,
                this.form.value.varsity,
                this.form.value.targetVarsityHours);

    let postData: Post = 
    {
      _id: this.form.value.id,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      hours: this.form.value.hours,
      fundRaisingTriangle: this.form.value.fundRaisingTriangle,
      journalCircle: this.form.value.journalCircle,
      communitySquare: this.form.value.communitySquare,
      preSessionPaw: this.form.value.preSessionPaw,
      extraHoursPaw: this.form.value.extraHoursPaw,
      fundRaisingPaw: this.form.value.fundRaisingPaw,
      journalPaw: this.form.value.journalPaw,
      communityPaw: this.form.value.communityPaw,
      projectPaw: this.form.value.projectPaw,
      casual: this.form.value.casual,
      juniorVarsity: this.form.value.juniorVarsity,
      varsity: this.form.value.varsity,
      targetVarsityHours: this.form.value.targetVarsityHours
    }

    this.loadedPosts.push(postData);
    
    this.http
      .put('/StarChart/' + this.form.value.id, postData)
      .subscribe(responseData => {console.log(responseData);});
  }
}

