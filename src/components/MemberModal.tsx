
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Member, MemberFormData } from '@/types/member';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MemberFormData) => void;
  member?: Member | null;
}

export const MemberModal = ({ isOpen, onClose, onSubmit, member }: MemberModalProps) => {
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    phone: '',
    subscriptionType: 'monthly',
    startDate: '',
    endDate: '',
    amountPaid: 0,
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        phone: member.phone,
        subscriptionType: member.subscriptionType,
        startDate: member.startDate,
        endDate: member.endDate,
        amountPaid: member.amountPaid,
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        subscriptionType: 'monthly',
        startDate: '',
        endDate: '',
        amountPaid: 0,
      });
    }
  }, [member, isOpen]);

  const calculateEndDate = (startDate: string, subscriptionType: string) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    let end = new Date(start);
    
    switch (subscriptionType) {
      case 'monthly':
        end.setMonth(end.getMonth() + 1);
        break;
      case 'quarterly':
        end.setMonth(end.getMonth() + 3);
        break;
      case 'yearly':
        end.setFullYear(end.getFullYear() + 1);
        break;
    }
    
    return end.toISOString().split('T')[0];
  };

  const handleStartDateChange = (date: string) => {
    setFormData(prev => ({
      ...prev,
      startDate: date,
      endDate: calculateEndDate(date, prev.subscriptionType),
    }));
  };

  const handleSubscriptionTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      subscriptionType: type as 'monthly' | 'quarterly' | 'yearly',
      endDate: calculateEndDate(prev.startDate, type),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const subscriptionPrices = {
    monthly: 200,
    quarterly: 500,
    yearly: 1800,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">
            {member ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right block">الاسم الكامل</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="text-right"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="text-right"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-right block">نوع الاشتراك</Label>
            <Select
              value={formData.subscriptionType}
              onValueChange={handleSubscriptionTypeChange}
            >
              <SelectTrigger className="text-right">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">شهري - {subscriptionPrices.monthly} ج.م</SelectItem>
                <SelectItem value="quarterly">ربع سنوي - {subscriptionPrices.quarterly} ج.م</SelectItem>
                <SelectItem value="yearly">سنوي - {subscriptionPrices.yearly} ج.م</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-right block">تاريخ البداية</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="text-right"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-right block">تاريخ الانتهاء</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                className="text-right bg-gray-50"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountPaid" className="text-right block">المبلغ المدفوع (ج.م)</Label>
            <Input
              id="amountPaid"
              type="number"
              value={formData.amountPaid}
              onChange={(e) => setFormData(prev => ({ ...prev, amountPaid: Number(e.target.value) }))}
              className="text-right"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex space-x-4 space-x-reverse pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-orange hover:opacity-90 text-white"
            >
              {member ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
