export type ProductOption = {
  colors: string[];
  sizes: string[];
};

export type Product = {
  id: string;
  name: string;
  priceEur: number;
  options: ProductOption;
};

export type Tag = {
  id: string;
  x: number; // 0..100 percent
  y: number; // 0..100 percent
  product: Product;
  defaultSelection?: {
    color?: string;
    size?: string;
  };
};

export type Author = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type Post = {
  id: string;
  title?: string;
  imageUrl: string;
  author: Author;
  tags: Tag[];
  createdAt: string; // ISO
  refCode: string; // ambassador/ref attribution for share links
};

export type ClickEvent = {
  postId: string;
  tagId: string;
  ambassadorId: string;
  selection?: { color?: string; size?: string };
};

export type Stats = {
  clicks: number;
  clicksByPost: Record<string, number>;
  clicksByAmbassador: Record<string, number>;
  revenueByAmbassadorEur: Record<string, number>;
};
