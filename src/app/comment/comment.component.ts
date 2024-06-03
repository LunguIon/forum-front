import { NgClass, NgIf } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../service/toast.service';

type VoteStatus = 'upvoted' | 'downvoted' | 'undefined';

interface PostComments{
  commentId: number;
  username: string;
  upvotes: number
  nrComments: number;
  voteStatus: 'upvoted' | 'downvoted' | 'undefined';
  content: string
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, RouterLink, RouterLinkActive, RouterOutlet, NgbDropdownModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {  
  // Input variables
  // -------------
  @Input() commentId: number = 1;
  @Input() username: string = ""
  @Input() upvotes: number = 0;
  @Input() nrComments: number = 0;
  @Input() content : string = "";
  @Input() voteStatus: VoteStatus = "undefined";
  @Input() nested: number = 1;
  
  // Constructor OnInit and other vars
  // -------------
  plusChecked: boolean = false;
  minusChecked: boolean = false;

  actualUpvotes: number = 0;

  constructor(){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commentId'] || changes['username'] || changes['upvotes'] || changes['nrComments'] || changes['voteStatus'] || changes['content']) {
      this.commentId = changes['commentId'].currentValue;
      this.username = changes['username'].currentValue;
      this.upvotes = changes['upvotes'].currentValue;
      this.nrComments = changes['nrComments'].currentValue;
      this.voteStatus = changes['voteStatus'].currentValue;
      this.content = changes['content'].currentValue;
    }
  }

  ngOnInit(): void {
      switch(this.voteStatus){
      case "undefined" : {this.plusChecked = false; this.minusChecked = false; this.actualUpvotes = this.upvotes} break;
      case "upvoted" : {this.plusChecked = true; this.minusChecked = false; this.actualUpvotes = this.upvotes;} break;
      case 'downvoted' : {this.plusChecked = false; this.minusChecked = true; this.actualUpvotes = this.upvotes;} break;
     }

    // get from the database the subcoments of this comment, if it has subcoments, 
    // could also check exisdsTheMaxLvlOfNesting() and if it's true dont populate the comments array from this controller

  }

  // Toast Service
  // -------------
  toastService = inject(ToastService);

  showToast(template: TemplateRef<any>) {
		this.toastService.show({ template });
	}

  // Coment Nesting components
  // -------------
  private _maxLvlOfNesting: number = 2;
  get maxLvlOfNesting(): number{
    return this._maxLvlOfNesting;
  }

  exisdsTheMaxLvlOfNesting(): boolean{
    return this.nested < this.maxLvlOfNesting;
  }

  copyCommentText(){
    if (!navigator.clipboard) {
      this.fallbackCopyTextToClipboard();
    } else {
      navigator.clipboard.writeText(this.content).then(() => {
        // console.log('Text copied to clipboard');
      }).catch(err => {
        // console.error('Could not copy text: ', err);
      });
    }
  }

  fallbackCopyTextToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.content;
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

  // Voting functions
  // -------------
  onPlusClick(plusBtn: HTMLInputElement, minusBtn: HTMLInputElement){
    if (plusBtn.checked) {
      this.actualUpvotes++;
      if (minusBtn.checked) {
        this.actualUpvotes++;
      }
    } else {
      this.actualUpvotes--;
    }

    this.onRatingClick(plusBtn, minusBtn);
    this.plusChecked = plusBtn.checked;
    this.minusChecked = minusBtn.checked;
  }

  onMinusClick(minusBtn: HTMLInputElement, plusBtn: HTMLInputElement){
    if (minusBtn.checked) {
      this.actualUpvotes--;
      if (plusBtn.checked) {
        this.actualUpvotes--;
      }
    } else {
      this.actualUpvotes++;
    }
    
    this.onRatingClick(minusBtn, plusBtn);
    this.minusChecked = minusBtn.checked;
    this.plusChecked = plusBtn.checked;
  }

  // Nested comments array
  // -------------
  comments: PostComments[] = [
    {
    commentId: this.commentId+10,
    username: 'a',
    upvotes: 0,
    nrComments: 0,
    voteStatus: 'undefined',
    content: 'Comment contet',
    },
    {
      commentId: this.commentId+20,
      username: 'a',
      upvotes: 0,
      nrComments: 0,
      voteStatus: 'undefined',
      content: 'Comment contet',
    }
  ]; 
}
