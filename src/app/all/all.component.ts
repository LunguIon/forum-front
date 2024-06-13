import { Component, inject, OnInit } from '@angular/core';
import { postDto } from '../models/postDto.model';
import { forkJoin, map, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { CommentService } from '../service/comments.service';
import { NgFor } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicComponent } from '../topic/topic.component';
import { TopicDTO } from '../models/topicdto.model';
import { TopicService } from '../service/topic.service';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [NgbDropdownModule, TopicComponent, NgFor, ToastsContainerComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit{
  constructor(private commentService: CommentService, private topicService: TopicService){}
  router: Router = inject(Router);
  
  // Change topics from postDto to TopicDto
  topics: TopicDTO[] = [];

  ngOnInit(): void {
    this.loadTopics();

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
  loadTopics(): void{
    this.topicService.getAllTopics().subscribe((data: TopicDTO[]) => {
      this.topics = data;
    });
  }
 




}
