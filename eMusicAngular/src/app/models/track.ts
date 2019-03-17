export class Track {
    id: string;
    trackPath: string;
    imagePath: string;
    artist: string;
    title: string;

    constructor(id: string, trackPath: string, imagePath: string, artist: string, title: string) {
        this.id = id;
        this.trackPath = trackPath;
        this.imagePath = imagePath;
        this.artist = artist;
        this.title = title;
    }
}