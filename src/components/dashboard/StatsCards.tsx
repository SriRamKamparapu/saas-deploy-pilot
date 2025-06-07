
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Deployments',
      value: '24',
      change: '+12%',
      trend: 'up',
      description: 'vs last month',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Success Rate',
      value: '96.8%',
      change: '+2.4%',
      trend: 'up',
      description: 'vs last month',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Avg Deploy Time',
      value: '4.2min',
      change: '-0.8min',
      trend: 'up',
      description: 'vs last month',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+2',
      trend: 'up',
      description: 'vs last month',
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'purple' ? 'bg-purple-100' :
                'bg-orange-100'
              }`}>
                <IconComponent className={`w-5 h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`${
                    stat.trend === 'up' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
                <span className="text-xs text-slate-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
