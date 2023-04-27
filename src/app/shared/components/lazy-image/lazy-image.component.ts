import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styles: []
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public isLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw  new Error('URL is required');
  }

  onLoad() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000)
  }
}
