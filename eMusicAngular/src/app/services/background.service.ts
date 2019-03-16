import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  muted = true;
  
  constructor() { }
}
