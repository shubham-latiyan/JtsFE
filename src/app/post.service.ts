import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  savePosts(obj) {
    return this.http.post('https://jtsbe-alrhldwvkr.now.sh/api/savePosts', { text: obj })
  }
  getAllPosts(){
    return this.http.get('https://jtsbe-alrhldwvkr.now.sh/api/getAllPosts')
  }
  upvote(id){
    return this.http.post('https://jtsbe-alrhldwvkr.now.sh/api/upvote', {id: id})
  }
}
