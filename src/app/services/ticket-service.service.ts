import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketServiceService {
  private http = inject(HttpClient);
  private jsonUrl = 'assets/dummy_tickets_full.json';

  private firestore = inject(Firestore); // Modern inject usage

  getRecentTickets(numberOfTickets: number): Observable<Ticket[]> {
    // return this.http.get<Ticket[]>(this.jsonUrl).pipe(
    //   // Only take the first `numberOfTickets` tickets
    //   map(tickets => tickets.slice(0, numberOfTickets))
    // );

    const ticketsRef = collection(this.firestore, 'tickets');
    const activeTicketsQuery = query(
      ticketsRef,
      where('status', '==', 'active'),
      orderBy('eventDate', 'asc'),
      limit(numberOfTickets),
    );
    return collectionData(activeTicketsQuery, { idField: 'id' }) as Observable<Ticket[]>;

    //  const ticketsRef = collection(this.firestore, 'tickets');
    // return collectionData(ticketsRef, { idField: 'id' }).pipe(
    //   // Only take the first `numberOfTickets` tickets
    //   map(tickets => tickets.slice(0, numberOfTickets))
    // ) as Observable<Ticket[]>;
  }

  saveTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.jsonUrl, ticket).pipe(
      map((response: Ticket) => {
        // Handle the response if needed
        return response;
      }),
    );
  }

  getTickets(): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    return collectionData(ticketsRef, { idField: 'id' }) as Observable<Ticket[]>;
  }

  addTicket(ticket: Ticket) {
    const ticketsRef = collection(this.firestore, 'tickets');
    return addDoc(ticketsRef, ticket);
  }

  setTicket(id: string, ticket: Ticket) {
    const ticketRef = doc(this.firestore, 'tickets', id);
    return setDoc(ticketRef, ticket);
  }

  findTicketBySearch(searchString: string): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    return collectionData(ticketsRef, { idField: 'id' }) as Observable<Ticket[]>;
  }

  getAllActiveTickets(): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    const activeTicketsQuery = query(
      ticketsRef,
      where('status', '==', 'active'),
      orderBy('eventDate', 'asc'),
    );
    return collectionData(activeTicketsQuery, { idField: 'id' }) as Observable<Ticket[]>;
  }

  getTicketsBySearchString(): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    const activeTicketsQuery = query(
      ticketsRef,
      where('name', '>=', new Date()),
      orderBy('eventDate', 'asc'),
    );
    return collectionData(activeTicketsQuery, { idField: 'id' }) as Observable<Ticket[]>;
  }

  getTicketsByUserId(userId: string): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    const activeTicketsQuery = query(
      ticketsRef,
      where('postedBy', '==', userId),
      orderBy('eventDate', 'asc'),
    );
    return collectionData(activeTicketsQuery, { idField: 'id' }) as Observable<Ticket[]>;
  }

  getTicketsByContactedUserId(userId: string): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    const activeTicketsQuery = query(
      ticketsRef,
      where('contactedBy', 'array-contains', userId),
      orderBy('eventDate', 'asc'),
    );
    return collectionData(activeTicketsQuery, { idField: 'id' }) as Observable<Ticket[]>;
  }

  deleteTicket(id: string) {
    const ticketRef = doc(this.firestore, 'tickets', id);
    return deleteDoc(ticketRef);
  }

  markAsSold(id: string) {
    const ticketRef = doc(this.firestore, 'tickets', id);
    return setDoc(ticketRef, { status: 'sold' }, { merge: true });
  }

  updateTicket(id: string, ticket: Ticket) {
    const ticketRef = doc(this.firestore, 'tickets', id);
    return setDoc(ticketRef, ticket, { merge: true });
  }

  loadData(): void {
    this.http.get<Ticket[]>(this.jsonUrl).subscribe({
      next: (tickets: Ticket[]) => {
        this.uploadTicketsSequentially(tickets);
      },
      error: err => {
        console.error('Failed to load data:', err);
      },
    });
  }

  uploadTicketsSequentially(tickets: Ticket[], delayMs = 200): void {
    tickets
      .reduce((promise, ticket, index) => {
        return promise.then(() => {
          this.addTicket(ticket);
          return new Promise(resolve => setTimeout(resolve, delayMs));
        });
      }, Promise.resolve())
      .then(() => {});
  }
}
