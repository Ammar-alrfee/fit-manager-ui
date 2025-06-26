
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, DollarSign, Users, Calendar, AlertTriangle, TrendingUp, Phone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ReportsPageProps {
  onBack: () => void;
}

export const ReportsPage = ({ onBack }: ReportsPageProps) => {
  const [stats, setStats] = useState({
    monthlyRevenue: 15000,
    activeMembers: 45,
    todayCheckIns: 12,
    expiredMemberships: 8,
  });

  // Mock data for charts
  const revenueData = [
    { day: 'السبت', revenue: 800 },
    { day: 'الأحد', revenue: 1200 },
    { day: 'الاثنين', revenue: 600 },
    { day: 'الثلاثاء', revenue: 900 },
    { day: 'الأربعاء', revenue: 1100 },
    { day: 'الخميس', revenue: 1400 },
    { day: 'الجمعة', revenue: 500 },
  ];

  const subscriptionData = [
    { name: 'شهري', value: 60, count: 27 },
    { name: 'ربع سنوي', value: 30, count: 13 },
    { name: 'سنوي', value: 10, count: 5 },
  ];

  const expiredMembers = [
    { id: '1', name: 'أحمد محمد', phone: '0123456789', expiredDays: 5 },
    { id: '2', name: 'سارة أحمد', phone: '0987654321', expiredDays: 12 },
    { id: '3', name: 'محمد علي', phone: '0555666777', expiredDays: 3 },
    { id: '4', name: 'نور الدين', phone: '0444333222', expiredDays: 8 },
  ];

  const COLORS = ['#FF8C00', '#32CD32', '#9370DB'];

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
              <h1 className="text-xl font-bold text-gray-900">التقارير والمدفوعات</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-orange text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">الإيرادات الشهرية</p>
                  <p className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()} ج.م</p>
                </div>
                <DollarSign className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">الأعضاء النشطين</p>
                  <p className="text-2xl font-bold">{stats.activeMembers}</p>
                </div>
                <Users className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">حضور اليوم</p>
                  <p className="text-2xl font-bold">{stats.todayCheckIns}</p>
                </div>
                <Calendar className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">اشتراكات منتهية</p>
                  <p className="text-2xl font-bold">{stats.expiredMemberships}</p>
                </div>
                <AlertTriangle className="w-10 h-10 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="revenue" className="text-right">ملخص الإيرادات</TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-right">الاشتراكات النشطة</TabsTrigger>
            <TabsTrigger value="expired" className="text-right">الاشتراكات المنتهية</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-right text-lg font-bold flex items-center space-x-2 space-x-reverse">
                  <TrendingUp className="w-5 h-5" />
                  <span>الإيرادات الأسبوعية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} ج.م`, 'الإيرادات']}
                        labelStyle={{ textAlign: 'right' }}
                      />
                      <Bar dataKey="revenue" fill="#FF8C00" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">إجمالي الأسبوع</p>
                    <p className="text-xl font-bold text-orange-600">
                      {revenueData.reduce((sum, day) => sum + day.revenue, 0).toLocaleString()} ج.م
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">متوسط يومي</p>
                    <p className="text-xl font-bold text-green-600">
                      {Math.round(revenueData.reduce((sum, day) => sum + day.revenue, 0) / 7).toLocaleString()} ج.م
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">أعلى يوم</p>
                    <p className="text-xl font-bold text-blue-600">
                      {Math.max(...revenueData.map(d => d.revenue)).toLocaleString()} ج.م
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-right text-lg font-bold">توزيع الاشتراكات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subscriptionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {subscriptionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-right text-lg font-bold">تفاصيل الاشتراكات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptionData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          ></div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{item.count} عضو</p>
                          <p className="text-sm text-gray-500">{item.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expired">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-right text-lg font-bold flex items-center space-x-2 space-x-reverse">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>الأعضاء المنتهية اشتراكاتهم</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expiredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500 flex items-center space-x-1 space-x-reverse">
                            <Phone className="w-3 h-3" />
                            <span>{member.phone}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Badge variant="destructive">
                          منتهي منذ {member.expiredDays} أيام
                        </Badge>
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                          اتصال
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {expiredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Users className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد اشتراكات منتهية</h3>
                    <p className="text-gray-500">جميع الأعضاء لديهم اشتراكات سارية</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
