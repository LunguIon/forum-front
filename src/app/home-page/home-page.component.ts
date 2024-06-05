import { Component, inject, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { Post } from '../models/post.model';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, PostComponent, NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  posts: Post[] = [];
  // OnInnit - you can add the base logic of the http requests here
  // -------------
  
  router: Router = inject(Router);
  constructor(private postService: PostService) {}

  ngOnInit(): void {
      this.loadPosts();
      
      this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }});
  }

  loadPosts(): void{
    this.postService.getAllPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }


  // Search component
  // searchText is the text from the textfield when the user clicks the search btn
  // if there is nothing is the search field you get ''
  // -------------
  searchBtnClick(searchText: string){
    // you can delete this console log
    console.log("Search: '" + searchText + "'");
  }

  // Filter components
  // if need more filters or if you need to change the filters just change the 'flters' array
  // you can easely get the currentFilterIndex and/or the currentFilter by just calling them as simple variables (index: number = currentFilterIndex;)
  // if you change the current filter you need only to update the currentFilterIndex (currentFilterIndex = index;)
  // -------------
   
  // when filters change it runs this function
   onFilterChange(){

   }

  filters: string[] = [
    'Earliner',
    'Later',
    'Most Popular',
  ]

  private _currentFilterIndex: number = 0;

  get currentFilterIndex() : number{
    return this._currentFilterIndex;
  }

  get currentFilter() : string{
    return this.filters[this._currentFilterIndex];
  }

  set currentFilterIndex(index: number){
    if (index >= 0 && index < this.filters.length) {
      this._currentFilterIndex = index;
    } else {
      throw new Error('Invavil filter index');
    }
  
    // you can delete this console log 
    console.log("Current filter: " + this.currentFilter);
  }

}
