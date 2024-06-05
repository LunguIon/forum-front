import { ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { NgClass, NgFor } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../service/toast.service';

interface Post{
  postId: number;
  username: string;
  valueOfLikes: number;
  nrComments: number;
  voteStatus: 'upvoted' | 'downvoted' | 'undefined';
  content: string;
  imgLink: string | null;
}

interface PostComments{
  commentId: number;
  username: string;
  valueOfLikes: number
  nrComments: number;
  voteStatus: 'upvoted' | 'downvoted' | 'undefined';
  content: string
}

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
  constructor(private route: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef){
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      const paramValue = params['postid'];
      if(paramValue){
        this.post.postId = paramValue;
          // TEMPORARY --------- DELETE THIS, I used it for testing.
          this.post.username = this.post.postId.toString();
          // -------------------
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
      this.ShowToastAndReloadPage();
    }
  }


  // Toast Components 
  // -------------
  toastService = inject(ToastService);
  
  showToast(template: TemplateRef<any>) {
    this.toastService.show({ template });
	}
  
  @ViewChild('postedCommentToast') postedCommentToast!: TemplateRef<any>;
  ShowToastAndReloadPage() {
    this.showToast(this.postedCommentToast);
    setTimeout( () => {
      window.location.reload();
    }, 1000);
  }


  // Compents' Arrays
  // -------------
  post: Post = {
    postId: 0,
    username: '',
    valueOfLikes: 0,
    nrComments: 2,
    voteStatus: 'undefined',
    content: 'contet',
    imgLink: null
  }

  comments: PostComments[] = [
    {
    commentId: this.post.postId+1,
    username: 'a',
    valueOfLikes: 0,
    nrComments: 2,
    voteStatus: 'undefined',
    content: 'Comment contet',
    },
    {
      commentId: this.post.postId+2,
      username: 'a',
      valueOfLikes: 0,
      nrComments: 2,
      voteStatus: 'undefined',
      content: 'Comment contet',
    }
  ]; 
  

}
