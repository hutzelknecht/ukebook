import {ComponentMetadata as Component, ViewMetadata as View, bootstrap} from 'angular2/angular2';
import {Song} from 'song';

@Component({
  selector: 'main'
})

@View({
  directives: [Song],
  templateUrl: 'layout.html'
})

class Main {

}

bootstrap(Main);
