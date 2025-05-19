import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import emailjs from 'emailjs-com';
import { from, Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private http = inject(HttpClient);

  sendSellerContactEmail(user: User, ticket: Ticket): Observable<any> {
    const templateParams = {
      user_email: user.email,
      user_name: user.displayName,
      ticket_name: ticket.name,
      seller_mob: ticket.holderContact,
      seller_email: ticket.holderEmail,
    };
    return from(
      emailjs.send('service_wv082dx', 'template_cb7w428', templateParams, 'sCLOBKdHCNaQpXWHb'),
    );

    // return this.http.post('/api/send-seller-contact', {
    //   to: userEmail,
    //   ticketId: ticket.id,
    //   ticketName: ticket.name,
    //   sellerEmail: 'seller@example.com' // Replace with real seller data
    // });
  }
}
