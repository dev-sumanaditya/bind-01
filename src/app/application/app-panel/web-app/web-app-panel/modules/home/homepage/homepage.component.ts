import { Component, OnInit, Sanitizer } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  private dummy = [1,2,3];

  private SelectedFile: File;
  private showThumb: boolean = false;
  private videoUrl: SafeUrl;
  private showVid:boolean = false;

  inputVal: string = '';

  constructor(private _sanitizer: Sanitizer) { }

  ngOnInit() {
  }


  removeFile() {
    this.SelectedFile = null;
    this.videoUrl = null;
    this.showVid = false;
    this.showThumb = false;
  }

  verifyFile() {
    setTimeout(() => {
      this.verify();
    }, 300);
  }

  verify() {
    var type = this.SelectedFile.type;
    var size = this.SelectedFile.size;
    this.showVid = false;

    console.log(this.SelectedFile);
    if(type.includes("image")){
      this.showThumb = true;
      this.showVid = false;
    } else {
      this.videoUrl = URL.createObjectURL(this.SelectedFile)
      this.showThumb = false;
      setTimeout(() => { this.showVid = true }, 500)
    }
  }
}