
import { Users, ClipboardCheck, BarChart3, LogOut, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { user, logout } = useAuth();

  const adminActions = [
    {
      id: 'members',
      title: 'إدارة الأعضاء',
      description: 'إضافة وتعديل وحذف بيانات الأعضاء',
      icon: Users,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'attendance',
      title: 'تتبع الحضور',
      description: 'تسجيل حضور الأعضاء ومتابعة الزيارات',
      icon: ClipboardCheck,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'reports',
      title: 'التقارير والمدفوعات',
      description: 'عرض التقارير المالية وإحصائيات الجيم',
      icon: BarChart3,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
  ];

  const employeeActions = [
    {
      id: 'attendance',
      title: 'تسجيل الحضور',
      description: 'تسجيل حضور الأعضاء',
      icon: ClipboardCheck,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
  ];

  const actions = user?.role === 'admin' ? adminActions : employeeActions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient-orange">FitManager</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">مرحباً، {user?.name}</p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'admin' ? 'مدير النظام' : 'موظف الاستقبال'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h2>
          <p className="text-gray-600">إدارة جميع عمليات الجيم من مكان واحد</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => (
            <Card
              key={action.id}
              className="cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur border-0 shadow-lg animate-fade-in"
              onClick={() => onNavigate(action.id)}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-lg flex items-center justify-center mb-4 transition-colors duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 text-right">
                  {action.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-right">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${action.color} rounded-full w-0 group-hover:w-full transition-all duration-500`}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="mt-12">
          <Card className="bg-gradient-orange text-white border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <Dumbbell className="w-16 h-16 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">مرحباً بك في FitManager</h3>
              <p className="text-orange-100 max-w-2xl mx-auto">
                نظام إدارة الجيم المتكامل الذي يساعدك على إدارة الأعضاء، تتبع الحضور، ومراقبة الأداء المالي بكل سهولة وفعالية.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
