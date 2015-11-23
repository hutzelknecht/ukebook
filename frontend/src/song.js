import {LifecycleEvent, ComponentMetadata as Component, ViewMetadata as View} from 'angular2/angular2';

let scriptasaurus = ukeGeeks.scriptasaurus;
@Component({
  selector: 'song',
  lifecycle: [LifecycleEvent.onInit],
  properties: [
    'title'
  ]
})

@View({
  templateUrl: 'song.html'
})

export class Song {
  constructor(){
  }
  onInit(){
    scriptasaurus.init();
    scriptasaurus.run();
  }
}
