import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService, private http: HttpClient, private toastr: ToastrService, private router:Router) { }

  formModel?: any ={}
  ngOnInit() {
    if(localStorage.getItem('token') !=null)
    this.router.navigateByUrl('/home');
    this.service.formModel.reset();

  }

  
  resetForm(form? : NgForm){
    if(form != null){

    
      form.resetForm();
      this.service.formData = {
        UserName:"",
        Matric: "",
        Password: ""
      }
      }
    }

    onSubmits(form: NgForm){
      
      this.service.register().subscribe(
        res =>{
          // if(res != null && res != undefined)
          console.log(res);
          this.resetForm(form);
          this.toastr.success("Student Registered Successfully", "Student Registration");
          // this.service.refreshList();
          
          // this.router.navigateByUrl('home/admin/mortgage');
        },
        err =>
        {
          console.log(err);
        }
        
      )
      }
  

  onSubmit(){
    this.service.register().subscribe(
      (res: any) =>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('"Student Registered Successfully", "Student Registration"')
        }
        else{
          res.errors.forEach(element =>{
            switch(element.code){
              case 'DuplicateUsername':
                //Username is already taken
                this.toastr.error('Username already taken', 'Registration Failed');
                break;

              default:
                //Registration has failed
                this.toastr.error(element.description, 'Registration Failed');
                break;
            }
          });;
          
        }
      },
      err =>{
        this.toastr.error(err.description, 'Registration Failed');
        console.log(err);
      }
    );
  }

}
