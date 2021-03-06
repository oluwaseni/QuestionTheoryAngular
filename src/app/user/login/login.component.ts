import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName:'',
    Password:''
  }

  constructor(private service: UserService, private router: Router, private toast:ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token') !=null)
    this.router.navigateByUrl('/quest/1');
  }

  onSubmit(form: NgForm){


    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/admin/home');
      },
      err =>{
        if(err.status == 400)
          this.toast.error('Incorrect Username or Password.', 'Authentication Failed.');
        else
          console.log(err);

        
      }
    )
  }

}
