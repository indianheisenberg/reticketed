import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { TicketServiceService } from '../../services/ticket-service.service';
import { TicketCardComponent } from '../common/ticket-card/ticket-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatTabsModule, CommonModule, MatListModule, TicketCardComponent, TicketCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private ticketService = inject(TicketServiceService);

  user: any;
  ticketsPosted: Ticket[] = [];
  ticketsContacted: Ticket[] = [];

  ngOnInit() {
    this.user = this.authService.user(); // assuming this is synchronous. If it's a signal/computed, use a value.
    const uid = this.user?.uid;
    if (!uid) return;

    this.ticketService.getTicketsByUserId(uid).subscribe(tickets => {
      this.ticketsPosted = tickets;
    });

    this.ticketService.getTicketsByContactedUserId(uid).subscribe(tickets => {
      this.ticketsContacted = tickets;
    });
  }

  logout() {
    this.authService.logout();
  }

  trackById(index: number, item: Ticket): string {
    return String(item.id);
  }

  loadData() {
    this.ticketService.loadData();
  }
}
