import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventType } from '../../enums/event-type.enum';
import { TicketServiceService } from '../../services/ticket-service.service';

@Component({
  selector: 'app-sell-ticket',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sell-ticket.component.html',
  styleUrl: './sell-ticket.component.scss'
})
export class SellTicketComponent {

  ticketService = inject(TicketServiceService);

  fb = inject(FormBuilder);
  eventTypes = Object.values(EventType);


  ticketForm: FormGroup = this.fb.group({
    id: [Date.now()],  // auto-generate
    name: ['', Validators.required],
    type: [EventType.Movie, Validators.required],
    description: [''],
    eventDate: ['', Validators.required],
    location: ['', Validators.required],
    address: [''],
    city: [''],
    state: [''],
    country: [''],
    postalCode: [''],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    duration: [''],
    seatsAvailable: ['', [Validators.min(1),Validators.required]],
    holderContact: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
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
    mediaUrl: [''],
    mediaType: ['image'],
    performerName: [''],
    performerBio: [''],
    postedDate: [new Date()]
  });

  submit() {
    console.log('Form Submitted:', this.ticketForm.value);

  

    if (this.ticketForm.valid) {
      const ticket = this.ticketForm.value;
      console.log('Ticket Submitted:', ticket);
      this.ticketService.addTicket(ticket);
      // send to backend or service here
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }

}
