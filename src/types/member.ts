
export interface Member {
  id: string;
  name: string;
  phone: string;
  subscriptionType: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  amountPaid: number;
  isActive: boolean;
  createdAt: string;
}

export interface MemberFormData {
  name: string;
  phone: string;
  subscriptionType: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  amountPaid: number;
}
