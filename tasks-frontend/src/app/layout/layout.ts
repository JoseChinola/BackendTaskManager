import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from "../components/header/header";
import { Asidebar } from "../components/asidebar/asidebar";
import { Footer } from "../components/footer/footer";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Asidebar, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})

export class Layout {
  sidebarOpen = true;
  isDesktop = window.innerWidth >= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = (event.target as Window).innerWidth >= 768;
    if (this.isDesktop) {
      this.sidebarOpen = true; // Siempre mostrar en desktop
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
