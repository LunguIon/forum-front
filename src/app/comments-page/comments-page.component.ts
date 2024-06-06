import { ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { NgClass, NgFor } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../service/toast.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { HeaderBootstrapComponent } from '../header-bootstrap/header-bootstrap.component';
import { AppComponent } from '../app.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-comments-page',
  standalone: true,
  imports: [PostComponent, NgClass, NgFor, CommentComponent, ToastsContainerComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.scss'
})
export class CommentsPageComponent implements OnInit {
  // Constrctor and Innit
  // -------------
  private user: User = this.appCompoent.headerComponent.user;
  constructor(private route: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef, private appCompoent: AppComponent){
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      const paramValue = params['postid'];
      if(paramValue){
        this.post.id = paramValue;
        this.changeDetectorRef.detectChanges();
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    // Take here the post and the comments of the post from the database
  }

  postComment(commentContent: string){
    if(commentContent){
      // Here you sent the comment into the database
      

      // if succesful show this
      this.ShowToastAndPostComment(commentContent);
    }
  }


  // Toast Components 
  // -------------
  toastService = inject(ToastService);
  showToast(template: TemplateRef<any>) {
    this.toastService.show({ template });
	}
  
  tempUniqueID: number = 0;
  @ViewChild('postedCommentToast') postedCommentToast!: TemplateRef<any>;
  ShowToastAndPostComment(commentContent: string) {
    this.showToast(this.postedCommentToast);
    this.tempUniqueID--;

    this.comments.unshift({
      id: this.tempUniqueID,
      valueOfLikes: 0,
      nrComments: 0,
      voteStatus: 'undefined',
      content: commentContent,
      user: this.user,
    })
  }


  // Compents' Arrays
  // -------------
  post: Post = {
    id: 0,
    user: {id: 1, username: "User 123"},
    valueOfLikes: 0,
    nrComments: 2,
    voteStatus: 'undefined',
    content: 'contet',
    imgLink: null
  }

  comments: Comment[] = [
    {
      id: this.post.id + 1,
      user: {id: 2, username: "User 1234"},
      valueOfLikes: 0,
      nrComments: 2,
      voteStatus: 'undefined',
      content: 'Comment contet',
    },
    {
      id: this.post.id+2,
      user: {id: 3, username: "User 12345"},
      valueOfLikes: 0,
      nrComments: 2,
      voteStatus: 'undefined',
      content: 'Comment contet',
    }
  ]; 
  

}
