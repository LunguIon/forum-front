import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostComponent } from '../post/post.component';
import { NgClass, NgFor } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { ToastsContainerComponent } from '../toasts-container/toasts-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../service/toast.service';
import { AppComponent } from '../app.component';
import { CommentService } from '../service/comments.service';
import { SimplifiedCommentDTO } from '../models/SimplifiedCommentDTO.model';
import { GetCommentDTO } from '../models/GetCommentDTO.model';
import { UserDTO } from '../models/UserDTO.model';
import { PostService } from '../service/post.service';
import { postDto } from '../models/postDto.model';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-comments-page',
  standalone: true,
  imports: [PostComponent, NgClass, NgFor, CommentComponent, ToastsContainerComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.scss'
})
export class CommentsPageComponent implements OnInit, AfterViewInit {
  // Constrctor and Innit
  // -------------
  private user: UserDTO = this.appComponent.headerComponent.user;

  postId!: string;
  commentCounts: { [postId: string]: number } = {};
  nrComments: number = 0;

  posts: postDto[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private changeDetectorRef: ChangeDetectorRef, private appComponent: AppComponent, private commentService: CommentService, private postService: PostService){
  }

  comments: GetCommentDTO[] = [];
  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      const paramValue = params['postid'];
      if(paramValue){
        this.postId = paramValue;
        this.getPostByPostId(this.postId);
        this.getCommentsByPostId(this.postId);
        this.commentService.getCountCommentByPostId(this.postId).subscribe( nr => {
        this.nrComments = nr;
      });

      this.changeDetectorRef.detectChanges();
      }

      this.appComponent.headerComponent.user$.subscribe(user => {
        this.user = user;
      });
      
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

  };

  ngAfterViewInit(): void {
      
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


  @ViewChild('postedCommentToast') postedCommentToast!: TemplateRef<any>;
  @ViewChild('smtWrongToast') smtWrongToast!: TemplateRef<any>;
  postComment(commentContent: string): void {
    if (commentContent) {
      const email = localStorage.getItem('email');
      if (email) {
        const comment: SimplifiedCommentDTO = {
          email: email,
          postId: this.postId,  // Assign the postId
          content: commentContent
        };

        this.commentService.createComment(comment).subscribe({
          next: (response) => {
            this.ShowToastAndPostComment(commentContent);
            // console.log('Comment created successfully', response);
          },
          error: (error) => {
            this.showToast(this.smtWrongToast);
            // console.log('Error creating comment:', error);
          }
        });
      } else {
        this.showToast(this.smtWrongToast);
        // console.error('User email not found in local storage.');
      }
    }
  }

  getCommentsByPostId(postId: string): void {
    this.commentService.getCommentsByPostId(postId).subscribe({
        next: (comments) => {
            this.comments = comments;

            setTimeout(() => {
              this.route.queryParams.subscribe(params => {
                const commentIdParamValue = params['commentid'];
                if(commentIdParamValue){
                  const comment = document.getElementById("comment-" + commentIdParamValue);
                  if(comment){
                    const headerHeight = 105;
                    const commentPosition = comment.getBoundingClientRect().top + window.scrollY;
                    const offestPosition = commentPosition - headerHeight;
                    window.scrollTo(
                      {
                        top: offestPosition,
                        behavior: 'smooth'
                      }
                    )
                  }
                }
              });
            }, 100);

        },
        error: (error) => {
            console.log('Error fetching comments:', error);
        }
    });
}

  getPostByPostId(postId: string): void {
    this.postService.getPostByPostId(postId).subscribe({
      next: (post: postDto) => {
        this.posts.push(post);
      },
      error: (err) => {
        this.router.navigate(['/404']);
        console.error('Error fetching post:', err);
      }
    });
  }


  // Toast Components 
  // -------------
  toastService = inject(ToastService);
  showToast(template: TemplateRef<any>) {
    this.toastService.show({ template });
	}
  
  tempUniqueID: number = 0;
  ShowToastAndPostComment(commentContent: string) {
    this.nrComments++;
    this.showToast(this.postedCommentToast);
    this.tempUniqueID--;

    console.log("User: ", this.appComponent.headerComponent.user);
    this.comments.unshift({
      commentId: this.tempUniqueID.toString(), //Id of the last comment
      valueOfLikes: 0,
      //nrComments: 0,
      //voteStatus: 'undefined',
      content: commentContent,
      user: this.user,
      postId: this.postId,
      creationDate: '',
      updateDate: ''
    });

  }



  

}
