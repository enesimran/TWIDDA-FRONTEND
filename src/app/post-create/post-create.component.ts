import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../posts/post.service';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatIconModule, MatInputModule, MatButtonModule]
})
export class PostCreateComponent {

  public formGroup: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.formGroup = this.fb.group({
      postcontent: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    });
  }

  submit() {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.postService.createPost(this.formGroup.get("postcontent")?.value).then(res => {
        alert("Posted!");
        window.location.reload();
        console.log(res);

      });

    }
  }

}
