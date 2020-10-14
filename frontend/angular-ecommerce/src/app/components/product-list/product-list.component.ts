import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else{
      this.handelListProducts();
    }
  }

  handleSearchProducts(){
    const searchKeyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(searchKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handelListProducts() {
    //check if 'id' parametar is available
    const hasCatagoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCatagoryId) {
      //get the 'id' param string and converte it to number with +
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }

    //get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
