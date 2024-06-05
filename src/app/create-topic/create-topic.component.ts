import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

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
      this.http.post('topics', formData).subscribe(
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

      // you can delete the console logs
      console.log("_____________________________");
      // this gives text.
      console.log("Title: '" + form.controls['title'].value + "'\n", form.controls['text'].value);
      // this gives text or ''.
      console.log("Text: '" + form.controls['text'].value + "'\n", form.controls['text'].value);
      // this gives the path of the file as text or ''. - better dont use this, use the one bellow
      console.log("Image: '" + form.controls['image'].value + "'\n", form.controls['image'].value);
      // this gives the actual file or ''.      
      console.log("Image as file: '" + this.getActualImage() + "'\n", this.getActualImage());


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
