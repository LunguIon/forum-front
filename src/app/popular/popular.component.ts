import { Component, inject, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

interface Post{
  postId: number;
  username: string;
  valueOfLikes: number;
  nrComments: number;
  voteStatus: 'upvoted' | 'downvoted' | 'undefined';
  content: string;
  favorited: boolean;
  imgLink: string | null;
}
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
  router: Router = inject(Router);
  ngOnInit(): void {
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
  posts: Post[] = [
    {
      postId: 1,
      username: 'User 123',
      valueOfLikes: 300,
      nrComments: 50,
      voteStatus: 'upvoted',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: true,
      imgLink: null
    },
    {
      postId: 2,
      username: 'User 456',
      valueOfLikes: 150,
      nrComments: 200,
      voteStatus: 'downvoted',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: true,
      imgLink: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png?20060513000852'
    },
    {
      postId: 3,
      username: 'User 124',
      valueOfLikes: 10,
      nrComments: 5,
      voteStatus: 'undefined',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: false,
      imgLink: null
    },
  ];


}
