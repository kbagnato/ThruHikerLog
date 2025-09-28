import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntry } from '../models/entry';

@Injectable({ providedIn: 'root' })
export class EntryService {
  private baseUrl = 'https://localhost:7225/api/entry';

  constructor(private http: HttpClient) {}

  /** Create an entry */
  createEntry(entry: IEntry): Observable<void> {
    return this.http.post<void>(this.baseUrl, entry);
  }

  /** Get entries for a specific trail */
  getEntryByTrailId(trailId: number): Observable<IEntry[]> {
    return this.http.get<IEntry[]>(this.baseUrl + '/trail/' + trailId);
  }
}
