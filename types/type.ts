import { UploadApiResponse } from "cloudinary";

export interface DashboardStatsTypeResponse {
  success: boolean;
  revenueToday: number;
  transactionCount: number;
  totalProducts: number;
  lowStock: number;
}

export interface DataSalesType {
  success: boolean;
  chartData: { date: string; income: number }[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  image_public_id: string;
  description: string | null;
  price: number;
  stock: number;
  discount: number | 0;
  categoryId: string;
  category: { id: string; name: string };
  variants: { id: string; name: string; price: number; stock: number }[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  data: Product[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Categories {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewCategoriesResponse {
  success: boolean;
  message: string;
  newCategory: Categories;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: Categories[];
}

export type CloudinaryUploadResponse = {
  success: boolean;
  result: UploadApiResponse;
};
