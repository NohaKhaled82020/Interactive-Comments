import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { ALLCOMMENTS } from '../../constants/general.constants';
import { IComment } from '../../models/IComment.model';
import { HelpersService } from '../../services/helpers.service';
import { UserService } from '../../services/user.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  @Input() commentIndex: any;
  @Input() replyIndex: any;

  show: boolean = false;
  showEdit: boolean = false;
  isLike: any;
  commentText: string = '';
  comments: IComment[] = [];

  constructor(
    public userService: UserService,
    private helpersService: HelpersService,
    private modalService: NgbModal
  ) {
    this.comments = this.helpersService.getItemFromLocalStorage(ALLCOMMENTS);
  }

  ngOnInit(): void {}

  showBox(): void {
    this.show = !this.show;
    const obj = {
      show: this.show,
      id: this.comment.id,
      ...this.comment,
    };
    this.userService.showBox$.next(obj);
  }

  deleteComment() {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      // windowClass: 'delete-modal',
      centered: true,
    });
    modalRef.result.then((result) => {
      if (result) {
        if (this.commentIndex && !this.replyIndex) {
          this.comments.splice(this.commentIndex, 1);
        } else {
          this.comments[this.commentIndex].replies.splice(this.replyIndex, 1);
        }
        this.userService.comments$.next(this.comments);
        this.helpersService.setItemToLocalStorage(ALLCOMMENTS, this.comments);
      }
    });
  }

  showEditBox() {
    this.showEdit = !this.showEdit;
    if (this.comment.content) {
      this.commentText = this.comment.content;
    }
  }

  editComment(f: NgForm) {
    let selectedComment = this.comments[this.commentIndex];

    if (this.commentIndex && !this.replyIndex) {
      selectedComment.content = f.value.commentText;
    } else {
      selectedComment.replies[this.replyIndex].content = f.value.commentText;
    }
    this.userService.comments$.next(this.comments);
    this.helpersService.setItemToLocalStorage(ALLCOMMENTS, this.comments);
    this.commentText = '';
  }

  like() {
    let selectedComment = this.comments[this.commentIndex];
    let selectedReply = selectedComment.replies[this.replyIndex];
    if (this.commentIndex && this.replyIndex >= 0) {
      selectedReply.score++;
    } else {
      selectedComment.score++;
    }
    this.isLike = true;
    this.userService.comments$.next(this.comments);
    this.helpersService.setItemToLocalStorage(ALLCOMMENTS, this.comments);
  }

  disLiked() {
    let selectedComment = this.comments[this.commentIndex];
    let selectedReply = selectedComment.replies[this.replyIndex];
    if (this.commentIndex && this.replyIndex >= 0) {
      selectedReply.score--;
    } else {
      selectedComment.score--;
    }
    this.isLike = false;
    this.userService.comments$.next(this.comments);
    this.helpersService.setItemToLocalStorage(ALLCOMMENTS, this.comments);
  }
}
