import {ComponentMetadata as Component, ViewMetadata as View} from 'angular2/angular2';

@Component({
  selector: 'song',
  properties: [
    'title'
  ]
})

@View({
  templateUrl: 'song.html'
})

export class Song {}
