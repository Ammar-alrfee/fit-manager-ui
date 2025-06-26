
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowRight, Clock, CheckCircle, User } from 'lucide-react';
import { AttendanceRecord } from '@/types/attendance';

interface AttendancePageProps {
  onBack: () => void;
}

export const AttendancePage = ({ onBack }: AttendancePageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([]);

  // Mock members data for search
  const mockMembers = [
    { id: '1', name: 'أحمد محمد', phone: '0123456789', isActive: true },
    { id: '2', name: 'فاطمة علي', phone: '0987654321', isActive: true },
    { id: '3', name: 'محمد أحمد', phone: '0555666777', isActive: false },
    { id: '4', name: 'سارة محمود', phone: '0444333222', isActive: true },
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = mockMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Load today's attendance records
    const mockTodayAttendance: AttendanceRecord[] = [
      {
        id: '1',
        memberName: 'أحمد محمد',
        memberId: '1',
        checkInTime: '08:30',
        date: new Date().toISOString().split('T')[0],
      },
      {
        id: '2',
        memberName: 'فاطمة علي',
        memberId: '2',
        checkInTime: '09:15',
        date: new Date().toISOString().split('T')[0],
      },
    ];
    setTodayAttendance(mockTodayAttendance);
  }, []);

  const handleCheckIn = (member: any) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-EG', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      memberName: member.name,
      memberId: member.id,
      checkInTime: timeString,
      date: now.toISOString().split('T')[0],
    };

    setTodayAttendance(prev => [newRecord, ...prev]);
    setSearchTerm('');
    setSearchResults([]);

    // Show success message (you could use toast here)
    console.log(`تم تسجيل حضور ${member.name} في ${timeString}`);
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
              <h1 className="text-xl font-bold text-gray-900">تتبع الحضور</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8 bg-white/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-right text-lg font-bold text-gray-900 flex items-center space-x-2 space-x-reverse">
              <Search className="w-5 h-5" />
              <span>البحث عن عضو</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="ابحث بالاسم أو رقم الهاتف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 h-12 text-right"
              />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 space-y-2">
                {searchResults.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => member.isActive ? handleCheckIn(member) : null}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-orange rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge
                        variant={member.isActive ? "default" : "destructive"}
                        className={member.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {member.isActive ? 'نشط' : 'منتهي'}
                      </Badge>
                      {member.isActive && (
                        <Button size="sm" className="bg-gradient-orange hover:opacity-90 text-white">
                          تسجيل حضور
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Attendance */}
        <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-right text-lg font-bold text-gray-900 flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-5 h-5" />
                <span>حضور اليوم</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {todayAttendance.length} عضو
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayAttendance.length > 0 ? (
              <div className="space-y-3">
                {todayAttendance.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{record.memberName}</p>
                        <p className="text-sm text-gray-500">تم تسجيل الحضور</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-green-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{record.checkInTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <CheckCircle className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا يوجد حضور اليوم</h3>
                <p className="text-gray-500">لم يتم تسجيل أي حضور حتى الآن</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
