import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Post {
  postId: number;
  username: string;
  valueOfLikes: number;
  nrComments: number;
  voteStatus: 'upvoted' | 'downvoted' | 'undefined';
  content: string;
  favorited: boolean;
  imgLink: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/posts';
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.apiUrl);
  }
}
