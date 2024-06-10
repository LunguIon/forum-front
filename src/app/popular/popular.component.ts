import { Component, inject, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { postDto } from '../models/postDto.model';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [NgbDropdownModule, PostComponent, NgFor],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent implements OnInit{
  // OnInnit - you can add the base logic of the http requests here
  // -------------
  constructor(private postService: PostService){}
  router: Router = inject(Router);
  ngOnInit(): void {
    this.loadPosts();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
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

  // Posts Array components
  // -------------
  posts: postDto[] = [];
  loadPosts(): void{
    this.postService.getAllPosts().subscribe((data: postDto[]) => {
      this.posts = data;
    });
  }


}
