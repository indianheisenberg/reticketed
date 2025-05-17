import { EventType } from "../enums/event-type.enum";

export interface Ticket  {
  id: string;                   // Unique ticket ID
  eventId: string;              // Associated event ID
  eventName: string;            // Name of the event
  eventType: EventType;
  eventDescription: string;     // Description of the event
    eventDate: Date;             // Date of the event
    eventLocation: string;      // Location of the event (e.g., venue name)
  eventAddress: string;        // Address of the event (e.g., street, city, state)
  eventCity: string;          // City where the event is held
  eventState: string;         // State where the event is held
  eventCountry: string;       // Country where the event is held
  eventZipCode: string;      // Zip code of the event location
  eventStartTime: string;    // Start time of the event (e.g., "2023-10-01T20:00:00Z")
  eventEndTime: string;      // End time of the event (e.g., "2023-10-01T23:00:00Z")
  eventDuration: number;     // Duration of the event in minutes
  seatsAvailable: number;     // Number of seats available for the event
  holderName: string;          // Name of the person who owns the ticket
  holderEmail: string;         // Email of the ticket holder
  seatNumber?: string;         // Optional seat number (e.g., "A12")
  price: number;               // Price of the ticket
  currency: string;            // Currency of the ticket price (e.g., "USD", "EUR")              
  purchaseDate: Date;          // When the ticket was purchased
  validFrom: Date;             // When the ticket becomes valid
  validTo: Date;               // When the ticket expires (e.g., end of the event)
  isUsed: boolean;             // Has the ticket been used (scanned)?
  qrCodeUrl?: string;          // URL to the ticket's QR code image
  status: 'active' | 'used' | 'expired'; // Status of the ticket
  mediaUrl?: string;           // URL to the ticket's media (e.g., image, video)
  mediaType?: 'image' | 'video'; // Type of the media (optional)
  performerName?: string;      // Name of the performer (e.g., artist, band)
  performerBio?: string;       // Bio of the performer (optional)
}


 