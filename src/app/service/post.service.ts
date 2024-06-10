import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { postDto } from '../models/postDto.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<postDto[]>{
    return this.http.get<postDto[]>(this.apiUrl);
  }
  createPost(post: Post): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }
}
