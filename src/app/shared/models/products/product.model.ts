export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;

  constructor(data: any = {}) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.imageUrl = data.imageUrl;
  }
}
