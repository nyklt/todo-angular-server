export class Product {
  _id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  metaPagination?: MetaPagination;

  constructor(data: any = {}) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.imageUrl = data.imageUrl;
    this.metaPagination = data.pagination;
  }
}


export interface MetaPagination {
  page: number;
  pages: number;
  count: number;
  pageSize: number;
}


// export interface ProductResponseInterface {
//   _id?: number;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
//
// }
//
//
// export class Product {
//   _id?: number;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
//
//
//   constructor(data?: ProductResponseInterface) {
//
//     if (!data) {
//       return;
//     }
//
//     this._id = data._id;
//     this.name = data.name;
//     this.description = data.description;
//     this.price = data.price;
//     this.quantity = data.quantity;
//     this.imageUrl = data.imageUrl;
//   }
//
// }
