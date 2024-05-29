import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
import { NgFor } from '@angular/common';


interface Post {
  postId: number;
  username: string;
  upvotes: number;
  nrComments: number;
  voteStatus: 'upvoted' | 'downvoted' | 'undefined';
  content: string;
  favorited: boolean;
  imgLink: string | null;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, PostComponent, NgFor],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  // Filter components
  // if need more filters or if you need to change the filters just change the 'flters' array
  // you can easely get the currentFilterIndex and/or the currentFilter by just calling them as simple variables (index: number = currentFilterIndex;)
  // if you change the current filter you need only to update the currentFilterIndex (currentFilterIndex = index;)
  // -------------
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

    console.log("Current filter: " + this.currentFilter);
  }

  // Search components
  // searchText is the text from the textfield when the user clicks the search btn
  // if there is nothing is the search field you get ''
  // -------------
  searchBtnClick(searchText: string){
    console.log("Search: '" + searchText + "'");
  }

  // Posts Array components
  // -------------
  posts: Post[] = [
    {
      postId: 1,
      username: 'User 123',
      upvotes: 300,
      nrComments: 50,
      voteStatus: 'upvoted',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: true,
      imgLink: null
    },
    {
      postId: 2,
      username: 'User 456',
      upvotes: 150,
      nrComments: 200,
      voteStatus: 'downvoted',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: true,
      imgLink: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Solid_white.png?20060513000852'
    },
    {
      postId: 3,
      username: 'User 124',
      upvotes: 10,
      nrComments: 5,
      voteStatus: 'undefined',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a augue facilisis, tempor lectus ullamcorper, bibendum leo. Nullam sollicitudin augue sed felis hendrerit ultrices. Aenean nec rutrum magna. Praesent massa sem, suscipit at interdum non, lobortis eget dolor. Quisque volutpat neque velit, ut luctus purus aliquet eget. Aenean suscipit lorem a nisl consectetur imperdiet.`,
      favorited: false,
      imgLink: null
    },
  ];


}
