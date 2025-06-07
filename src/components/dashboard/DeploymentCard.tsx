
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ExternalLink, 
  MoreVertical, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Deployment {
  id: number;
  name: string;
  status: 'success' | 'failed' | 'in-progress' | 'pending';
  techStack: string;
  url: string;
  lastDeploy: string;
  region: string;
  progress?: number;
}

interface DeploymentCardProps {
  deployment: Deployment;
}

const DeploymentCard = ({ deployment }: DeploymentCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Live</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Deploying</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTechStackColor = (tech: string) => {
    switch (tech.toLowerCase()) {
      case 'react.js':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'node.js':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'vue.js':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'python':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(deployment.status)}
            <CardTitle className="text-lg font-semibold text-slate-900">
              {deployment.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Redeploy
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                Stop
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Rollback
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status and Tech Stack */}
        <div className="flex items-center justify-between">
          {getStatusBadge(deployment.status)}
          <Badge variant="outline" className={getTechStackColor(deployment.techStack)}>
            {deployment.techStack}
          </Badge>
        </div>

        {/* Progress Bar for In-Progress Deployments */}
        {deployment.status === 'in-progress' && deployment.progress && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Deployment Progress</span>
              <span className="text-sm text-slate-500">{deployment.progress}%</span>
            </div>
            <Progress value={deployment.progress} className="h-2" />
          </div>
        )}

        {/* URL */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Endpoint
          </label>
          <div className="flex items-center gap-2">
            {deployment.status === 'success' ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 p-0 text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => window.open(deployment.url, '_blank')}
              >
                {deployment.url}
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            ) : (
              <span className="text-sm text-slate-500">{deployment.url}</span>
            )}
          </div>
        </div>

        {/* Region and Last Deploy */}
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{deployment.region}</span>
          </div>
          <span>{deployment.lastDeploy}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            disabled={deployment.status === 'in-progress'}
          >
            View Logs
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            disabled={deployment.status === 'in-progress'}
          >
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
