
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const membersPerPage = 10;

  useEffect(() => {
    // Generate more mock data to demonstrate pagination
    const mockMembers: Member[] = [
      {
        id: '1',
        name: 'أحمد محمد علي',
        phone: '01234567890',
        subscriptionType: 'monthly',
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        amountPaid: 200,
        isActive: true,
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        name: 'فاطمة علي حسن',
        phone: '01987654321',
        subscriptionType: 'quarterly',
        startDate: '2024-01-15',
        endDate: '2024-04-15',
        amountPaid: 500,
        isActive: true,
        createdAt: '2024-01-15',
      },
      {
        id: '3',
        name: 'محمد حسام الدين',
        phone: '01123456789',
        subscriptionType: 'yearly',
        startDate: '2024-02-01',
        endDate: '2025-02-01',
        amountPaid: 1000,
        isActive: true,
        createdAt: '2024-02-01',
      },
      {
        id: '4',
        name: 'مريم سعد الدين',
        phone: '01555666777',
        subscriptionType: 'monthly',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
        amountPaid: 200,
        isActive: false,
        createdAt: '2023-12-15',
      },
      {
        id: '5',
        name: 'عبدالله أحمد',
        phone: '01777888999',
        subscriptionType: 'quarterly',
        startDate: '2024-03-01',
        endDate: '2024-06-01',
        amountPaid: 500,
        isActive: true,
        createdAt: '2024-03-01',
      },
      {
        id: '6',
        name: 'نور الهدى محمد',
        phone: '01444555666',
        subscriptionType: 'monthly',
        startDate: '2024-03-15',
        endDate: '2024-04-15',
        amountPaid: 200,
        isActive: true,
        createdAt: '2024-03-15',
      },
      {
        id: '7',
        name: 'يوسف إبراهيم',
        phone: '01666777888',
        subscriptionType: 'yearly',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        amountPaid: 1000,
        isActive: true,
        createdAt: '2024-01-01',
      },
      {
        id: '8',
        name: 'سارة عبدالرحمن',
        phone: '01333444555',
        subscriptionType: 'quarterly',
        startDate: '2024-02-15',
        endDate: '2024-05-15',
        amountPaid: 500,
        isActive: true,
        createdAt: '2024-02-15',
      },
      {
        id: '9',
        name: 'خالد محمود',
        phone: '01888999000',
        subscriptionType: 'monthly',
        startDate: '2023-11-01',
        endDate: '2023-12-01',
        amountPaid: 200,
        isActive: false,
        createdAt: '2023-11-01',
      },
      {
        id: '10',
        name: 'هدى سليمان',
        phone: '01222333444',
        subscriptionType: 'yearly',
        startDate: '2024-03-01',
        endDate: '2025-03-01',
        amountPaid: 1000,
        isActive: true,
        createdAt: '2024-03-01',
      },
      {
        id: '11',
        name: 'أمين عبدالله',
        phone: '01555777999',
        subscriptionType: 'monthly',
        startDate: '2024-04-01',
        endDate: '2024-05-01',
        amountPaid: 200,
        isActive: true,
        createdAt: '2024-04-01',
      },
      {
        id: '12',
        name: 'ليلى أحمد',
        phone: '01111222333',
        subscriptionType: 'quarterly',
        startDate: '2024-01-20',
        endDate: '2024-04-20',
        amountPaid: 500,
        isActive: true,
        createdAt: '2024-01-20',
      }
    ];
    setMembers(mockMembers);
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + membersPerPage);

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
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
              >
                {viewMode === 'table' ? 'عرض البطاقات' : 'عرض الجدول'}
              </Button>
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

        {/* Members Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 text-right">
            إجمالي الأعضاء: {filteredMembers.length} | الصفحة {currentPage} من {totalPages}
          </p>
        </div>

        {/* Members Table View */}
        {viewMode === 'table' && (
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">#</TableHead>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">الهاتف</TableHead>
                      <TableHead className="text-right">نوع الاشتراك</TableHead>
                      <TableHead className="text-right">المبلغ</TableHead>
                      <TableHead className="text-right">تاريخ الانتهاء</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMembers.map((member, index) => (
                      <TableRow key={member.id}>
                        <TableCell className="text-right font-medium">
                          {startIndex + index + 1}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {member.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-1 space-x-reverse">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{member.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {getSubscriptionText(member.subscriptionType)}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.amountPaid} ج.م
                        </TableCell>
                        <TableCell className="text-right">
                          {new Date(member.endDate).toLocaleDateString('ar-EG')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={isExpired(member.endDate) ? "destructive" : "default"}
                            className={isExpired(member.endDate) ? "" : "bg-green-100 text-green-800 hover:bg-green-100"}
                          >
                            {isExpired(member.endDate) ? 'منتهي' : 'نشط'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2 space-x-reverse">
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Members Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMembers.map((member, index) => (
              <Card key={member.id} className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900 text-right">
                      {member.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm text-gray-500">#{startIndex + index + 1}</span>
                      <Badge
                        variant={isExpired(member.endDate) ? "destructive" : "default"}
                        className={isExpired(member.endDate) ? "" : "bg-green-100 text-green-800 hover:bg-green-100"}
                      >
                        {isExpired(member.endDate) ? 'منتهي' : 'نشط'}
                      </Badge>
                    </div>
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  >
                    السابق
                  </PaginationPrevious>
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  >
                    التالي
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

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
