
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Globe,
  Database,
  Storage,
  Activity,
  Rocket
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuccessStepProps {
  onClose: () => void;
}

const SuccessStep = ({ onClose }: SuccessStepProps) => {
  const { toast } = useToast();

  const deploymentDetails = {
    appUrl: 'https://my-react-app-prod.us-east-1.elb.amazonaws.com',
    apiUrl: 'https://api-my-react-app-prod.us-east-1.elb.amazonaws.com',
    dbEndpoint: 'my-react-app-db.cluster-xyz.us-east-1.rds.amazonaws.com',
    s3Bucket: 'my-react-app-assets-prod',
    region: 'us-east-1',
    deploymentTime: '12m 34s'
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          🎉 Deployment Successful!
        </h3>
        <p className="text-lg text-slate-600">
          Your application is now live on AWS
        </p>
        <Badge className="bg-green-100 text-green-700 border-green-200 mt-3">
          Completed in {deploymentDetails.deploymentTime}
        </Badge>
      </div>

      {/* Deployment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* URLs and Access */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Application URLs
            </CardTitle>
            <CardDescription>Your application is accessible at these endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Frontend Application</Label>
              <div className="flex items-center gap-2 p-3 bg-white border border-green-200 rounded-lg">
                <span className="flex-1 text-sm font-mono text-slate-800 truncate">
                  {deploymentDetails.appUrl}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(deploymentDetails.appUrl, 'App URL')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(deploymentDetails.appUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">API Endpoint</Label>
              <div className="flex items-center gap-2 p-3 bg-white border border-green-200 rounded-lg">
                <span className="flex-1 text-sm font-mono text-slate-800 truncate">
                  {deploymentDetails.apiUrl}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(deploymentDetails.apiUrl, 'API URL')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(deploymentDetails.apiUrl + '/health', '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Details */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Infrastructure
            </CardTitle>
            <CardDescription>AWS resources created for your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Rocket className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <div className="font-medium text-blue-900">ECS Service</div>
                  <div className="text-sm text-blue-700">my-react-app-service</div>
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">Running</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Database className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-green-900">RDS PostgreSQL</div>
                  <div className="text-sm text-green-700 font-mono truncate">
                    {deploymentDetails.dbEndpoint}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">Available</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <Storage className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <div className="font-medium text-purple-900">S3 Bucket</div>
                  <div className="text-sm text-purple-700">{deploymentDetails.s3Bucket}</div>
                </div>
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
          <CardDescription>
            Here's what you can do now that your application is deployed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Monitor Performance</span>
              <span className="text-xs text-slate-600">View logs and metrics</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Globe className="w-5 h-5" />
              <span className="font-medium">Custom Domain</span>
              <span className="text-xs text-slate-600">Add your own domain</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
              <Database className="w-5 h-5" />
              <span className="font-medium">Manage Database</span>
              <span className="text-xs text-slate-600">Access database settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="min-w-[140px]"
        >
          Close
        </Button>
        
        <Button 
          onClick={() => window.open(deploymentDetails.appUrl, '_blank')}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-w-[140px]"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit App
        </Button>
      </div>
    </div>
  );
};

// Helper component for labels
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium text-slate-700 ${className}`}>
    {children}
  </label>
);

export default SuccessStep;
