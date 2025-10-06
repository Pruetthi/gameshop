import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  username: string = "";
  status: string = '';
  profileImage: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      this.username = userData.username;
      this.status = userData.status || '';
      this.profileImage = userData.profile_image
        ? userData.profile_image
        : "assets/default-avatar.png";
    }
  }

  goToProfile() {
    this.router.navigate(['/edit-profile']);
  }

  createGame() {
    this.router.navigate(['/creategame']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
