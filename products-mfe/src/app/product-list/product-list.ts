import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  // cssLoader = inject(StyleLoaderService);

  ngOnInit() {
    // this.cssLoader.loadStyles('styles.css');
  }
}
