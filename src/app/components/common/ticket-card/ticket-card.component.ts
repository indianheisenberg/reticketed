import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventTypeIcons } from '../../../enums/event-type-icons';
import { Ticket } from '../../../models/ticket.model';
import { AuthService } from '../../../services/auth.service';
import { EmailService } from '../../../services/email.service';
import { TicketServiceService } from '../../../services/ticket-service.service';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss',
})
export class TicketCardComponent {
  @Input() event!: Ticket;

  eventTypeIcons = EventTypeIcons;
  user$!: Observable<any>; // will be initialized in constructor

  showMore = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    private ticketService: TicketServiceService,
  ) {
    this.user$ = toObservable(this.authService.user);
  }

  toggleMore() {
    this.showMore = !this.showMore;
  }

  onGetSellerContact(user: any) {
    if (!user) {
      this.router.navigate(['/login'], { queryParams: { redirectTo: this.router.url } });
      return;
    }

    if (this.event.contactedBy?.includes(user.uid)) {
      this.snackBar.open('You have already contacted the seller', 'Close', { duration: 3000 });
      return;
    }

    const updatedTicket = {
      ...this.event,
      contactedBy: [...(this.event.contactedBy || []), user.uid],
    };

    this.ticketService.setTicket(String(this.event.id), updatedTicket);

    this.emailService.sendSellerContactEmail(user, this.event).subscribe({
      next: () =>
        this.snackBar.open('Seller contact sent to your email', 'Close', { duration: 3000 }),
      error: () =>
        this.snackBar.open('Failed to send email. Try again later.', 'Close', { duration: 3000 }),
    });
  }

  postedByUser(user: any): boolean {
    return this.event.postedBy === user?.uid;
  }

  contactedByUser(user: any): boolean {
    return this.event.contactedBy?.includes(user?.uid) ?? false;
  }
}
