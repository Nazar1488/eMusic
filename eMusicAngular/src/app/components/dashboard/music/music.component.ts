import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  currentPageTracks: Track[];
  tracksPerPage = 5;
  trackCount = this.musicService.availableTracks.length;

  constructor(private musicService: MusicService) { 
    this.currentPageTracks = this.musicService.availableTracks.slice(0, this.tracksPerPage);
  }

  ngOnInit() {
  }

  setPageTracks() {

  }

  sortByTitle() {
    this.currentPageTracks.sort((left, right): number => {
      if (left.title < right.title) return -1;
      if (left.title > right.title) return 1;
      return 0;
    })
    this.musicService.availableTracks.sort((left, right): number => {
      if (left.title < right.title) return -1;
      if (left.title > right.title) return 1;
      return 0;
    })
  }

  sortByArtist() {
    this.currentPageTracks.sort((left, right): number => {
      if (left.artist < right.artist) return -1;
      if (left.artist > right.artist) return 1;
      return 0;
    })
    this.musicService.availableTracks.sort((left, right): number => {
      if (left.artist < right.artist) return -1;
      if (left.artist > right.artist) return 1;
      return 0;
    })
  }

  sortByCost() {
    this.currentPageTracks.sort((left, right): number => {
      if (left.cost < right.cost) return -1;
      if (left.cost > right.cost) return 1;
      return 0;
    })
    this.musicService.availableTracks.sort((left, right): number => {
      if (left.cost < right.cost) return -1;
      if (left.cost > right.cost) return 1;
      return 0;
    })
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.currentPageTracks = this.musicService.availableTracks.slice(firstCut, secondCut);
  }
}
