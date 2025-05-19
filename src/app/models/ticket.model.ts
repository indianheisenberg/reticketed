import { EventType } from '../enums/event-type.enum';

export interface Ticket {
  id: number; // Unique ticket ID
  name: string; // Name of the event
  type: EventType;
  description?: string; // Description of the event
  eventDate: Date; // Date of the event
  location: string; // Location of the event (e.g., venue name)

  startTime?: string; // Start time of the event (e.g., "2023-10-01T20:00:00Z")
  endTime?: string; // End time of the event (e.g., "2023-10-01T23:00:00Z")
  duration?: number; // Duration of the event in minutes
  seatsAvailable?: number; // Number of seats available for the event
  holderContact?: string; // Name of the person who owns the ticket
  holderEmail?: string; // Email of the ticket holder
  seatNumber?: string; // Optional seat number (e.g., "A12")
  originalPrice?: number; // Original price of the ticket
  price: number; // Price of the ticket
  currency?: string; // Currency of the ticket price (e.g., "USD", "EUR")
  purchaseDate?: Date; // When the ticket was purchased
  validFrom?: Date; // When the ticket becomes valid
  validTo?: Date; // When the ticket expires (e.g., end of the event)
  isUsed?: boolean; // Has the ticket been used (scanned)?
  qrCodeUrl?: string; // URL to the ticket's QR code image
  status?: 'active' | 'used' | 'expired'; // Status of the ticket
  performerName?: string; // Name of the performer (e.g., artist, band)
  performerBio?: string; // Bio of the performer (optional)
  postedDate: Date; // When the ticket was posted for sale
}
