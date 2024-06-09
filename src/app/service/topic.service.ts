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
        return this.http.post<any>(this.apiUrl, topic);
      }
    getAllTopics(): Observable<TopicDTO[]> {
        return this.http.get<TopicDTO[]>(`${this.apiUrl}/all`);
    }
}