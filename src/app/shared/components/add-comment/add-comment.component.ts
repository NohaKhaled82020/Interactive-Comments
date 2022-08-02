import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs';
import { ALLCOMMENTS } from '../../constants/general.constants';
import { IComment } from '../../models/IComment.model';
import { HelpersService } from '../../services/helpers.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
})
export class AddCommentComponent implements OnInit {
  @Input() comment: any;
  @Input() commentIndex: any;
  @Input() replyIndex: any;

  commentText: string = '';
  comments: IComment[] = [];

  constructor(public userService: UserService, public helpers: HelpersService) {
    this.comments = this.helpers.getItemFromLocalStorage(ALLCOMMENTS);
  }

  ngOnInit(): void {
    this.commentText = this.comment
      ? `@${this.comment.user.userName} ${this.commentText}`
      : '';
  }

  addComm(form: NgForm, myInfo: any): void {
    let body: any = {
      id: this.uniqueId() + 1,
      content: form.value.commentText,
      createdAt: new Date(),
      score: 0,
      user: myInfo,
    };
    if (this.commentIndex === undefined && this.replyIndex === undefined) {
      body = { ...body, replies: [] };
      this.comments = [...this.comments, body];
    } else {
      body = { ...body, replyingTo: this.comment.user.userName };
      this.comments[this.commentIndex].replies.push(body);
    }
    this.userService.comments$.next(this.comments);
    this.helpers.setItemToLocalStorage(ALLCOMMENTS, this.comments);
    this.userService.showBox$.next(false);
    this.commentText = '';
  }

  uniqueId(): number {
    let idList: any = [];
    for (const item of this.comments) {
      idList = [...idList, item.id];
      for (const list of item.replies) {
        idList = [...idList, list.id];
      }
    }
    return Math.max(...idList);
  }
}
