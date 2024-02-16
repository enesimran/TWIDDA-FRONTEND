import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postDisplayDTO } from './postDisplay.dto';
import { Observable, map } from 'rxjs';
import { likeDisplayDTO } from './likeDisplay.dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getPosts(page: number, size: number): Observable<postDisplayDTO[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'timestamp,desc');

    return this.httpClient.get<{ content: postDisplayDTO[] }>(`https://enes.zip:8080/api/posts/pageable`, { params })
      .pipe(
        map(response =>
          response.content)
      );
  }

  createPost(content: string) {
    let params = new HttpParams().set('content', content);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    return this.httpClient
      .post('https://enes.zip:8080/api/posts/create', null, httpOptions)
      .toPromise();
  }

  toggleLike(postId: string): Promise<likeDisplayDTO> {
    let params = new HttpParams().set('postId', postId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    return this.httpClient
      .post<likeDisplayDTO>('https://enes.zip:8080/api/likes/toggle', null, httpOptions)
      .toPromise() as Promise<likeDisplayDTO>;
  }


}