import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventType } from '../../enums/event-type.enum';
import { AuthService } from '../../services/auth.service';
import { TicketServiceService } from '../../services/ticket-service.service';

@Component({
  selector: 'app-sell-ticket',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './sell-ticket.component.html',
  styleUrl: './sell-ticket.component.scss',
})
export class SellTicketComponent {
  ticketService = inject(TicketServiceService);

  fb = inject(FormBuilder);
  eventTypes = Object.values(EventType);
  router = inject(Router);
  private snackBar = inject(MatSnackBar);
  authService = inject(AuthService);
  user = this.authService.user();

  ticketForm: FormGroup = this.fb.group({
    id: [Date.now()], // auto-generate
    name: ['', Validators.required],
    type: [EventType.Movie, Validators.required],
    description: [''],
    eventDate: ['', Validators.required],
    location: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    duration: [''],
    seatsAvailable: ['', [Validators.min(1), Validators.required]],
    holderContact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    holderEmail: ['', [Validators.email, Validators.required]],
    seatNumber: [''],
    originalPrice: ['', [Validators.required, Validators.min(0)]],
    price: ['', [Validators.required, Validators.min(0)]],
    currency: ['INR'],
    purchaseDate: [''],
    validFrom: [''],
    validTo: [''],
    isUsed: [false],
    qrCodeUrl: [''],
    status: ['active'],
    performerName: [''],
    performerBio: [''],
    postedDate: [new Date()],
    postedBy: [this.user?.uid ?? null],
  });

  submit() {
    if (this.ticketForm.valid) {
      const ticket = this.ticketForm.value;
      this.ticketService
        .addTicket(ticket)
        .then(() => {
          this.snackBar.open('Your ticket has been uploaded', 'Close', { duration: 3000 });
          this.ticketForm.reset();
        })
        .catch(() =>
          this.snackBar.open('Failed to upload. Try again later.', 'Close', { duration: 3000 }),
        );

      // send to backend or service here
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }
}
