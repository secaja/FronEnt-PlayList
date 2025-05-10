import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Playlist } from '../models/PlayList.model';
import { PlayListService } from '../services/play-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cancion } from '../models/Cancion.model';

@Component({
  selector: 'app-playlist',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit{
  
  playlists: Playlist[] = [];
  playlistBuscada: Playlist | null = null;
  nombre: string = '';
  
  nuevaPlaylist: Playlist = {
    nombre: '',
    descripcion: '',
    canciones: []
  };

  constructor(private playListService : PlayListService){}

  ngOnInit(): void {
    this.getAllPlaylists();
  }

  getAllPlaylists():void{
    this.playListService.getAllPlaylists().subscribe({
      next: data => this.playlists = data,
      error: err => console.error('Error al obtener playlist, err')
    })
  }

  getPlayListByNombre(): void {
    if (!this.nombre.trim()) {
      this.playlistBuscada = null;
      return;
    }
  
    this.playListService.getPlaylistByName(this.nombre.trim()).subscribe({
      next: data => this.playlistBuscada = data,
      error: err => {
        console.error('No se encontró la playlist', err);
        this.playlistBuscada = null;
      }
    });
  }

  crearPlaylist(): void {
    this.playListService.crearPlayList(this.nuevaPlaylist).subscribe({
      next: data => {
        this.playlists.push(data);
        this.nuevaPlaylist = { nombre: '', descripcion: '', canciones: [] };
      },
      error: err => console.error('Error al crear playlist', err)
    });
  }

  deletePlaylist(nombre: string): void {
    this.playListService.deletePlaylist(nombre).subscribe({
      next: () => {
        this.playlists = this.playlists.filter(p => p.nombre !== nombre);
      },
      error: err => console.error('Error al eliminar playlist', err)
    });
  }

  expandedPlaylists: Set<string> = new Set();

toggleDetalle(nombre: string): void {
  if (this.expandedPlaylists.has(nombre)) {
    this.expandedPlaylists.delete(nombre);
  } else {
    this.expandedPlaylists.add(nombre);
  }
}

@ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;


abrirModal(): void {
  this.nuevaPlaylist = {
    nombre: '',
    descripcion: '',
    canciones: [{titulo: '', artista: '', album: '', anno: '', genero: '' }]
  };
  const dialog: HTMLDialogElement | null = document.querySelector('dialog');
  dialog?.showModal();
}

cerrarModal() {
  const dialog: HTMLDialogElement | null = document.querySelector('dialog');
  dialog?.close();
}
  
agregarCancion() {
  this.nuevaPlaylist.canciones.push({
    titulo: '',
    artista: '',
    album: '',
    anno: '',
    genero: ''
  });
}

limpiarFiltro(): void {
  this.nombre = ''; 
  this.playlistBuscada = null;
  this.getAllPlaylists(); 
}


}
