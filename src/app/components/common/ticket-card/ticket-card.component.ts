import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventTypeIcons } from '../../../enums/event-type-icons';
import { EventType } from '../../../enums/event-type.enum';
import { Ticket } from '../../../models/ticket.model';
import { AuthService } from '../../../services/auth.service';
import { EmailService } from '../../../services/email.service';
import { TicketServiceService } from '../../../services/ticket-service.service';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss',
})
export class TicketCardComponent {
  @Input() event!: Ticket;
  @Input() showContactSellerButton = true;
  @Input() showDeleteButton = true;
  @Input() showMarkAsSoldButton = true;
  @Input() showUpdateButton = true;
  @Input() showPostedBy = true;
  @Input() showContactedBy = true;
  @Input() showTicketIsSold = true;

  eventTypeIcons = EventTypeIcons;
  user$!: Observable<any>; // will be initialized in constructor
  @ViewChild('ticketDetailsTemplate') ticketDetailsTemplate!: TemplateRef<{ event: Ticket }>;

  showMore = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    private ticketService: TicketServiceService,
    private dialog: MatDialog,
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

  onDeleteTicket() {
    this.ticketService.deleteTicket(String(this.event.id)).then(() => {
      this.snackBar.open('Ticket deleted successfully', 'Close', { duration: 3000 });
    });
  }

  onMarkAsSold() {
    this.ticketService.markAsSold(String(this.event.id)).then(() => {
      this.snackBar.open('Ticket marked as sold successfully', 'Close', { duration: 3000 });
    });
  }

  onUpdateTicket() {
    this.ticketService.updateTicket(String(this.event.id), this.event).then(() => {
      this.snackBar.open('Ticket updated successfully', 'Close', { duration: 3000 });
    });
  }

  showTicketDetails() {
    this.dialog.open(GenericDialogComponent, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      data: {
        title: this.event.name,
        template: this.ticketDetailsTemplate,
        templateContext: { event: this.event },
        actions: [{ label: 'Close', action: 'close', color: 'secondary' }],
      },
    });
  }

  isValidEventType(type: any): type is EventType {
    return Object.values(EventType).includes(type as EventType);
  }

  getEventTypeIcon(type: any): string {
    return this.isValidEventType(type)
      ? this.eventTypeIcons[type]
      : this.eventTypeIcons[EventType.Other];
  }
}
