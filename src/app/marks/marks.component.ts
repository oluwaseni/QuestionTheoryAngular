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
   mark = 0;
  ngOnInit() {
    let id = +this.activatedRoute.snapshot.paramMap.get('id'); 

 
    this.service.getMark(id)
    console.log(this.service.getMark(id))
    console.log(this.service.getMarks(id))
    
    this.lognumber()
    // this.total()
   

    
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
