import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {

  data:any=null;
  constructor(private router:Router, private activatedRoute:ActivatedRoute) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }
   

  ngOnInit() {
    
  }

}
