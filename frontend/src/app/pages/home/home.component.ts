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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  post = signal<DailyPost | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<DailyPost>('/api/v1/posts/daily').subscribe({
      next: (data) => this.post.set(data),
      error: () => {
        // Fallback elegante con contenido astrológico profesional
        this.post.set({
          title: "Luna Nueva en Escorpio: Profundidad y Renacimiento Emocional",
          description: "La lunación de hoy nos invita a descender a nuestras aguas internas más genuinas. Es un momento propicio para soltar dinámicas vinculares obsoletas y conectar con nuestro poder personal genuino. En la carta natal, este tránsito activa zonas de transformación profunda que pedirán honestidad radical con nosotros mismos.",
          image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
          created_at: new Date().toISOString()
        });
      }
    });
  }
}