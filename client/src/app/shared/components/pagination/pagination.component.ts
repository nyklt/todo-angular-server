import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() data: {page?, pages?, count?, pageSize?} = {page: 1, pages: 0, count: 0, pageSize: 25};
  @Input() disabled = false;

  @Output() changePage = new EventEmitter<number>();
  @Output() changeSize = new EventEmitter<number>();

  public pageSizes = new Set([25, 50, 75, 100]);

  constructor() { }

  ngOnInit() { }

  onPageChange(page: number) {
    if (+page === this.data.page) {
      return;
    }

    if (page <= 1) {
      this.changePage.emit(1);
    } else {
      this.changePage.emit(Math.min(page, this.data.pages));
    }
  }

}
