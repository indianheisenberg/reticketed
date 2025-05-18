import { Component, input, signal } from '@angular/core';
import { Ticket } from '../../../models/ticket.model';
import { EventType } from '../../../enums/event-type.enum';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventTypeIcons } from '../../../enums/event-type-icons';



@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule, MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {

  eventTypeIcons = EventTypeIcons;

  event = input<Ticket>({
    id: 1,
    name: 'Avengers: Endgame',
    description: 'A superhero movie event.',
    mediaUrl: 'assets/Avengers_Endgame.jpg',
    location: 'PVR Cinemas, Mumbai',
    address: '123 Main St, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    postalCode: '400001',
    eventDate: new Date('2025-05-20'),
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    price: 450,
    originalPrice: 600,
    currency: 'INR',
    seatsAvailable: 3,
    postedDate: new Date('2025-05-01'),
    type: EventType.Movie
  });
  showMore: boolean = true;

  toggleMore() {
    this.showMore = !this.showMore;
  }
}
