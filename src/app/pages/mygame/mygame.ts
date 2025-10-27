import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mygame',
  standalone: true,
  imports: [CommonModule, Header, HttpClientModule, RouterModule],
  templateUrl: './mygame.html',
  styleUrls: ['./mygame.scss']
})
export class Mygame implements OnInit {
  purchasedGames: any[] = [];

  constructor(
    private http: HttpClient,
    private constants: Constants,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem("user");
    if (user) {
      const userId = JSON.parse(user).user_id;
      this.loadPurchasedGames(userId);
    }
  }

  loadPurchasedGames(userId: number) {
    this.http.get<any>(`${this.constants.API_ENDPOINT}/transactions/${userId}`)
      .subscribe({
        next: (res) => {
          this.purchasedGames = res.purchases;
        },
        error: (err) => console.error("โหลดข้อมูลเกมที่ซื้อไม่สำเร็จ", err)
      });
  }

  goToGameDetail(gameId: number) {
    this.router.navigate(['/game-detail', gameId]);
  }
}
