import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-modal',
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent implements OnInit {
  product: any | null = null;
  constructor(public dialogRef: MatDialogRef<CreateEditModalComponent>,private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.product = data;
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  upsertProduct() {
    if (this.product.id) {
      let url = "http://localhost:3000/product/" + this.product.id;
      this.http.put(url, {...this.product})
      .subscribe(ob => {
        this.dialogRef.close();
      })
    } else {
      let url = "http://localhost:3000/product/"
      this.http.post(url, {...this.product})
      .subscribe(ob => {
        this.dialogRef.close();
      })
    }
    this.dialogRef.close();

  }

}
