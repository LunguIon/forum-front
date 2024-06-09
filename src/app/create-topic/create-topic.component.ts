import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TopicService } from '../service/topic.service';
import { SimplifiedTopicDTO } from '../models/topic.model';
@Component({
  selector: 'app-create-topic',
  standalone: true,
  imports: [NgIf, HttpClientModule, FormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-topic.component.html',
  styleUrl: './create-topic.component.scss',
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
})
export class CreateTopicComponent{
  // Form btns animation
  // -------------
  isSubmitBtnClicked: boolean = false;

  get submitBtnState() {
    return this.isSubmitBtnClicked ? 'clicked' : 'unclicked';
  }

  toggleSubmitBtnAnimation(form: NgForm): void {
    if(!form.valid)
      this.isSubmitBtnClicked = !this.isSubmitBtnClicked;
  }

  onSubmitBtnAnimationDone(): void {
    this.isSubmitBtnClicked = false;
  }
  
  constructor(private topicService: TopicService){}

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

      // CALL OF TEMP FUNCTION ...
      // this.uploadImage(file);
      // console.log('Selected file:', file);
      
      const reader = new FileReader();
      reader.onload = (e) => this.selectedImage = reader.result;
      reader.readAsDataURL(file);
    }
  }
  
  // TEMP FUNCTION, SHOULD BE MODIFIED/DELETED LATAER 
  private http: HttpClient = inject(HttpClient);
  uploadImage(imageFile: File | null): void {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile, imageFile.name);

      // Replace 'your-backend-endpoint' with the actual endpoint
      this.http.post('your-backend-endpoint', formData).subscribe(
        response => {
          console.log('Upload successful', response);
        },
        error => {
          console.error('Upload error', error);
        }
      );
    } else {
      console.log('No file selected');
    }
  }

  // Form functionality
  // -------------
  submitForm(form: NgForm){
    if(form.valid){
      const email = localStorage.getItem('email');
      if(email){
        const topic: SimplifiedTopicDTO = {
          email: email, 
          title: form.controls['title'].value,
          content: form.controls['text'].value,
          imageURL: '' 
        };
        this.topicService.createTopic(topic).subscribe({
        next: (response) => {
          console.log('Topic created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating topic:', error);
        }
      });
      } else {
      console.error('User email not found in local storage.');
    }
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
