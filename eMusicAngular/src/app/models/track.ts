export class Track {
    id: string;
    trackPath: string;
    imagePath: string;
    artist: string;
    title: string;
    cost: number;

    constructor(id: string, trackPath: string, imagePath: string, artist: string, title: string, cost: number) {
        this.id = id;
        this.trackPath = trackPath;
        this.imagePath = imagePath;
        this.artist = artist;
        this.title = title;
        this.cost = cost;
    }
}