export type Guid = string;

export type Movie = {
  id: Guid;
  title?: string;
  director?: string;
  year?: string;
  description?: string;
  price?: number;
  image?: string;
};
