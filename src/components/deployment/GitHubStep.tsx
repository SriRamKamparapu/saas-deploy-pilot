
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Github, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Star,
  GitBranch,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface GitHubStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const GitHubStep = ({ onNext, onPrevious }: GitHubStepProps) => {
  const [accessToken, setAccessToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock repositories data
  const repositories = [
    {
      id: 1,
      name: 'my-react-app',
      fullName: 'johndoe/my-react-app',
      description: 'A modern React application with TypeScript',
      language: 'TypeScript',
      stars: 42,
      lastUpdated: '2 days ago',
      private: false,
      detectedFramework: 'React.js'
    },
    {
      id: 2,
      name: 'node-api-server',
      fullName: 'johndoe/node-api-server',
      description: 'REST API server built with Node.js and Express',
      language: 'JavaScript',
      stars: 18,
      lastUpdated: '1 week ago',
      private: true,
      detectedFramework: 'Node.js'
    },
    {
      id: 3,
      name: 'vue-dashboard',
      fullName: 'johndoe/vue-dashboard',
      description: 'Admin dashboard built with Vue 3 and Tailwind CSS',
      language: 'Vue',
      stars: 67,
      lastUpdated: '3 days ago',
      private: false,
      detectedFramework: 'Vue.js'
    }
  ];

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnect = () => {
    // Simulate GitHub connection
    setIsConnected(true);
  };

  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'typescript':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'javascript':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'vue':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Github className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Connect GitHub Repository
        </h3>
        <p className="text-slate-600">
          Select the repository you want to deploy to AWS
        </p>
      </div>

      {!isConnected ? (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">GitHub Personal Access Token</CardTitle>
            <CardDescription>
              We need a GitHub token to access your repositories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <Github className="w-4 h-4" />
              <AlertDescription className="text-blue-800">
                Create a personal access token with 'repo' permissions.
                <Button variant="link" className="p-0 h-auto text-blue-600 ml-1">
                  Learn how to create a token
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </AlertDescription>
            </Alert>

            <div>
              <Label htmlFor="token">Personal Access Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="ghp_..."
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="font-mono"
              />
            </div>

            <Button
              onClick={handleConnect}
              disabled={!accessToken}
              className="w-full"
            >
              <Github className="w-4 h-4 mr-2" />
              Connect GitHub
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Alert className="border-green-200 bg-green-50">
            <Github className="w-4 h-4" />
            <AlertDescription className="text-green-800">
              Successfully connected to GitHub! Select a repository to deploy.
            </AlertDescription>
          </Alert>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Repository Selection */}
          <RadioGroup value={selectedRepo} onValueChange={setSelectedRepo}>
            <div className="space-y-3">
              {filteredRepos.map((repo) => (
                <Card 
                  key={repo.id} 
                  className={`border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedRepo === repo.id.toString() 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200'
                  }`}
                  onClick={() => setSelectedRepo(repo.id.toString())}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <RadioGroupItem value={repo.id.toString()} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-slate-900">{repo.name}</h4>
                            {repo.private && (
                              <Badge variant="outline" className="text-xs">Private</Badge>
                            )}
                            <Badge variant="outline" className={`text-xs ${getLanguageColor(repo.language)}`}>
                              {repo.detectedFramework}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{repo.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${
                                repo.language === 'TypeScript' ? 'bg-blue-500' :
                                repo.language === 'JavaScript' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`} />
                              {repo.language}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {repo.stars}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {repo.lastUpdated}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>

          {selectedRepo && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <GitBranch className="w-4 h-4" />
                  <span className="font-medium">
                    Repository selected: {filteredRepos.find(r => r.id.toString() === selectedRepo)?.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={!selectedRepo}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Continue to Deploy
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default GitHubStep;
