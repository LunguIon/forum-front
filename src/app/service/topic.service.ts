import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SimplifiedTopicDTO } from "../models/topic.model";
import { TopicDTO } from "../models/topicdto.model";

@Injectable({
    providedIn: 'root'
})

export class TopicService {
    private apiUrl = `${environment.apiUrl}/topics`;

    constructor(private http: HttpClient){}

    createTopic(topic: SimplifiedTopicDTO): Observable<any> {
        const token = localStorage.getItem('jwt');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<any>(this.apiUrl, topic, { headers });
      }
    getAllTopics(): Observable<TopicDTO[]> {
        return this.http.get<TopicDTO[]>(`${this.apiUrl}/all`);
    }
}