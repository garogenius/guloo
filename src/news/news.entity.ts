export class News {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  tenant: 'nattypay' | 'valarpay';
  createdAt: Date;
  updatedAt: Date;
}
