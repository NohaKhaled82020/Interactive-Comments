import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { DynamicDatePipe } from './pipes/dynamic-date.pipe';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    CommentComponent,
    AddCommentComponent,
    DynamicDatePipe,
    DeleteModalComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    CommonModule,
    CommentComponent,
    AddCommentComponent,
    FormsModule,
    DynamicDatePipe,
    DeleteModalComponent,
  ],
})
export class SharedModule {}
