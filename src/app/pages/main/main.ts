import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Constants } from '../../config/constants';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Main implements OnInit {
  username: string = "";
  status: string = '';
  profileImage: string = "";

  constructor(private router: Router, private constants: Constants) { }

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

  goToEditProfile() {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      this.router.navigate(['/edit-profile'], { state: { user: userData } });
    }
  }

  logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
}
