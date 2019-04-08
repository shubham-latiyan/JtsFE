import { Component } from '@angular/core';
import { PostService } from './post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: String;
  postsArray: Array<any>;

  constructor(private _ps: PostService, private ts: ToastrService) { }

  ngOnInit() {
    this.getAllPost();
  }

  submitPost() {
    this._ps.savePosts(this.text).subscribe((data: any) => {
      console.log('data:', data)
      if (data.isSuccess) {
        this.ts.success('New post added successfully', '');
        this.text = "";
        this.postsArray.splice(0, 0, data.data)
      }
      else {
        this.ts.error(data.msg, '');
      }
    })
  }
  getAllPost() {
    this._ps.getAllPosts().subscribe((data: any) => {
      this.postsArray = data.data;
      console.log('this.postsArray:', this.postsArray)
    })
  }
  upvote(id) {
    this._ps.upvote(id).subscribe((data: any) => {
      if (data.isSuccess) {
        let index = this.postsArray.findIndex(a => a._id == data.data._id)
        this.postsArray.splice(index, 1, data.data)
      }
    })
  }

}
