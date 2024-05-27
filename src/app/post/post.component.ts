import { NgClass, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type VoteStatus = 'upvoted' | 'downvoted' | 'undefined';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  // Input variables
  // -------------
  @Input() postId: number = 1;
  @Input() username: string = ""
  @Input() upvotes: number = 0;
  @Input() nrComments: number = 0;
  @Input() content : string = "";
  @Input() voteStatus: VoteStatus = "undefined";
  @Input() favorited: boolean = false;
  @Input() hasImage: boolean = false;
  
  // Constructor OnInit and other vars
  // -------------
  plusChecked: boolean = false;
  minusChecked: boolean = false;

  actualUpvotes: number = 0;

  constructor(){}

  ngOnInit(): void {
      switch(this.voteStatus){
      case "undefined" : {this.plusChecked = false; this.minusChecked = false; this.actualUpvotes = this.upvotes} break;
      case "upvoted" : {this.plusChecked = true; this.minusChecked = false; this.actualUpvotes = this.upvotes+1;} break;
      case 'downvoted' : {this.plusChecked = false; this.minusChecked = true; this.actualUpvotes = this.upvotes-1;} break;
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

}
