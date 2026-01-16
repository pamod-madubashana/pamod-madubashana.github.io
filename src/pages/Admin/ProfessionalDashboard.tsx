import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Package,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  MessageSquare,
  Clock,
  Zap,
  Award,
  BarChart3,
  ArrowUpRight,
  Plus,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  trend: 'up' | 'down';
}

interface RecentActivity {
  id: string;
  title: string;
  type: 'article' | 'project';
  date: string;
  status: 'draft' | 'published';
  author: string;
}

const ProfessionalDashboard = () => {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data that simulates real API response
  const [dashboardData] = useState({
    stats: {
      articles: {
        total: 24,
        published: 18,
        drafts: 6,
        change: '+12%'
      },
      projects: {
        total: 8,
        published: 6,
        drafts: 2,
        change: '+3'
      },
      users: {
        total: 1200,
        change: '+8%'
      },
      engagement: {
        views: 12400,
        rate: '64%',
        change: '+18%'
      }
    },
    recentActivity: [
      {
        id: "1",
        title: "Building a Modern React Dashboard",
        type: "article" as const,
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        status: "published" as const,
        author: user?.username || "Admin"
      },
      {
        id: "2",
        title: "Portfolio Website Redesign",
        type: "project" as const,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        status: "published" as const,
        author: "You"
      },
      {
        id: "3",
        title: "Advanced TypeScript Patterns",
        type: "article" as const,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        status: "draft" as const,
        author: user?.username || "Admin"
      },
      {
        id: "4",
        title: "Mobile App Development Guide",
        type: "project" as const,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        status: "published" as const,
        author: "You"
      },
      {
        id: "5",
        title: "State Management Best Practices",
        type: "article" as const,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        status: "published" as const,
        author: user?.username || "Admin"
      }
    ]
  });

  // Transform dashboard stats to UI format
  const statsCards = [
    {
      title: "Total Articles",
      value: dashboardData.stats.articles.total.toString(),
      change: dashboardData.stats.articles.change,
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      trend: 'up' as 'up' | 'down'
    },
    {
      title: "Active Projects",
      value: dashboardData.stats.projects.total.toString(),
      change: dashboardData.stats.projects.change,
      icon: Package,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      trend: 'up' as 'up' | 'down'
    },
    {
      title: "Total Views",
      value: dashboardData.stats.engagement.views.toLocaleString(),
      change: dashboardData.stats.engagement.change,
      icon: Eye,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      trend: 'up' as 'up' | 'down'
    },
    {
      title: "Engagement Rate",
      value: dashboardData.stats.engagement.rate,
      change: dashboardData.stats.engagement.change,
      icon: TrendingUp,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      trend: 'up' as 'up' | 'down'
    }
  ];

  const quickActions = [
    {
      title: "New Article",
      description: "Create blog post",
      icon: FileText,
      path: "/admin/articles",
      color: "from-blue-500 to-cyan-500",
      action: "create"
    },
    {
      title: "Add Project",
      description: "Showcase work",
      icon: Package,
      path: "/admin/projects",
      color: "from-purple-500 to-pink-500",
      action: "create"
    },
    {
      title: "View Analytics",
      description: "Performance metrics",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "from-green-500 to-emerald-500",
      action: "view"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: diffInDays > 365 ? 'numeric' : undefined 
    });
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-2">
            Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {user?.username || 'Admin'}
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex items-center justify-end">
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span>Updated just now</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400">
          Error loading dashboard: {error}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="glass border border-white/10 hover:border-white/30 transition-all duration-300 h-full overflow-hidden relative bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`${stat.bgColor} p-3 rounded-xl`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <ArrowUpRight className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        {stat.change}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative pt-0">
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full"
                  >
                    <Link to={action.path}>
                      <Card className="glass border border-white/10 hover:border-white/30 transition-all duration-300 h-full overflow-hidden group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        <CardHeader className="pb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-xl text-white group-hover:text-primary transition-colors duration-300">
                            {action.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {action.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 transition-opacity`}>
                            {action.action === 'create' ? (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                Create
                              </>
                            ) : (
                              'View Details'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-400" />
                Recent Activity
              </h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All
              </Button>
            </div>
            
            <Card className="glass border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <CardContent className="p-0">
                <div className="divide-y divide-white/10">
                  {dashboardData.recentActivity.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className="p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            item.type === 'article' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {item.type === 'article' ? (
                              <FileText className="w-5 h-5" />
                            ) : (
                              <Package className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                            <p className="text-xs text-muted-foreground/70">by {item.author}</p>
                          </div>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Sidebar Widgets */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Performance Widget */}
          <Card className="glass border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Performance Overview
              </CardTitle>
              <CardDescription>Monthly analytics summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Articles Published</span>
                    <span className="text-white font-medium">
                      {dashboardData.stats.articles.published}/{dashboardData.stats.articles.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" 
                      style={{width: `${(dashboardData.stats.articles.published / dashboardData.stats.articles.total) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Projects Completed</span>
                    <span className="text-white font-medium">
                      {dashboardData.stats.projects.published}/{dashboardData.stats.projects.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                      style={{width: `${(dashboardData.stats.projects.published / dashboardData.stats.projects.total) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Profile Views</span>
                    <span className="text-white font-medium">
                      {dashboardData.stats.engagement.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                      style={{width: '85%'}}
                    ></div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90">
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="glass border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-orange-400" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription>Deadlines and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Finish portfolio redesign</p>
                    <p className="text-sm text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Write React hooks article</p>
                    <p className="text-sm text-muted-foreground">Due in 3 days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-white font-medium">Update project screenshots</p>
                    <p className="text-sm text-muted-foreground">Due next week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;