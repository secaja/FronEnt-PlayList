import { Component } from '@angular/core';
import { PlaylistComponent } from './playlist/playlist.component';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [PlaylistComponent],
  template: `<app-playlist></app-playlist>`
})
export class AppComponent {
  title = 'FronEnt-PlayList';
}
