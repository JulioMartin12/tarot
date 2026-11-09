import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  date: string; // YYYY-MM-DD
  time_slot: string; // HH:mm
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/bookings'; // Ajustar según endpoint de FastAPI

  // Signal para estado de carga
  loading = signal<boolean>(false);

  createBooking(payload: BookingPayload): Observable<any> {
    this.loading.set(true);
    return this.http.post(this.apiUrl, payload);
  }
}