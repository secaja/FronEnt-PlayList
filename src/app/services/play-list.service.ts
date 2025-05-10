import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/PlayList.model';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {
  private apiUrl = 'http://localhost:8080/Lists';
  private username = 'user';
  private password = 'user123';
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders{
    const auth = 'Basic '+ btoa(this.username + ':' + this.password);
    return new HttpHeaders({Autorization: auth});
  }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl,{
      headers: this.getAuthHeaders(),
      withCredentials:true
    });
  }

  getPlaylistByName(nombre: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/${encodeURIComponent(nombre)}`, {
      headers:this.getAuthHeaders(),
      withCredentials:true
    });
  } 
  crearPlayList(data: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, data, {
      headers:this.getAuthHeaders(),
      withCredentials:true
    });
  }

  deletePlaylist(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${encodeURIComponent(nombre)}`, {
      headers: this.getAuthHeaders(),
      withCredentials:true
    });
  }
   
}
