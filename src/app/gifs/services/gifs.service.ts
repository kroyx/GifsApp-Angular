import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private tagsHistory: string[] = [];

  constructor() { }

  get getTagsHistory(): string[] {
    return [...this.tagsHistory];
  }

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

  public searchTag(tag: string): void {
    // Se valida que se haya introducido algo
    if (tag === '') return;
    this.organizeHistory(tag);
  }
}
