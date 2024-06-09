import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, ElementRef, Inject, inject, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ElementRefService } from '../service/element-ref.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TopicDTO } from '../models/topicdto.model';
import { TopicService } from '../service/topic.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [NgIf ,FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
  animations: [
    trigger('bouceOnClick', [
      state('clicked', style({
        transform: 'rotate(30deg)'
      })),
      state('unclicked', style({
        transform: 'rotate(0deg)'
      })),
      transition('unclicked => clicked', [
        animate('500ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(7deg)', offset: 0.2 }),
          style({ transform: 'rotate(-7deg)', offset: 0.4 }),
          style({ transform: 'rotate(3deg)', offset: 0.6 }),
          style({ transform: 'rotate(-3deg)', offset: 0.8 }),
          style({ transform: 'rotate(0deg)', offset: 1.0 })
        ]))
      ]),
      transition('clicked => unclicked', [
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None, 
})
export class CreatePostComponent implements OnInit, OnDestroy{
  // Constrctor, Innit and Destroy
  // -------------
  topics: string[] = [];
  private elementRefSubscription!: Subscription;
  constructor(private elementRefService: ElementRefService, private route: ActivatedRoute, private topicService: TopicService){
  }

  ngOnInit(): void {
    this.modalContainer = this.elementRefService.getElementRef();
    this.elementRefSubscription = this.elementRefService.elementRefChanged.subscribe(
      (elementRef) => {
        this.modalContainer = elementRef;
      }
    );

    this.route.queryParams.subscribe(params => {
      const paramValue = params['topic'];
      if(paramValue){
        this.currentTopic = paramValue;
      }else{
        this.currentTopic = this.defaultTopicPlaceHolder;
      }
    });
    this.topicService.getAllTopics().subscribe({
      next: (topics) => {
        this.topics = topics.map(topic => topic.title);
      },
      error: (error) => {
        console.log('Error fetching topics: ', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.elementRefSubscription) {
      this.elementRefSubscription.unsubscribe();
    }
  }

 

  defaultTopicPlaceHolder: string = '[Choose a Topic]';
  private _currentTopic: string = this.defaultTopicPlaceHolder;

  get currentTopic(): string{
    return this._currentTopic;
  }

  set currentTopic(selectedTopic: string){
    this._currentTopic = selectedTopic;
    this.closeModal();
  }

  modalTouched: boolean = false;

  modalWasTouched(){
    if(this.modalRef){
      this.modalRef.dismissed.subscribe( () => {
        this.modalTouched = true;
      });
    }
  }

  isTopicChosed(): boolean{
    if(this.currentTopic === this.defaultTopicPlaceHolder){
      return false;
    } 
    return true;
  }

  private modalService = inject(NgbModal);
  private modalRef!: NgbModalRef
  private modalContainer!: ElementRef; 
  @ViewChild('choseTopicContent', { static: true }) choseTopicContent!: TemplateRef<any>;
  openModal() {
    const modalOptions: NgbModalOptions = {
      centered: true,  
      container: this.modalContainer.nativeElement,
      scrollable: true
    }
    this.modalRef = this.modalService.open(this.choseTopicContent, modalOptions);
    this.modalWasTouched();
	}
  closeModal(){
    if(this.modalRef){
      this.modalRef.close('Close dismmised');
    }
  }
  reloadPage() {
    window.location.reload();
  }

  // Form btns animation
  // -------------
  isSubmitBtnClicked: boolean = false;

  get submitBtnState() {
    return this.isSubmitBtnClicked ? 'clicked' : 'unclicked';
  }

  toggleSubmitBtnAnimation(form: NgForm): void {
    if(!(form.valid && this.isTopicChosed()))
      this.isSubmitBtnClicked = !this.isSubmitBtnClicked;
  }

  onSubmitBtnAnimationDone(): void {
    this.isSubmitBtnClicked = false;
  }
  

  // Input iamge components
  // -------------
  selectedImage: string | ArrayBuffer | null = null;
  file: File | null = null;
  isFileSelected: boolean = false;

  onFileSelected(event: Event): void {
    this.isFileSelected = true;
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.file = file;
      
      const reader = new FileReader();
      reader.onload = (e) => this.selectedImage = reader.result;
      reader.readAsDataURL(file);
    }
  }
  
  // Form functionality
  // -------------
  submitForm(form: NgForm){
    if(form.valid && this.isTopicChosed()){

      // you can delete the console logs
      console.log("_____________________________");
      // this gives text.
      // in the backend you shouldcheck if the topic exists and if not give an error
      console.log("Topic: '" + this.currentTopic +"'\n");
      // this gives text.
      console.log("Title: '" + form.controls['title'].value + "'\n", form.controls['text'].value);
      // this gives text or ''.
      console.log("Text: '" + form.controls['text'].value + "'\n", form.controls['text'].value);
      // this gives the path of the file as text or ''. - better dont use this, use the one bellow
      console.log("Image: '" + form.controls['image'].value + "'\n", form.controls['image'].value);
      // this gives the actual file or ''.      
      console.log("Image as file: '" + this.getActualImage() + "'\n", this.getActualImage());

    } else{
      this.modalTouched = true;
    }
  }

  discardForm(){
    window.location.reload();
  }

  getActualImage(): string | File{
      if(this.file){
        return this.file;
      }else{
        return '';
      }
  }
}
