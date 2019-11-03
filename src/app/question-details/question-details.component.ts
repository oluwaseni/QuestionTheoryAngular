import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {


  
  info = null;
  currentId = null;
  UserDetails;
  id;

  constructor(private service:UserService, private toaster:ToastrService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.service.GetQuestionDetails(id)
    .subscribe(result =>{
      console.log('details:', result);
      this.info = result;
      this.id = id;
      
      this.currentId = id+1;

    });


    this.service.getUserProfile()
    .subscribe(
      res =>{
        console.log('information', res)
        this.UserDetails = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  formMode?: any ={}
  resetForm(form? : NgForm){
    if(form != null){

    
      form.resetForm();
      this.service.formData = {
        Answer:"",
        MyQuestionsId: "",
        Matric:"",
        UserId:""

      }
      }
    }

    nextQuestion(id){
      this.router.navigate(['/quest/'+ id]);
      location.reload(true);

    }

  onSubmit(form: NgForm){
    this.service.formMode
      
    this.service.postAnswers().subscribe(
      res =>{
        // if(res != null && res != undefined)
        // console.log(res);
        this.toaster.success("Answer Submitted Successfully", "Theory Based");
        // this.service.refreshList();
        this.resetForm(form);
        this.nextQuestion(this.currentId)
        window.location.replace('/quest/'+ this.currentId)
      },
      err =>
      {
        console.log(err);
      }
      
    )
    }



}
