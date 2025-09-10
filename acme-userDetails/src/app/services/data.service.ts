import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

const DATA_URL = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';

@Injectable({ providedIn: 'root' })
export class DataService {
  private _rows$ = new BehaviorSubject<any[]>([]);
  rows$ = this._rows$.asObservable();

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get<any[]>(DATA_URL).pipe(
      tap(data => this._rows$.next(Array.isArray(data) ? data : []))
    );
  }

  getSnapshot(): any[] { return this._rows$.getValue(); }

  getByIndex(index: number) {
    const current = this.getSnapshot();
    if (current.length) return current[index];
    return this.load().pipe(map(list => list[index]));
  }

  updateCell(index: number, key: string, value: any) {
    const copy = this.getSnapshot().slice();
    if (!copy[index]) return;
    copy[index] = { ...copy[index], [key]: value };
    this._rows$.next(copy);
  }
}
