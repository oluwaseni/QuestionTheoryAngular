import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { element } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  value:any;
  sum: any;
  constructor(private fb:FormBuilder, private http: HttpClient) {
    // this.add(this.list)
   }
  // formModel?: any ={}

  readonly baseURI = "http://localhost:59269/api";
  formData?: any ={}
  list: any[];
  mark:any;
  UserDetails: any;
  UserDetail?: any ={};


 
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Matric: ['', Validators.required],
    Passwords:  this.fb.group({
    Password: ['', [Validators.required,Validators.minLength(4)]],      
    ConfirmPassword: ['', Validators.required]
    },
    {validator: this.comparePasswords}
    )
  });
 
  formMode = this.fb.group({
    Answers: [''],
    Matric:[''],
    MyQuestionsId:[''],
    UserId:['']
  });

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');

    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value!= confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({passwordMismatch:true});
      else
        confirmPswrdCtrl.setErrors(null);
    }

    

  }

  login(formData){
    console.log(formData)
    return this.http.post(this.baseURI+'/ApplicationUser/Login', formData);
   
    
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Matric: this.formModel.value.Matric,
      Password: this.formModel.value.Passwords.Password

    };

   console.log(body)

    return this.http.post(this.baseURI+'/ApplicationUser/Register', body);
  }

  
  getQuestions(){
    return this.http.get(this.baseURI+'/Questions')
    .toPromise()
    .then(res => this.list = res as any[]);
  }

  Questions(){
    return this.http.get(this.baseURI+'/Questions')
    .toPromise()
    .then(res => this.list = res as any[]);
  }

  UsersAnswers(){
    return this.http.get(this.baseURI+ '/ApplicationUser/Users')
    .toPromise()
    .then(res => this.list = res as any[]);
  }

  getMark(id){
    
    return this.http.get(this.baseURI+ `/Answers/${id}`)
    .toPromise()
    .then(res => this.list = res as any[]);
    
  }

  getMarks(id): Observable<any>
  {
    let rest = this.http.get<any>(this.baseURI+ `/Answers/${id}`)
    // console.log(rest);
    
    return rest

    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
    ;
  }
  
 add(list) {
   this.value = list;
   console.log(this.value)
   for(let j=0;j<list.length;j++){  
    this.sum+= this.value[j].ans 
    console.log(this.sum)
    }  
 }
  
  postAnswer(){
    // console.log(this.formData)
    return this.http.post(this.baseURI+'/StudentAnswers',this.formData);
  }

  
  postAnswers(){
    var body = {
      Answers: this.formMode.value.Answers,
      Matric: this.formMode.value.Matric,
      UserId: this.formMode.value.UserId,
      MyQuestionsId: this.formMode.value.MyQuestionsId

    };

   console.log(body)

    return this.http.post(this.baseURI+'/StudentAnswers', body);
  }


  
  GetQuestionDetails(id): Observable<any>
  {
    let rest = this.http.get<any>(this.baseURI+`/Questions/${id}`)
    console.log(rest)
    rest.subscribe(
      res =>{
        console.log('informa', res)
        this.UserDetail = res;
      },
      err =>{
        console.log(err);
      },
    );
    return rest
    //this.UserDetail= rest

    

    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );

  }

  postQuestions(){

    return this.http.post(this.baseURI+'/Questions',this.formData);

  }
  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
  
 getUserProfile(){
  //  var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
   return this.http.get(this.baseURI+'/UserProfile')//, {headers:tokenHeader});
 }

roleMatch(allowedRoles): boolean{
  var isMatch = false;
  var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
  var userRoles = payLoad.role;
  allowedRoles.forEach(element =>{
    if(userRoles == element){
      isMatch = true;
      return false;
    }


  });
  return isMatch;

}

getTotal() {
  let total = 0;
  for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].ans) {
          total += this.list[i].ans;
          this.mark = total;
      }
  }
  console.log(this.mark)
  return total;
}



}
