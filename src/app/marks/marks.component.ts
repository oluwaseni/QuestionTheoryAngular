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
   items: any[];
  //  private sum=0;  
  private value; 
  ngOnInit() {
    let id = +this.activatedRoute.snapshot.paramMap.get('id'); 

 
    this.service.getMark(id)
    console.log(this.service.getMark(id))
    console.log(this.service.list);
    if(this.service.list != null){
      this.getTotal()
    }
    
    
    
  }

  // addW(data){  
  //   this.value=data[0]  
  //   for(let j=0;j<data.length;j++){  
  //        this.sum =this.sum + this.value[j].ans
  //        } 
  //        console.log(this.sum) 
  // }  

  getTotal() {
    let total = 0;
    for (var i = 0; i < this.service.list.length; i++) {
        if (this.service.list[i].ans) {
            total += this.service.list[i].ans;
            this.mark = total;
        }
    }
    console.log(this.mark)
    return total;
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
