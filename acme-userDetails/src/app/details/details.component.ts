import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  index = -1;
  item: any;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    const snapshot = this.data.getSnapshot();
    if (snapshot.length) {
      this.item = snapshot[this.index];
    } else {
      this.data.getByIndex(this.index).subscribe((v: any) => this.item = v);
    }
  }

  keys(obj: any): string[] { return obj ? Object.keys(obj) : []; }

  isObject(val: any): boolean {
    return val !== null && typeof val === 'object';
  }
}
