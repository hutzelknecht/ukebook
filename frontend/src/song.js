let scriptasaurus = ukeGeeks.scriptasaurus;

export class Song {
  constructor(params: RouteParams){
    this.id = params.get('id');
  }
  onInit(){
    scriptasaurus.init();
    scriptasaurus.run();
  }
}
