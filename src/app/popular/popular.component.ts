import { Component, inject, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { postDto } from '../models/postDto.model';
import { PostService } from '../service/post.service';
import { CommentService } from '../service/comments.service';
import { forkJoin, map, Observable } from 'rxjs';

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
  constructor(private postService: PostService, private commentService: CommentService){}
  router: Router = inject(Router);
  commentCounts: { [postId: string]: number } = {};
  posts: postDto[] = [];

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
  nrComments: number = 0;
  loadPosts(): void{
    this.postService.getAllPosts().subscribe((data: postDto[]) => {
      this.posts = data;
      this.loadCommentCounts();
    });
  }
  loadCommentCounts(): void {
    const commentCountObservables: Observable<any>[] = this.posts.map(post => 
      this.commentService.getCountCommentByPostId(post.postId).pipe(
        map(count => ({ postId: post.postId, count }))
      )
    );
    forkJoin(commentCountObservables).subscribe(results => {
      results.forEach(result => {
        this.commentCounts[result.postId] = result.count;
      });
    });
  }



}
