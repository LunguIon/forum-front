import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { postDto } from '../models/postDto.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/posts';
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<postDto[]>{
    return this.http.get<postDto[]>(this.apiUrl);
  }
  createPost(post: Post): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }
}
