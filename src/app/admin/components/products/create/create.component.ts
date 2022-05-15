import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,  private productService: ProductService, private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }
  @Output() createdProduct : EventEmitter<CreateProduct> = new EventEmitter

  create(productName: HTMLInputElement, unitInStock: HTMLInputElement, price: HTMLInputElement){
    this.showSpinner(SpinnerType.pacman);
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.ProductName = productName.value;
    createProduct.UnitInStock = parseInt(unitInStock.value);
    createProduct.Price = parseFloat(price.value);

    this.productService.create(createProduct, () => {
      this.hideSpinner(SpinnerType.pacman);
      this.alertify.message("Successful", {
        dismissOthers:true,
        messageType: MessageType.Success,
        position:Position.TopRight
      });
      this.createdProduct.emit(createProduct);
    }, errorMessage => {
        this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }

}
