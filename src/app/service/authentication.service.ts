import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private apiUrl = environment.apiUrl;

    constructor (private http : HttpClient) {}
        login (credentials: any) : Observable<any> {
            return this.http.post(`${this.apiUrl}/auth/login`, credentials);
        }

        signUp (userData: any): Observable<any> {
            return this.http.post(`${this.apiUrl}/auth/signUp`, userData);
        }
    }