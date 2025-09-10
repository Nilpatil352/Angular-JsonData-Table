import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  rows: any[] = [];
  columns: string[] = [];
  loading = false;
  editingIndex: number | null = null;

  private sub?: Subscription;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.data.load().subscribe({
      next: () => {
        this.loading = false;
        this.rows = this.data.getSnapshot();
        this.columns = this.pickColumns(this.rows);
      },
      error: () => { this.loading = false; }
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  pickColumns(rows: any[]): string[] {
    if (!rows || !rows.length) return [];
    const set = new Set<string>();
    for (let i = 0; i < Math.min(rows.length, 5); i++) {
      Object.keys(rows[i]).forEach(k => set.add(k));
    }
    return Array.from(set);
  }

  openDetails(idx: number) {
    if (this.editingIndex !== null) return;
    this.router.navigate(['/details', idx]);
  }

  startEdit(idx: number, e: Event) {
    e.stopPropagation();
    this.editingIndex = idx;
  }

  cancelEdit(e: Event) {
    e.stopPropagation();
    this.editingIndex = null;
  }

  onCellChange(idx: number, key: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.data.updateCell(idx, key, input.value);
    this.rows = this.data.getSnapshot();
  }

  trackRow(_i: number, row: any) { return row?.id ?? _i; }
}
