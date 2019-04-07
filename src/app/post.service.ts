import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  savePosts(obj) {
    return this.http.post('http://localhost:3500/api/savePosts', { text: obj })
  }
  getAllPosts(){
    return this.http.get('http://localhost:3500/api/getAllPosts')
  }
  upvote(id){
    return this.http.post('http://localhost:3500/api/upvote', {id: id})
  }
}
