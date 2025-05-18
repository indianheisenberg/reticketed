import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { addDoc, collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  private http = inject(HttpClient);
  private jsonUrl = 'assets/events.json';

   private firestore = inject(Firestore); // Modern inject usage

  getRecentTickets(numberOfTickets: number): Observable<Ticket[]> {

    return this.http.get<Ticket[]>(this.jsonUrl).pipe(
      // Only take the first `numberOfTickets` tickets
      map(tickets => tickets.slice(0, numberOfTickets))
    );

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
      })
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
}
