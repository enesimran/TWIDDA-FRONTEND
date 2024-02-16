import { Component, Input } from '@angular/core';
import { PostCreateComponent } from '../post-create/post-create.component';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PostItemComponent } from '../posts/post-item/post-item.component';
import { PostService } from '../posts/post.service';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: true,
  imports: [PostCreateComponent, NgIf, CommonModule, PostItemComponent, PostListComponent, MatDialogModule, MatButtonModule]
})
export class HomepageComponent {
  showCreatePostWindow: boolean = false;
  posts: any;

  constructor(private router: Router, public authService: AuthService, public postService: PostService, private matDialog: MatDialog, private toastr: ToastrService) {}

  toggleCreatePostWindow() {
    this.matDialog.open(PostCreateComponent);
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.error("Du wurdest ausgeloggt.");
    this.router.navigate(['/auth']);
  }

  

}
