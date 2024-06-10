import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { SimplifiedCommentDTO } from "../models/SimplifiedCommentDTO.model";
import { Observable } from "rxjs";
import { GetCommentDTO } from "../models/GetCommentDTO.model";

@Injectable({
    providedIn: 'root'
  })

export class CommentService {
    private apiUrl = `${environment.apiUrl}/comments`;
    constructor(private http: HttpClient) { }
    
    getAllComments(): Observable<GetCommentDTO[]>{
        return this.http.get<GetCommentDTO[]>(this.apiUrl);
      }
    createComment(comment: SimplifiedCommentDTO): Observable<any> {
        return this.http.post<any>(this.apiUrl, comment);
      }
      getCommentsByPostId(postId: string): Observable<GetCommentDTO[]> {
        return this.http.get<GetCommentDTO[]>(`${this.apiUrl}/post/${postId}`);
      }
}
