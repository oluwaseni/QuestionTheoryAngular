import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

 
  info = null;
  currentId = null;
  UserDetails;
  allow:{
    id:"",
    
  }
  

  constructor(private activatedRoute: ActivatedRoute, private service: UserService, private toaster:ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.service.UsersAnswers();
    console.log(this.service.UsersAnswers())

  }

  getMarks(id){
    this.router.navigate(['/marks/'+ id]);
  }

 
    onLogout(){
      localStorage.removeItem('token');
      this.router.navigate(['/user/login']);
    }
}


