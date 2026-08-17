export class FAQ {
  id: string;
  question: string;
  answer: string;
  tenant: 'nattypay' | 'valarpay';
  createdAt: Date;
  updatedAt: Date;
}
