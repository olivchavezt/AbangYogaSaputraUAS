import { Book, Loan } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Repeat } from 'lucide-react'; // optional icons

interface RecentActivityProps {
  title: string;
  activities: Array<Book | Loan>;
  type: 'books' | 'loans';
}

export function RecentActivity({ title, activities, type }: RecentActivityProps) {
  return (
    <Card className="bg-gradient-to-br from-black/40 via-gray-900/50 to-gray-800/40 border border-white/10 shadow-xl rounded-2xl backdrop-blur-sm">
      <CardHeader className="border-b border-white/5">
        <CardTitle className="text-gray-200 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={type === 'books' ? (activity as Book).book_id : (activity as Loan).loan_id}
              className="flex items-start bg-white/5 hover:bg-gradient-to-r hover:from-white/10 hover:to-gray-700/20 transition-all duration-200 rounded-xl px-4 py-3 border border-white/5 hover:border-white/10 group"
            >
              <div className="flex-shrink-0 pt-1">
                <div className="p-2 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 group-hover:from-gray-600 group-hover:to-gray-700 transition-all duration-200">
                  {type === 'books' ? (
                    <BookOpen className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  ) : (
                    <Repeat className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors duration-200" />
                  )}
                </div>
              </div>
              <div className="ml-4 space-y-1 flex-1">
                {type === 'books' ? (
                  <>
                    <p className="text-sm font-medium text-white group-hover:text-gray-100 transition-colors duration-200">
                      {(activity as Book).title}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      Penerbit: {(activity as Book).publisher}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-white group-hover:text-gray-100 transition-colors duration-200">
                      Loan oleh User #{(activity as Loan).user_id}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      Buku ID: {(activity as Loan).book_id}
                    </p>
                  </>
                )}
              </div>
              {/* Subtle arrow indicator */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-1 h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}