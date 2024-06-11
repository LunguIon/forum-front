import { Component, inject, OnInit } from '@angular/core';
import { postDto } from '../models/postDto.model';
import { forkJoin, map, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { CommentService } from '../service/comments.service';
import { NgFor } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicComponent } from '../topic/topic.component';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [NgbDropdownModule, TopicComponent, NgFor],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit{
  constructor(private postService: PostService, private commentService: CommentService){}
  router: Router = inject(Router);
  
  // Change topics from postDto to TopicDto
  topics: postDto[] = [];

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

  // Topic Array components
  // -------------
  loadPosts(): void{
    this.postService.getAllPosts().subscribe((data: postDto[]) => {
      this.topics = data;
    });
  }
 




}
