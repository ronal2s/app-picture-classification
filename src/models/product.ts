type Product = {
  id: string;
  // userId: string;
  picture: string;
  name: string;
  brand?: string;
  description?: string;
  quantity: string;
  receiptUrl?: string;
  receiptName?: string;
  archived?: boolean;
  price: string;
};

export default Product;
