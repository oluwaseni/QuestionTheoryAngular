import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

 
  // info = null;
  // currentId = null;
  

  constructor(private service: UserService, private toaster: ToastrService, private router: Router) { }

  ngOnInit() {
    
    this.service.Questions();
    console.log( this.service.Questions());
  
  }

  
  formData?: any ={}



  resetForm(form? : NgForm){
    if(form != null){

    
      form.resetForm();
      this.service.formData = {
        question:"",
        expected: ""
      }
      }
    }


    onSubmit(form: NgForm){
      
    this.service.postQuestions().subscribe(
      res =>{
        // if(res != null && res != undefined)
        console.log(res);
        this.toaster.success("Question Uploaded Successfully", "Add Question");
        this.service.Questions();
        this.resetForm(form);
        // this.router.navigateByUrl('home/admin/mortgage');
      },
      err =>
      {
        console.log(err);
      }
      
    )
    }

    onLogout(){
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
    }
}

