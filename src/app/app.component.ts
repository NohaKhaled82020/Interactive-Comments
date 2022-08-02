import { Component, OnInit } from '@angular/core';
import { ALLCOMMENTS } from './shared/constants/general.constants';
import { IComment } from './shared/models/IComment.model';
import { HelpersService } from './shared/services/helpers.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'interactive-comments';

  currentUser = {
    imgSrc: '../../../../assets/images/avatars/image-juliusomo.png',
    userName: 'juliusomo',
  };
  comments: IComment[] = [
    {
      id: 5,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: '12-7-2022',
      score: 12,
      user: {
        imgSrc: '../assets/images/avatars/image-amyrobson.png',
        userName: 'amyrobson',
      },
      replies: [],
    },
    {
      id: 8,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: '12-7-2022',
      score: 5,
      user: {
        imgSrc: '../assets/images/avatars/image-maxblagun.png',
        userName: 'maxblagun',
      },
      replies: [
        {
          id: 7,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: '12-7-2022',
          score: 4,
          replyingTo: 'maxblagun',
          user: {
            imgSrc: '../assets/images/avatars/image-ramsesmiron.png',
            userName: 'ramsesmiron',
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: '12-7-2022',
          score: 2,
          replyingTo: 'ramsesmiron',
          user: {
            imgSrc: '../assets/images/avatars/image-juliusomo.png',
            userName: 'juliusomo',
          },
        },
      ],
    },
  ];

  constructor(public userService: UserService, public helpers: HelpersService) {
    this.userService.currentUser$.next(this.currentUser);
  }

  ngOnInit(): void {
    if (!this.helpers.checkItemFromLocalStorage(ALLCOMMENTS)) {
      this.helpers.setItemToLocalStorage(ALLCOMMENTS, this.comments);
    }
  }
}
