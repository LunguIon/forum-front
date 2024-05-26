import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';

type VoteStatus = 'upvoted' | 'downvoted' | 'undefined';

interface Post {
  postId: number;
  username: string;
  upvotes: number;
  nrComments: number;
  voteStatus: VoteStatus;
  content: string;
  favorited: boolean;
  hasImage: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, PostComponent, NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  // Posts array
  posts: Post[] = [
    {
      postId: 1,
      username: 'User 123',
      upvotes: 300,
      nrComments: 50,
      voteStatus: 'upvoted',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: true,
      hasImage: false
    },
    {
      postId: 2,
      username: 'User 456',
      upvotes: 150,
      nrComments: 200,
      voteStatus: 'downvoted',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: true,
      hasImage: true
    },
    {
      postId: 3,
      username: 'User 124',
      upvotes: 10,
      nrComments: 5,
      voteStatus: 'undefined',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: false,
      hasImage: false
    },
  ];


}
