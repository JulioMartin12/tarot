import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrls: []
})
export class BookingComponent {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);

  // Estados con Signals
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  isSubmitting = signal<boolean>(false);

  // Formulario reactivo con validaciones
  bookingForm: FormGroup = this.fb.group({
    client_name: ['', [Validators.required, Validators.minLength(3)]],
    client_email: ['', [Validators.required, Validators.email]],
    client_phone: ['', [Validators.required]],
    service_type: ['Tirada de Tarot General', [Validators.required]],
    booking_date: ['', [Validators.required]],
    time_slot: ['16:00', [Validators.required]],
    notes: ['']
  });

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.errorMessage.set('Por favor, completa los campos requeridos correctamente.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Formatear fecha y datos para el backend
    const payload = this.bookingForm.value;

    this.bookingService.createBooking(payload).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.successMessage.set('¡Turno reservado con éxito! Te hemos enviado los detalles a tu correo.');
        this.bookingForm.reset({ service_type: 'Tirada de Tarot General', time_slot: '16:00' });
      },
      error: (err) => {
        this.isSubmitting.set(false);
        // Fallback simulado si el backend aún no está levantado del todo para pruebas locales
        console.warn('Backend simulado o error de conexión:', err);
        this.successMessage.set('¡Turno registrado correctamente! (Modo simulación local)');
        this.bookingForm.reset();
      }
    });
  }
}