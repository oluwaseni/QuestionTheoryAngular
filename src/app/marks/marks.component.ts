import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styles: []
})
export class MarksComponent implements OnInit {

  constructor(private service: UserService, private activatedRoute:ActivatedRoute, private http: HttpClient, private toaster : ToastrService ) { }
  
   info = null;
   len = null;
   no: number[] = [1,2,3];
   mark: any;
   private sum=0;  
  private value; 
  ngOnInit() {
    let id = +this.activatedRoute.snapshot.paramMap.get('id'); 

 
    this.service.getMark(id)
    console.log(this.service.getMark(id))
    this.mark = this.service.getMark(id);
    console.log(this.mark)
    this.addW(this.mark)
    // console.log(this.service.getMarks(id))
 

    
  }

  addW(data){  
    this.value=data[0]  
    for(let j=0;j<data.length;j++){  
         this.sum =this.sum + this.value[j].ans
         } 
         console.log(data.length) 
  }  

  total(){
    this.len.forEach((marks) =>{
      console.log("answer=: " + marks.ans)
    })
  }
  
  lognumber(){
    this.no.forEach((nos) => {
      // foreach statement
      this.mark = this.mark + nos
      console.log("number=: "+ nos);
    })
    console.log("Total=: "+ this.mark);
  }

}
