import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-daily-post-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-mysticDark text-mysticGoldLight p-6 flex flex-col items-center justify-center">
      <div class="max-w-xl w-full bg-mysticCard border border-mysticBorder rounded-2xl p-8 shadow-2xl">
        
        <header class="mb-6 text-center">
          <span class="text-xs uppercase tracking-widest text-mysticGold border border-mysticBorder px-3 py-1 rounded-full bg-mysticDark">
            Panel de Control del Oráculo
          </span>
          <h2 class="text-2xl sm:text-3xl font-serif text-mysticGold mt-3">Nueva Publicación Astral</h2>
          <p class="text-mysticText text-sm mt-1">Comparte la energía y las constelaciones del día</p>
        </header>

        <form (ngSubmit)="savePost()" class="space-y-5">
          <!-- Título -->
          <div>
            <label class="block text-xs uppercase tracking-wider text-mysticText mb-2">Título de la Publicación</label>
            <input 
              type="text" 
              [(ngModel)]="title" 
              name="title" 
              placeholder="Ej: Tránsito de Mercurio en Sagitario"
              required
              class="w-full bg-mysticDark border border-mysticBorder rounded-xl p-3 text-mysticGoldLight focus:outline-none focus:border-mysticGold transition-colors"
            >
          </div>

          <!-- URL de Imagen -->
          <div>
            <label class="block text-xs uppercase tracking-wider text-mysticText mb-2">URL Externa de la Imagen</label>
            <input 
              type="url" 
              [(ngModel)]="imageUrl" 
              name="imageUrl" 
              placeholder="https://ejemplo.com/imagen-astral.jpg"
              required
              class="w-full bg-mysticDark border border-mysticBorder rounded-xl p-3 text-mysticGoldLight focus:outline-none focus:border-mysticGold transition-colors"
            >
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-xs uppercase tracking-wider text-mysticText mb-2">Mensaje / Descripción</label>
            <textarea 
              [(ngModel)]="description" 
              name="description" 
              rows="6" 
              placeholder="Escribe la guía astral, constelaciones y reflexiones del día..."
              required
              class="w-full bg-mysticDark border border-mysticBorder rounded-xl p-3 text-mysticGoldLight focus:outline-none focus:border-mysticGold transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Mensaje de Estado -->
          <div *ngIf="message()" class="p-3 rounded-lg text-sm text-center" [ngClass]="isSuccess() ? 'bg-green-900/40 text-green-300 border border-green-700' : 'bg-red-900/40 text-red-300 border border-red-700'">
            {{ message() }}
          </div>

          <!-- Botón de Envío -->
          <button 
            type="submit" 
            [disabled]="isLoading()"
            class="w-full bg-mysticGold hover:bg-[#b8952d] text-mysticDark font-bold py-3.5 px-6 rounded-full transition-all duration-300 shadow-lg tracking-wide uppercase text-sm disabled:opacity-50"
          >
            {{ isLoading() ? 'Publicando en las estrellas...' : 'Actualizar Publicación Diaria' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <a routerLink="/" class="text-xs text-mysticText hover:text-mysticGold transition-colors underline">
            &larr; Volver a la página principal
          </a>
        </div>

      </div>
    </div>
  `
})
export class DailyPostEditorComponent {
  title = '';
  imageUrl = '';
  description = '';
  
  isLoading = signal(false);
  message = signal('');
  isSuccess = signal(false);

  constructor(private http: HttpClient) {}

  savePost() {
    if (!this.title || !this.imageUrl || !this.description) {
      this.isSuccess.set(false);
      this.message.set('Por favor completa todos los campos.');
      return;
    }

    this.isLoading.set(true);
    this.message.set('');

    const payload = {
      title: this.title,
      image_url: this.imageUrl,
      description: this.description
    };

    // Envío al endpoint protegido del backend
    this.http.post('/api/v1/posts/daily', payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isSuccess.set(true);
        this.message.set('¡Publicación actualizada con éxito en el oráculo!');
        this.title = '';
        this.imageUrl = '';
        this.description = '';
      },
      error: (err) => {
        this.isLoading.set(false);
        this.isSuccess.set(false);
        this.message.set(err.error?.detail || 'Error al conectar con el servidor.');
      }
    });
  }
}