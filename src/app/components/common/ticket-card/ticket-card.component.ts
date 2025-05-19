import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventTypeIcons } from '../../../enums/event-type-icons';
import { EventType } from '../../../enums/event-type.enum';
import { Ticket } from '../../../models/ticket.model';
import { AuthService } from '../../../services/auth.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss',
})
export class TicketCardComponent {
  eventTypeIcons = EventTypeIcons;

  authService = inject(AuthService);
  private router = inject(Router);
  private emailService = inject(EmailService);
  private snackBar = inject(MatSnackBar);

  event = input<Ticket>({
    id: 1,
    name: 'Avengers: Endgame',
    description: 'A superhero movie event.',
    location: 'PVR Cinemas, Mumbai',
    eventDate: new Date('2025-05-20'),
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    price: 450,
    originalPrice: 600,
    currency: 'INR',
    seatsAvailable: 3,
    postedDate: new Date('2025-05-01'),
    type: EventType.Movie,
  });
  showMore: boolean = true;

  toggleMore() {
    this.showMore = !this.showMore;
  }

  onGetSellerContact() {
    const user = this.authService.getUser(); // or this.authService.userSignal()

    if (!user) {
      this.router.navigate(['/login'], { queryParams: { redirectTo: this.router.url } });
      return;
    }

    this.emailService.sendSellerContactEmail(user, this.event()).subscribe({
      next: () =>
        this.snackBar.open('Seller contact sent to your email', 'Close', { duration: 3000 }),
      error: () =>
        this.snackBar.open('Failed to send email. Try again later.', 'Close', { duration: 3000 }),
    });
  }
}
