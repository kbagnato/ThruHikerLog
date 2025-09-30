import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrail } from '../models/trail';

@Injectable({ providedIn: 'root' })
export class TrailService {
  private baseUrl = 'https://localhost:7225/api/trail';

  constructor(private http: HttpClient) { }

  /** Create a trail */
  createTrail(trail: ITrail): Observable<void> {
    return this.http.post<void>(this.baseUrl, trail);
  }

  /** Get list of all trails */
  getAllTrails(): Observable<ITrail[]> {
    return this.http.get<ITrail[]>(this.baseUrl);
  }

  /** Get details for a specific trail */
  getTrailDetails(id: number): Observable<ITrail> {
    return this.http.get<ITrail>(this.baseUrl + '/' + id);
  }

  /** Update a trail */
  updateTrail(trail: ITrail): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/' + trail.id, trail);
  }
}
