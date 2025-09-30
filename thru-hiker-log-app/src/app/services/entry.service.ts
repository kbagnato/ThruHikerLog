import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntry } from '../models/entry';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private baseUrl = 'https://localhost:7225/api/entry';

  constructor(private http: HttpClient) { }

  /** Create an entry */
  createEntry(entry: IEntry): Observable<void> {
    return this.http.post<void>(this.baseUrl, entry);
  }

  /** Get entries for a specific trail */
  getEntriesByTrailId(trailId: number): Observable<IEntry[]> {
    return this.http.get<IEntry[]>(this.baseUrl + '/trail/' + trailId);
  }

  /** Get details for a specific entry */
  getEntryDetails(trailId: number, entryId: number): Observable<IEntry> {
    return this.http.get<IEntry>(`${this.baseUrl}/${entryId}/trail/${trailId}`);
  }

  /** Update an entry */
  updateEntry(entry: IEntry): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${entry.id}/trail/${entry.trailId}`, entry);
  }

  /** Delete an entry */
  deleteEntry(trailId: number, entryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${entryId}/trail/${trailId}`);
  }
}
