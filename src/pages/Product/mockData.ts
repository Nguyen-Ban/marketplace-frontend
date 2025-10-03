import type { Product } from "../../services/productService";
import popmart from "../../assets/popmart.jpg";

export const mockProduct: Product = {
  id: 1,
  name: "POP MART CryBaBy Shiny",
  price: 990000,
  description: "Phiên bản CryBaBy lấp lánh cực hiếm, thiết kế chi tiết tinh xảo.",
  imageUrl: popmart,
  category: "Blindbox",
  userId: 1,
  sold: false,
};
