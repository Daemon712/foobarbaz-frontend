export class Article {
  id: number;
  name: string;
  description: string;
  body: string;
  author: string;
  created: Date;
  tags: string[];
  likes: number;
  liked: boolean;
  comments: number;
  views: number;
}
