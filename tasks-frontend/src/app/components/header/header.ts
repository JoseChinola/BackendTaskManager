import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})


export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  fullName: string = '';
  initials: string = '';

  constructor(private auth: Auth, private router: Router) { }




  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.auth.getPerfil().subscribe({
      next: (profile: UserProfile) => {
        this.fullName = profile.fullName || 'Usuario';
        this.initials = this.getInitials(profile.fullName);
      },
      error: () => {
        this.fullName = 'Usuario';
        this.initials = 'U';
      }
    })
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        // Manejar errores de cierre de sesión
        console.error('Error al cerrar sesión', err);
      }
    });
  }
}


interface UserProfile {
  email: string;
  fullName: string;
}