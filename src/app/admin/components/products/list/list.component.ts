import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProduct } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  constructor(spinner: NgxSpinnerService, private productService : ProductService, private alertify: AlertifyService) { 
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'unitInStock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<ListProduct> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallScaleRippleMultiple);
    const allProducts: {totalCount : number, products: ListProduct[]} = await this.productService.read( this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallScaleRippleMultiple), errorMessage => this.alertify.message(errorMessage,{
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<ListProduct>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit(){
    await this.getProducts();
  }
  
}
