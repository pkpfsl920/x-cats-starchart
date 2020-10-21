import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent implements OnInit 
{
  form: FormGroup;

  constructor(private http: HttpClient) 
  {
    this.form = new FormGroup(
      {
         id: new FormControl(''),
         firstname: new FormControl('', [Validators.required]),
         lastname: new FormControl('', [Validators.required]),
         teamname: new FormControl('', [Validators.required])
      })   
  }

  ngOnInit() 
  {
    //this.fetchPosts();
  }

  onDeletePost() 
  {
    console.log(this.form.value.id);
    console.log("HELLO THERE FROM onDELETEPOST")
    _id: String = this.form.value.id;

    // Send Http request
    //    example: .delete('/api/StarChart/5f7e5a1d7fed2262981674c9')
    this.http.delete('/StarChart/' + this.form.value.id)
    //this.http.delete('/api/StarChart/:_id')
             .subscribe(responseData => {console.log(responseData);});
  }

  onClearPosts() 
  {
    // Send Http request
  }
}
