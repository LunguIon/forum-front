import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { SimplifiedCommentDTO } from "../models/SimplifiedCommentDTO.model";
import { Observable } from "rxjs";
import { GetCommentDTO } from "../models/GetCommentDTO.model";
import { UserDTO } from "../models/UserDTO.model";

@Injectable({
    providedIn: 'root'
  })

export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;
    constructor(private http: HttpClient) { }
    getUserByEmail(email: string): Observable<UserDTO>{
        return this.http.get<UserDTO>(`${this.apiUrl}/${email}`);
    }
}