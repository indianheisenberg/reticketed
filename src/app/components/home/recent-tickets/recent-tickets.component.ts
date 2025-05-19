import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TicketServiceService } from '../../../services/ticket-service.service';
import { TicketCardComponent } from '../../common/ticket-card/ticket-card.component';

@Component({
  selector: 'app-recent-tickets',
  imports: [TicketCardComponent, CommonModule],
  templateUrl: './recent-tickets.component.html',
  styleUrl: './recent-tickets.component.scss',
})
export class RecentTicketsComponent {
  private eventService = inject(TicketServiceService);
  events = this.eventService.getRecentTickets(4);
}
