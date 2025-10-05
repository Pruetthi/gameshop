import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Constants } from '../../config/constants';
@Component({
  selector: 'app-editprofile',
  imports: [FormsModule],
  templateUrl: './editprofile.html',
  styleUrl: './editprofile.scss'
})
export class Editprofile {
  user: any = {};
  selectedFile: File | null = null;
  message: string = "";
  messageColor: string = "red";
  constructor(private constants: Constants) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onUpdate(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", this.user.username);
    formData.append("email", this.user.email);
    formData.append("phone_number", this.user.phone_number || "");
    formData.append("password", (document.getElementById("password") as HTMLInputElement).value);

    if (this.selectedFile) {
      formData.append("profile_image", this.selectedFile);
    }

    try {
      const res = await fetch(`${this.constants.API_ENDPOINT}/edit-profile/${this.user.user_id}`, {
        method: "PUT",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        this.message = "แก้ไขโปรไฟล์สำเร็จ!";
        this.messageColor = "green";
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        this.message = data.message || "มีข้อผิดพลาด";
        this.messageColor = "red";
      }
    } catch (error) {
      this.message = "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้";
      this.messageColor = "red";
      console.error(error);
    }
  }
}
