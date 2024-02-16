import { Component, HostListener, OnInit } from '@angular/core';
import { postDisplayDTO } from '../postDisplay.dto';
import { PostService } from '../post.service';
import { NgFor, NgIf } from '@angular/common';
import { PostItemComponent } from '../post-item/post-item.component';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, PostItemComponent]
})
export class PostListComponent implements OnInit, AfterViewInit {
  //Code generiert von ChatGPT
  @ViewChild('sentinel') sentinel: ElementRef | undefined;
  private observer: IntersectionObserver | undefined;
  //Ende Codesnippet

  posts: postDisplayDTO[] = [];
  page = 0;
  size = 10;
  finished = false;
  isLoading = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  //Wenn Sentinel im viewport -> lade weitere Posts
  //Code generiert von ChatGPT
  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.finished) {
        this.loadPosts();
      }
    });
    this.observer.observe(this.sentinel?.nativeElement);
  }
  //Ende Codesnippet

  loadPosts(): void {
    if (this.finished || this.isLoading) { return; }
    this.isLoading = true;
    console.log("page: " + this.page)  // Setze die Ladeflag vor der Anfrage
    console.log('Loading posts...');

    this.postService.getPosts(this.page, this.size).subscribe(
      (data) => {
        console.log(data);
        this.posts = [...this.posts, ...data];
        this.page++;
        this.isLoading = false;  // Setze die Ladeflag zurück, nachdem Daten geladen wurden
        if (data.length < this.size) {
          this.finished = true;
        }
      },
      (error) => {
        console.error('Error fetching posts', error);
        this.isLoading = false;
        this.finished = true;
      }
    );
  }

}

