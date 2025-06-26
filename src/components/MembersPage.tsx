
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, ArrowRight, Phone, Calendar } from 'lucide-react';
import { Member } from '@/types/member';
import { MemberModal } from './MemberModal';

interface MembersPageProps {
  onBack: () => void;
}

export const MembersPage = ({ onBack }: MembersPageProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  useEffect(() => {
    // Simulate fetching members data
    const mockMembers: Member[] = [
      {
        id: '1',
        name: 'أحمد محمد',
        phone: '0123456789',
        subscriptionType: 'monthly',
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        amountPaid: 200,
        isActive: true,
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        name: 'فاطمة علي',
        phone: '0987654321',
        subscriptionType: 'quarterly',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        amountPaid: 500,
        isActive: true,
        createdAt: '2024-01-15',
      },
    ];
    setMembers(mockMembers);
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleAddMember = (memberData: any) => {
    const newMember: Member = {
      id: Date.now().toString(),
      ...memberData,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setMembers([...members, newMember]);
    setIsModalOpen(false);
  };

  const handleEditMember = (memberData: any) => {
    if (editingMember) {
      const updatedMembers = members.map(member =>
        member.id === editingMember.id
          ? { ...member, ...memberData }
          : member
      );
      setMembers(updatedMembers);
      setEditingMember(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  const getSubscriptionText = (type: string) => {
    const types = {
      monthly: 'شهري',
      quarterly: 'ربع سنوي',
      yearly: 'سنوي'
    };
    return types[type as keyof typeof types] || type;
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة</span>
              </Button>
              <h1 className="text-xl font-bold text-gray-900">إدارة الأعضاء</h1>
            </div>
            <Button
              onClick={() => {
                setEditingMember(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-orange hover:opacity-90 text-white"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة عضو جديد
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-lg">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="البحث بالاسم أو رقم الهاتف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 h-12 text-right"
            />
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900 text-right">
                    {member.name}
                  </CardTitle>
                  <Badge
                    variant={isExpired(member.endDate) ? "destructive" : "default"}
                    className={isExpired(member.endDate) ? "" : "bg-green-100 text-green-800 hover:bg-green-100"}
                  >
                    {isExpired(member.endDate) ? 'منتهي' : 'نشط'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {getSubscriptionText(member.subscriptionType)} - {member.amountPaid} ج.م
                  </span>
                </div>

                <div className="text-sm text-gray-500 text-right">
                  من {new Date(member.startDate).toLocaleDateString('ar-EG')} إلى {new Date(member.endDate).toLocaleDateString('ar-EG')}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingMember(member);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">لم يتم العثور على أعضاء بالمعايير المحددة</p>
          </div>
        )}
      </div>

      {/* Member Modal */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSubmit={editingMember ? handleEditMember : handleAddMember}
        member={editingMember}
      />
    </div>
  );
};
