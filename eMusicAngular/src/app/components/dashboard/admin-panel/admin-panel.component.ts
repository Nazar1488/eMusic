import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { MusicService, UserService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  title = new FormControl('', [Validators.required]);
  artist = new FormControl('', [Validators.required]);
  cost = new FormControl('', [Validators.required]);
  public progress: number;
  public message: string;
  apiUrl = "https://localhost:44370/api";

  constructor(private http: HttpClient, private musicServive: MusicService, private userService: UserService) { }

  ngOnInit() {
  }

  upload(audio, image) {
    if (audio.length === 0 || image.length === 0) {
      return;
    }
 
    let audioToUpload = <File>audio[0];
    let imageToUpload = <File>image[0];
    const formData = new FormData();
    formData.append('audio', audioToUpload, audioToUpload.name);
    formData.append('image', imageToUpload, imageToUpload.name);
    formData.append('title', this.title.value);
    formData.append('artist', this.artist.value);
    formData.append('cost', this.cost.value);
    this.http.post(`${this.apiUrl}/admin/upload`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.musicServive.refresh();
        }
      });
  }
}
