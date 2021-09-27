import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditModalComponent } from './create-edit-modal/create-edit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-desafio-alest';
  products: any = [];
  search: string | null = null;
  constructor (private http: HttpClient, public dialog: MatDialog) {
    this.loadProductList()
  }

  openDialog(product?: any): void {
    const dialogRef = this.dialog.open(CreateEditModalComponent, {
      width: '250px',
      data: {...product}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadProductList();
    });
  }

  loadProductList() {
    let url = "http://localhost:3000/product/list";
    if (this.search) {
      url += "?search=" + this.search;
    }
    this.http.get(url)
    .subscribe(ob => {
      console.log(ob);
      this.products = ob;
    })
  }

  deleteProduct(product: any) {
    debugger;
    let url = "http://localhost:3000/product/" + product.id;
    this.http.delete(url)
    .subscribe(ob => {
      console.log(ob);
      this.loadProductList();
    })
  }
}
