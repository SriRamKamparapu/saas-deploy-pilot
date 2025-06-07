
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Cloud, 
  Github, 
  Settings, 
  Activity, 
  Plus, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Rocket,
  Server,
  Database,
  Shield
} from 'lucide-react';
import Header from '@/components/layout/Header';
import DeploymentWizard from '@/components/deployment/DeploymentWizard';
import DeploymentCard from '@/components/dashboard/DeploymentCard';
import StatsCards from '@/components/dashboard/StatsCards';

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [activeTab, setActiveTab] = useState('deployments');

  // Mock data for deployments
  const deployments = [
    {
      id: 1,
      name: 'my-react-app',
      status: 'success',
      techStack: 'React.js',
      url: 'https://my-react-app.aws.com',
      lastDeploy: '2 hours ago',
      region: 'us-east-1'
    },
    {
      id: 2,
      name: 'api-service',
      status: 'in-progress',
      techStack: 'Node.js',
      url: 'Deploying...',
      lastDeploy: 'Deploying now',
      region: 'us-west-2',
      progress: 75
    },
    {
      id: 3,
      name: 'vue-dashboard',
      status: 'failed',
      techStack: 'Vue.js',
      url: 'Deployment failed',
      lastDeploy: '1 day ago',
      region: 'eu-west-1'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Enterprise SaaS Deployment Engine
              </h1>
              <p className="text-xl text-slate-600">
                Deploy your applications to AWS with zero DevOps knowledge
              </p>
            </div>
            <Button 
              onClick={() => setShowWizard(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Deployment
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Auto Detection</h3>
                <p className="text-sm text-slate-600">Intelligent stack detection</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Server className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">AWS ECS</h3>
                <p className="text-sm text-slate-600">Containerized deployment</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">RDS & S3</h3>
                <p className="text-sm text-slate-600">Managed databases</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Monitoring</h3>
                <p className="text-sm text-slate-600">CloudWatch integration</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="deployments" className="flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Deployments
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deployments" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {deployments.map((deployment) => (
                  <DeploymentCard key={deployment.id} deployment={deployment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Deployment completed', project: 'my-react-app', time: '2 hours ago', status: 'success' },
                      { action: 'Deployment started', project: 'api-service', time: '3 hours ago', status: 'in-progress' },
                      { action: 'GitHub repository connected', project: 'vue-dashboard', time: '1 day ago', status: 'success' },
                      { action: 'AWS credentials validated', project: 'my-react-app', time: '2 days ago', status: 'success' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                          {activity.status === 'in-progress' && <Clock className="w-4 h-4 text-blue-500" />}
                          {activity.status === 'failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
                          <div>
                            <p className="font-medium text-slate-900">{activity.action}</p>
                            <p className="text-sm text-slate-600">{activity.project}</p>
                          </div>
                        </div>
                        <span className="text-sm text-slate-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="w-5 h-5" />
                      AWS Configuration
                    </CardTitle>
                    <CardDescription>
                      Manage your AWS credentials and regions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-900">AWS Credentials</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                          Connected
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Update Credentials
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Github className="w-5 h-5" />
                      GitHub Integration
                    </CardTitle>
                    <CardDescription>
                      Connect your GitHub repositories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-blue-900">GitHub Token</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                          Active
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Manage Repositories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Deployment Wizard Modal */}
      {showWizard && (
        <DeploymentWizard onClose={() => setShowWizard(false)} />
      )}
    </div>
  );
};

export default Index;
