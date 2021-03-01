import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({  providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient){}

  private fireBaseUrl = 'https://dummy-http-for-angular-default-rtdb.firebaseio.com/posts.json';

  createAndStorePost(postData:{title: string, content: string}){
    // const postData: Post = {title: title, content: content};
    this.http
    .post<{ name: string }>(this.fireBaseUrl, postData, {
      observe: 'response'
    })
    .subscribe(responseData => {
      console.log(responseData);
    }, error => { // Another way of error handling
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.set('print', 'pretty'); // Supported by firebase
    searchParams = searchParams.set('madeUpKey', 'madeUpValue');
    return this.http
      .get<{ [key: string]: Post }>(this.fireBaseUrl,
        {
          headers: new HttpHeaders({ 'your-custom-header': 'Hello' }),
          params: searchParams,
          responseType: 'json'
        })
      .pipe(map((responseData) => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (Object.prototype.hasOwnProperty.call(responseData, key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }),
        catchError(errorRes => { // catchError is usfull for generic error handling
          // Some generic function if need (May be analytics or for logging)
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(this.fireBaseUrl,
      {
        observe: 'events',
        responseType: 'text'
      }
    ).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Response){
        console.log(event.body);
      }
    }));
  }

}
