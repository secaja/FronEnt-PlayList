import { Cancion } from './Cancion.model';

export interface Playlist {
  id?: number;
  nombre: string;
  descripcion: string;
  canciones: Cancion[];
}
