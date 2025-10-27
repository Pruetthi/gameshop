import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Header } from '../../components/header/header';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditDiscountDialog } from '../../components/edit-discount-dialog/edit-discount-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-all-discounts',
  standalone: true,
  imports: [CommonModule, HttpClientModule, Header, MatButtonModule],
  templateUrl: './all-discounts.html',
  styleUrl: './all-discounts.scss'
})
export class AllDiscounts implements OnInit {
  discounts: any[] = [];

  constructor(private http: HttpClient, private constants: Constants,
    private router: Router, private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadDiscounts();
  }

  loadDiscounts() {
    this.http.get(`${this.constants.API_ENDPOINT}/discounts`).subscribe({
      next: (res: any) => {
        this.discounts = res;
      },
      error: (err) => {
        console.error('Error loading discounts:', err);
      }
    });
  }

  editDiscount(d: any) {
    const dialogRef = this.dialog.open(EditDiscountDialog, {
      width: '400px',
      data: { ...d }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.http.put(`${this.constants.API_ENDPOINT}/discounts/${d.discount_code}`, result)
        .subscribe({
          next: () => {
            alert('แก้ไขสำเร็จ!');
            this.loadDiscounts();
          },
          error: (err) => {
            console.error(err);
            alert('เกิดข้อผิดพลาดในการอัปเดท');
          }
        });
    });
  }

  deleteDiscount(code: string) {
    if (confirm('ต้องการลบโค้ดนี้หรือไม่?')) {
      this.http.delete(`${this.constants.API_ENDPOINT}/discounts/${code}`).subscribe({
        next: () => {
          alert('ลบโค้ดสำเร็จ');
          this.loadDiscounts();
        },
        error: err => console.error(err)
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
