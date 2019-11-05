import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addQuestion(){
    this.router.navigateByUrl('/admin/home');
  }

  checkMarks(){
    this.router.navigateByUrl('/admin/questions');
  }

}
