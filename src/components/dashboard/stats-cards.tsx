import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  stats: {
    totalUsers: number;
    totalBooks: number;
    activeLoans: number;
    overdueLoans: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cardData = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers, 
      description: 'Registered members',
      gradient: 'from-gray-800 to-gray-900',
      accent: 'from-white to-gray-300'
    },
    { 
      title: 'Total Books', 
      value: stats.totalBooks, 
      description: 'In collection',
      gradient: 'from-gray-700 to-gray-800',
      accent: 'from-gray-200 to-gray-400'
    },
    { 
      title: 'Active Loans', 
      value: stats.activeLoans, 
      description: 'Currently borrowed',
      gradient: 'from-gray-900 to-black',
      accent: 'from-gray-300 to-gray-500'
    },
    { 
      title: 'Overdue Loans', 
      value: stats.overdueLoans, 
      description: 'Past due date',
      gradient: 'from-red-900 to-red-800',
      accent: 'from-red-300 to-red-400'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <Card 
          key={index}
          className={`bg-gradient-to-br ${card.gradient} border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 backdrop-blur-sm relative overflow-hidden`}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Top accent line */}
          <div className={`h-1 w-full bg-gradient-to-r ${card.accent} opacity-70`}></div>
          
          <CardHeader className="pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-3xl font-bold bg-gradient-to-r ${card.accent} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
              {card.value.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-1">
              {card.description}
            </p>
          </CardContent>

          {/* Bottom right decoration */}
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Card>
      ))}
    </div>
  );
}