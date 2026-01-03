import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  standalone: false
})
export class GridComponent implements OnChanges {
  @Input() columns: Array<{ key: string, label: string, type?: string }> = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() actions: Array<{ key: string, icon: string, label: string, class?: string }> = [];
  @Output() action = new EventEmitter<{ key: string, row: any }>();

  pagedData: any[] = [];
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;

  sortKey: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges(changes: SimpleChanges): void {
    // Sempre que data mudar, resetar para página 1
    if (changes['data']) {
      this.currentPage = 1;
      this.applyPagination();
    }
  }

  applyPagination(): void {
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.data.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  isSortable(col: any): boolean {
    return !col.type || col.type === 'text' || col.type === 'date';
  }

  sortBy(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const valA = a[key] ?? '';
      const valB = b[key] ?? '';

      if (this.columns.find(c => c.key === key)?.type === 'date') {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      return this.sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB), 'pt-BR', { numeric: true })
        : String(valB).localeCompare(String(valA), 'pt-BR', { numeric: true });
    });

    this.applyPagination();
  }

  // Métodos auxiliares originais
  getCellValue(row: any, col: any) {
    if (col.type === 'array') {
      return Array.isArray(row[col.key]) ? row[col.key].join(', ') : row[col.key];
    }
    if (col.type === 'phone') {
      const valor = row[col.key] || '';
      const digits = valor.replace(/\D/g, '');
      if (digits.length === 11) return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      if (digits.length === 10) return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      return valor;
    }
    if (col.type === 'status') {
      return row[col.key] === 1 ? 'Ativo' : 'Inativo';
    }
    if (col.type === 'date') {
      const value = row[col.key];
      if (!value) return '';
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;
      return date.toLocaleDateString('pt-BR');
    }
    return row[col.key];
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  onAction(key: string, row: any) {
    this.action.emit({ key, row });
  }
}
