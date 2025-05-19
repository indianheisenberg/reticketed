import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  categoryString = signal('');
  router = inject(Router);
  private isFirstLoad = true;
  route = inject(ActivatedRoute);

  // constructor(private route: ActivatedRoute) {
  //   this.route.queryParamMap.subscribe(params => {
  //     const search = params.get('q') ?? '';
  //     const category = params.get('c') ?? '';
  //     this.searchString.set(search);
  //     this.categoryString.set(category);
  //     this.loadTickets(search, category);
  //     setTimeout(() => {
  //       this.router.navigate([], {
  //         queryParams: {},
  //         replaceUrl: true,
  //         queryParamsHandling: '',
  //       });
  //     });
  //   });
  // }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (this.isFirstLoad) {
        const search = params.get('q') ?? '';
        const category = params.get('c') ?? '';

        this.searchString.set(search);
        this.categoryString.set(category);

        this.loadTickets(search, category);

        this.isFirstLoad = false;

        // Remove query params only after first load
        setTimeout(() => {
          this.router.navigate([], {
            queryParams: {},
            replaceUrl: true,
            queryParamsHandling: '',
          });
        });
      } else {
        // Do nothing on subsequent param clears
      }
    });
  }

  loadTickets(search = '', category = '') {
    this.ticketService.getAllActiveTickets().subscribe((tickets: Ticket[]) => {
      this.filteredTickets = tickets.filter(
        ticket =>
          ticket.name.toLowerCase().includes(search.toLowerCase()) &&
          ticket.type.toLowerCase().includes(category.toLowerCase()),
      );
    });
  }

  onSearch(value: string) {
    this.searchString.set(value);
    this.loadTickets(value, this.categoryString());
  }
}
