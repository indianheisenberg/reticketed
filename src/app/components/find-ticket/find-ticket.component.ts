import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { TicketServiceService } from '../../services/ticket-service.service';
import { SearchBarComponent } from '../common/search-bar/search-bar.component';
import { TicketCardComponent } from '../common/ticket-card/ticket-card.component';
@Component({
  selector: 'app-find-ticket',
  imports: [SearchBarComponent, CommonModule, TicketCardComponent, MatPaginatorModule],
  templateUrl: './find-ticket.component.html',
  styleUrl: './find-ticket.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FindTicketComponent implements OnInit {
  searchString = signal('mission');
  ticketService = inject(TicketServiceService);
  filteredTickets: Ticket[] = [];
  categoryString = signal('');
  router = inject(Router);
  private isFirstLoad = true;
  route = inject(ActivatedRoute);

  currentPage = 1;
  pageSize = 6; // adjust as needed
  totalPages = 1;
  paginatedTickets: Ticket[] = [];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('q') ?? '';
      const category = params.get('c') ?? '';

      if (this.isFirstLoad) {
        this.loadTickets(search, category);
        this.categoryString.set(category);
        this.searchString.set(search);
        this.isFirstLoad = false;

        // Optional: Clear query params
        setTimeout(() => {
          this.router.navigate([], {
            queryParams: {},
            replaceUrl: true,
            queryParamsHandling: '',
          });
        });
      }
    });
  }

  // loadTickets(search = '', category = '') {
  //   this.ticketService.getAllActiveTickets().subscribe((tickets: Ticket[]) => {
  //     this.filteredTickets = tickets.filter(
  //       ticket =>
  //         ticket.name.toLowerCase().includes(search.toLowerCase()) &&
  //         ticket.type.toLowerCase().includes(category.toLowerCase()),
  //     );
  //   });
  // }

  onSearch(value: string) {
    this.searchString.set(value);
    this.loadTickets(value, this.categoryString());
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateTickets();
  }

  paginateTickets() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTickets = this.filteredTickets.slice(start, end);
  }

  loadTickets(search = '', category = '') {
    this.ticketService.getAllActiveTickets().subscribe((tickets: Ticket[]) => {
      this.filteredTickets = tickets.filter(
        ticket =>
          ticket.name.toLowerCase().includes(search.toLowerCase()) &&
          ticket.type.toLowerCase().includes(category.toLowerCase()),
      );
      this.totalPages = Math.ceil(this.filteredTickets.length / this.pageSize);
      this.currentPage = 1;
      this.paginateTickets();
    });
  }
}
