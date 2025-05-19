import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { TicketServiceService } from '../../services/ticket-service.service';
import { SearchBarComponent } from '../common/search-bar/search-bar.component';
import { TicketCardComponent } from '../common/ticket-card/ticket-card.component';
@Component({
  selector: 'app-find-ticket',
  imports: [SearchBarComponent, CommonModule, TicketCardComponent],
  templateUrl: './find-ticket.component.html',
  styleUrl: './find-ticket.component.scss',
})
export class FindTicketComponent implements OnInit {
  searchString = signal('mission');
  ticketService = inject(TicketServiceService);
  filteredTickets: Ticket[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('q') ?? '';
      this.searchString.set(search);
      this.loadTickets(search);
    });
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(search = '') {
    this.ticketService.getAllActiveTickets().subscribe((tickets: Ticket[]) => {
      this.filteredTickets = tickets.filter(ticket =>
        ticket.name.toLowerCase().includes(search.toLowerCase()),
      );
    });
  }

  onSearch(value: string) {
    this.searchString.set(value);
    this.loadTickets(value);
  }
}
