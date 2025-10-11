import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Constants } from '../../config/constants';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-gamedetail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Header],
  templateUrl: './gamedetail.html',
  styleUrls: ['./gamedetail.scss']
})
export class Gamedetail implements OnInit {
  game: any = null; // เก็บข้อมูลเกม
  gameId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private constants: Constants) { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.http.get(`http://localhost:3000/game/${gameId}`).subscribe({
        next: (res: any) => this.game = res,
        error: (err) => console.error('โหลดรายละเอียดเกมไม่สำเร็จ', err)
      });
    }
  }

  loadGameDetail(id: string) {
    this.http.get<any>(`${this.constants.API_ENDPOINT}/game/${id}`).subscribe({
      next: res => {
        this.game = res; // สมมติ API คืนข้อมูลเกมตรง ๆ
      },
      error: err => {
        console.error('โหลดข้อมูลเกมไม่สำเร็จ', err);
      }
    });
  }
}
