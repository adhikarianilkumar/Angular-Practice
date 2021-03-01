import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private subscription: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      // console.log(posts);
      this.loadedPosts = posts;
    }, error => { // Error handling
      this.isFetching = false;
      this.error = error.message;
    });

    this.subscription = this.postsService.error.subscribe((errorMessage)=>{
      this.error = errorMessage;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isFetching = false;
      // console.log(posts);
      this.loadedPosts = posts;
    }, error => { // Error handling
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }

  onHandleError(){
    this.error = null;
    this.isFetching = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
