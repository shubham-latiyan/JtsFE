import { Component } from '@angular/core';
import { PostService } from './post.service';
import { ToasterService } from "angular2-toaster/src/toaster.service";
import { ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: String;
  postsArray: Array<any>;

  constructor(private _ps: PostService, private ts: ToasterService) { }
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 500,
      limit: 1
    });
  ngOnInit() {
    this.getAllPost();
  }

  submitPost() {
    this._ps.savePosts(this.text).subscribe((data: any) => {
      console.log('data:', data)
      if (data.isSuccess) {
        this.ts.pop('success', '', 'New post added successfully');
        this.text = "";
        this.postsArray.splice(0, 0, data.data)
      }
      else{
        this.ts.pop('error', '', data.msg);
      }
    })
  }
  getAllPost() {
    this._ps.getAllPosts().subscribe((data: any) => {
      this.postsArray = data.data;
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
