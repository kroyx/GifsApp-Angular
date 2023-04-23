import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gif, SearchResponse} from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];
  private tagsHistory: string[] = [];
  private apiKey: string = 'dk5ta3KUn67iZnH3taPlcQ4LTIOqDfxj';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) { }

  get getTagsHistory(): string[] {
    return [...this.tagsHistory];
  }

  public searchTag(tag: string): void {
    if (tag === '') return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
        .subscribe(resp => {
          this.gifsList = resp.data;
        });
  }

  // public async searchTag(tag: string): Promise<void> {
  //   // Se valida que se haya introducido algo
  //   if (tag === '') return;
  //   this.organizeHistory(tag);
  //
  //   // Opcion 1
  //   // fetch('https://api.giphy.com/v1/gifs/search?api_key=dk5ta3KUn67iZnH3taPlcQ4LTIOqDfxj&q=valorant&limit=10')
  //   //   .then(resp => resp.json())
  //   //   .then(data => console.log(data));
  //
  //   // Opcion 2
  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=dk5ta3KUn67iZnH3taPlcQ4LTIOqDfxj&q=valorant&limit=10');
  //   const data = await resp.json();
  //   console.log(data);
  // }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this.tagsHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this.tagsHistory.unshift(tag);

    // Se restringe el historial a 10 elementos
    if (this.tagsHistory.length > 10) {
      this.tagsHistory.pop();
    }
  }
}
