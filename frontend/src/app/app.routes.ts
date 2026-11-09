import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DailyPostEditorComponent } from './pages/admin/daily-post-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin/post', component: DailyPostEditorComponent },
  { path: '**', redirectTo: '' }
];