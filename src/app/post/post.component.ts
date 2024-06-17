import { NgClass, NgIf } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { VoteStatus } from '../models/voteStatus.type';
import { CommentService } from '../service/comments.service';
import { UserDTO } from '../models/UserDTO.model';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit, OnChanges{
  // Input variables
  // -------------
  @Input() id: string = "";
  @Input() user: UserDTO = {username: '', email: '', imageUrl:''};
  @Input() valueOfLikes: number = 0;
  @Input() nrComments: number = 0;
  @Input() content : string = "";
  @Input() voteStatus: VoteStatus = "undefined";
  @Input() topic: string = '';
  @Input() imgLink: string | null = null;
  // @Input() imageLink: string = 'data:image/png;base64,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';
  
  // Constructor OnInit and other vars
  // -------------
  plusChecked: boolean = false;
  minusChecked: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] || changes['user'] || changes['valueOfLikes'] || changes['nrComments'] || changes['voteStatus'] || changes['content'] || changes['imgLink'] || changes['topic']) {
      
      if(changes['id'])
        this.id = changes['id'].currentValue;

      if(changes['user'])
        this.user = changes['user'].currentValue;

      if(changes['valueOfLikes'])
        this.valueOfLikes = changes['valueOfLikes'].currentValue;
      
      if(changes['nrComments'])
        this.nrComments = changes['nrComments'].currentValue;

      if(changes['voteStatus'])
        this.voteStatus = changes['voteStatus'].currentValue;
      
      if(changes['content'])
        this.content = changes['content'].currentValue;

      if(changes['topic']){
        this.imgLink = changes['topic'].currentValue;}

      if(changes['imgLink']){
        this.imgLink = changes['imgLink'].currentValue;}

      // console.log('PostComponent inputs have changed', changes);
    }
  }

  ngOnInit(): void {
      switch(this.voteStatus){
      case "undefined" : {this.plusChecked = false; this.minusChecked = false;} break;
      case "upvoted" : {this.plusChecked = true; this.minusChecked = false;} break;
      case 'downvoted' : {this.plusChecked = false; this.minusChecked = true;} break;
     }
  }


  // Private functions
  // -------------
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  getSanitizedContent(): SafeHtml {
    const formattedContent = this.content.replace(/&#13;|\n/g, '<br>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
  }

  private onRatingClick(thisInputElemnt: HTMLInputElement, otherInputElement: HTMLInputElement){
    if(thisInputElemnt.checked == true && otherInputElement.checked == true){
      otherInputElement.checked = false;
    }
  }

  // Share comment functions
  // -------------
  @ViewChild('shareToast') shareToast!: TemplateRef<any>;
  sharePost(){
    const queryParams = { ...this.route.snapshot.queryParams };
    queryParams['postid'] = this.id;

    const currentUrl = this.router.createUrlTree(['/comments'], {
      queryParams: queryParams,
    })

    const fullUrl = `${window.location.origin}${this.router.serializeUrl(currentUrl)}`;

    this.copyText(fullUrl);
    this.showToast(this.shareToast);
  }

  // Copy Text Functionality
  // -------------
  copyText(commentText: string){
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard(commentText);
    } else {
      navigator.clipboard.writeText(commentText).then(() => {
        // console.log('Text copied to clipboard');
      }).catch(err => {
        // console.error('Could not copy text: ', err);
      });
    }
  }

  fallbackCopyTextToClipboard(commentText: string) {
    const textArea = document.createElement('textarea');
    textArea.value = commentText;
    // Avoid scrolling to bottom
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      // console.log('Fallback: Text copied to clipboard');
    } catch (err) {
      // console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }

  // Toast Service
  // -------------
  toastService = inject(ToastService);

  showToast(template: TemplateRef<any>) {
		this.toastService.show({ template });
	}

  // Voting functions
  // -------------
  voteStatusWasChanged(){
    // this functions triggers whenever the vote status changes
    // just check the this.voteStatus var.
    console.log('Comment ' + this.id + ': ' + this.voteStatus);
  }

  onPlusClick(plusBtn: HTMLInputElement, minusBtn: HTMLInputElement){
    if (plusBtn.checked) {
      this.valueOfLikes++;
      if (minusBtn.checked) {
        this.valueOfLikes++;
      }
      this.changeVoteStatus = 'upvoted';
    } else {
      this.valueOfLikes--;
      this.changeVoteStatus = 'undefined';
    }

    this.onRatingClick(plusBtn, minusBtn);
    this.plusChecked = plusBtn.checked;
    this.minusChecked = minusBtn.checked;
  }

  onMinusClick(minusBtn: HTMLInputElement, plusBtn: HTMLInputElement){
    if (minusBtn.checked) {
      this.valueOfLikes--;
      if (plusBtn.checked) {
        this.valueOfLikes--;
      }
      this.changeVoteStatus = 'downvoted';
    } else {
      this.valueOfLikes++;
      this.changeVoteStatus = 'undefined';
    }
    
    this.onRatingClick(minusBtn, plusBtn);
    this.minusChecked = minusBtn.checked;
    this.plusChecked = plusBtn.checked;
  }

  private set changeVoteStatus(newVoteStatus: VoteStatus) {
    this.voteStatus = newVoteStatus;
    this.voteStatusWasChanged();
  }
}
