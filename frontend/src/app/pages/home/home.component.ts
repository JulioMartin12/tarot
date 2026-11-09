import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface DailyPost {
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-mysticDark text-mysticGoldLight p-6 flex flex-col items-center justify-between">
      <!-- Header Místico -->
      <header class="text-center my-8">
        <h1 class="text-4xl font-serif text-mysticGold tracking-widest uppercase">Oráculo & Tarot</h1>
        <p class="text-mysticText text-sm mt-2 tracking-wide">Alineación astral, constelaciones y destino diario</p>
      </header>

      <!-- Main Card: Publicación del Día -->
      <main class="max-w-2xl w-full bg-mysticCard border border-mysticBorder rounded-2xl p-6 sm:p-8 shadow-2xl mb-12">
        <div *ngIf="post(); else loading">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xs uppercase tracking-widest text-mysticGold border border-mysticBorder px-3 py-1 rounded-full bg-mysticDark">
              Lectura del Día
            </span>
            <span class="text-xs text-mysticText">{{ post()?.created_at | date:'dd/MM/yyyy' }}</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-serif text-mysticGold mb-4 leading-snug">
            {{ post()?.title }}
          </h2>

          <div class="overflow-hidden rounded-xl mb-6 border border-mysticBorder shadow-inner">
            <img [src]="post()?.image_url" alt="Constelación del día" class="w-full h-72 object-cover hover:scale-105 transition-transform duration-700">
          </div>

          <p class="text-mysticText leading-relaxed whitespace-pre-line font-sans text-sm sm:text-base">
            {{ post()?.description }}
          </p>
        </div>

        <ng-template #loading>
          <div class="py-16 text-center">
            <p class="text-mysticText animate-pulse font-serif text-lg">Consultando las estrellas y constelaciones...</p>
          </div>
        </ng-template>

        <!-- CTA de Reservas -->
        <div class="mt-10 text-center border-t border-mysticBorder pt-6">
          <p class="text-mysticText text-sm mb-4">¿Deseas una lectura personalizada de cartas natales o tarot?</p>
          <a routerLink="/booking" class="inline-block bg-mysticGold hover:bg-[#b8952d] text-mysticDark font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg tracking-wide uppercase text-sm">
            Reservar mi Turno (Seña Mercado Pago)
          </a>
        </div>
      </main>

      <!-- Footer -->
      <footer class="text-center text-xs text-mysticText pb-4">
        &copy; 2026 Oráculo & Tarot. Todos los derechos reservados.
      </footer>
    </div>
  `
})
export class HomeComponent implements OnInit {
  post = signal<DailyPost | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Consumimos el endpoint de la publicación diaria del backend
    this.http.get<DailyPost>('/api/v1/posts/daily').subscribe({
      next: (data) => this.post.set(data),
      error: () => {
        // Fallback visual si el backend aún no está corriendo
        this.post.set({
          title: "Conjunción de la Luna y los Tránsitos Estelares",
          description: "Hoy las energías del cosmos favorecen la introspección profunda y la claridad en las decisiones del alma. Las constelaciones abren portales de transformación que nos invitan a soltar viejos patrones.",
          image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
          created_at: new Date().toISOString()
        });
      }
    });
  }
}