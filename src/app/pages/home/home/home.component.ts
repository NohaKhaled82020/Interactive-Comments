import { Component, OnInit } from '@angular/core';
import { ALLCOMMENTS } from 'src/app/shared/constants/general.constants';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import { UserService } from 'src/app/shared/services/user.service';
import { tap } from 'rxjs';
import { IComment } from 'src/app/shared/models/IComment.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  comments: IComment[] = [];

  constructor(
    public userService: UserService,
    private helpers: HelpersService
  ) {}

  ngOnInit(): void {
    this.userService.comments$
      .pipe(
        tap((res) => {
          this.comments = res
            ? res
            : this.helpers.getItemFromLocalStorage(ALLCOMMENTS);
        })
      )
      .toPromise();
  }
}
