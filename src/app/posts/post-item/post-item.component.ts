import { Component, Input } from '@angular/core';
import { postDisplayDTO } from '../postDisplay.dto';
import { PostService } from '../post.service';
import { DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { postDTO } from '../post.dto';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  standalone: true,
  imports: [NgIf, DatePipe, MatCardModule, MatIconModule],
})
export class PostItemComponent {
  @Input() postId!: string;
  @Input() post!: postDisplayDTO;

  constructor(private postService: PostService) {}

  toggleLike(post: postDisplayDTO) {
    console.log(post)
      this.postService.toggleLike(post.id).then(res => {
        this.post.liked = res.liked;
        this.post.likes = res.likes;
      });
  }
}
