import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe.module';
import { RecipeService } from 'src/app/services/recipe.service';
import { Observable } from 'rxjs';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import {FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { DateTime } from 'luxon';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  selectedImageFile: File;
  recipe: Recipe = new Recipe();
  filePath: string;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  preview: string = "";
  imageInfos?: Observable<any>;
  showLoader=false;
  submitted = false;

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  currentImage:CurrentImageFile|null=null;
  
  


  constructor(private recipeService: RecipeService, private router:Router) { 
  }

  ngOnInit(): void {
    
  }

 

  uploadPost(comment: any){
    this.firestore.create(
      {
        path: ["Posts"],
        data: {
          comment: comment,
          creatorId: this.auth.getAuth().currentUser.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {

        }
      }
    );

    
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    try{
      if(this.selectFiles.length>0){
        const file = this.selectedFiles[0];
        console.log(file);
        const reader = new FileReader();
        this.showLoader = true;
        reader.onload = (e: any) => {
          //console.log(e.target.result);
          this.preview = e.target.result;
          this.currentImage = {
            name:file.name,
            data:file
          }
          this.showLoader = false;
        };
        reader.readAsDataURL(file);
        
      }
    }
    catch(e){
      console.error(e);
    }
  }
  
  
  

  saveTutorial(): void {
   this.showLoader = true;

    const storage = getStorage();
    const storageRef = ref(storage, 'images/'+DateTime.now().toFormat("yyyy-MM-dd_HH-mm-ss")+"_"+this.currentImage.name);
    const uploadTask = uploadBytesResumable(storageRef, this.currentImage.data);

uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => console.error, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      
      console.log('File available at', downloadURL);
      this.recipe.photo = downloadURL;
      setTimeout(()=>{//del viso pikto
        this.recipeService.create(this.recipe).then(() => {
          console.log('Created new item successfully!');
          this.submitted = true;
          this.showLoader = false;
        }).catch(()=>{
          console.log('Created new item UNsuccessfully! (THIS BAD >.<)');
          this.showLoader = false;
          this.submitted = true;
        });
      },100);
      
    });
  }
);
   
this.router.navigateByUrl('/add-recipe');

  }
  
  basePath = '/images';                       //  <<<<<<<
  downloadableURL = '';             
  
// File uploaded when triggered
  onPhotoSelected(photoSelector: HTMLInputElement, event:any){
    this.selectedImageFile = photoSelector.files[0];
    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loaded",
      ev => {
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );

  }

  
  


}

interface CurrentImageFile{
  name:string,
  data:any
}