import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../post.model';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent 
{
  title = 'Student Hours';
  dbArray: Post[] = [];
  hoursData: number[] = [];
  studentNameData: string[] = [];


  constructor (private httpService: HttpClient) 
  { }

  // ADD CHART OPTIONS. 
  chartOptions = 
  {
    // THIS WILL MAKE THE CHART RESPONSIVE.
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  // SET CHART COLOR.
  colors = 
  [
    { 
      //backgroundColor: 'rgba(77,83,96,0.2)'
      backgroundColor: 'rgba(97,83,159,0.7)'
    }
  ]
    
  ngOnInit () 
  {
    this.httpService
      .get('/api/StarChart', {responseType: 'json'})
      
      .subscribe(responseData => 
        {
          console.log("Inside Chart-HttpGet-Subscribe")
          let stringyData = JSON.stringify(responseData);
          var myObj = JSON.parse(stringyData);
          console.log(myObj);
          var len = myObj.data.length;

          this.dbArray = [];
          for (let i = 0; i < len; i++)
          {
            this.dbArray.push(myObj.data[i]);
          }

          let count = 0;
          for (let dbData of this.dbArray )
          {
            this.hoursData[count] = dbData.hours;
            this.studentNameData[count] = dbData.firstname;
            count +=1;
          }
        });
  }

  // CHART CLICK EVENT.
  onChartClick(event) 
  {
    console.log(event);
  }
}