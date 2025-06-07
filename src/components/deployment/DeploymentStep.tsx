
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Rocket, 
  ChevronLeft, 
  Server,
  Database,
  Storage,
  Shield,
  CheckCircle,
  Settings,
  Zap
} from 'lucide-react';

interface DeploymentStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DeploymentStep = ({ onNext, onPrevious }: DeploymentStepProps) => {
  const [config, setConfig] = useState({
    appName: 'my-react-app',
    domain: '',
    enableHTTPS: true,
    enableAutoScaling: true,
    enableDatabase: true,
    dbEngine: 'postgresql',
    enableS3: true,
    enableCloudWatch: true,
    environmentVars: 'NODE_ENV=production\nPORT=3000'
  });

  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      onNext();
    }, 3000);
  };

  const estimatedCosts = {
    ecs: '$24.00',
    rds: '$15.00',
    s3: '$5.00',
    cloudwatch: '$3.00',
    total: '$47.00'
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Configure Deployment
        </h3>
        <p className="text-slate-600">
          Review your configuration and deploy to AWS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="appName">Application Name</Label>
                <Input
                  id="appName"
                  value={config.appName}
                  onChange={(e) => setConfig(prev => ({ ...prev, appName: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="domain">Custom Domain (Optional)</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={config.domain}
                  onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="envVars">Environment Variables</Label>
                <Textarea
                  id="envVars"
                  placeholder="KEY=value"
                  value={config.environmentVars}
                  onChange={(e) => setConfig(prev => ({ ...prev, environmentVars: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Infrastructure Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>HTTPS Certificate</Label>
                  <p className="text-sm text-slate-600">Enable SSL/TLS encryption</p>
                </div>
                <Switch
                  checked={config.enableHTTPS}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableHTTPS: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto Scaling</Label>
                  <p className="text-sm text-slate-600">Scale based on traffic</p>
                </div>
                <Switch
                  checked={config.enableAutoScaling}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableAutoScaling: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Database (RDS)</Label>
                  <p className="text-sm text-slate-600">Managed PostgreSQL instance</p>
                </div>
                <Switch
                  checked={config.enableDatabase}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableDatabase: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>File Storage (S3)</Label>
                  <p className="text-sm text-slate-600">Object storage and CDN</p>
                </div>
                <Switch
                  checked={config.enableS3}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableS3: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Monitoring</Label>
                  <p className="text-sm text-slate-600">CloudWatch logs and metrics</p>
                </div>
                <Switch
                  checked={config.enableCloudWatch}
                  onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableCloudWatch: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary and Costs */}
        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Deployment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Server className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">ECS Fargate</div>
                    <div className="text-sm text-blue-700">Containerized application hosting</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 ml-auto">
                    Required
                  </Badge>
                </div>

                {config.enableDatabase && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Database className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">RDS PostgreSQL</div>
                      <div className="text-sm text-green-700">Managed database instance</div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 ml-auto">
                      db.t3.micro
                    </Badge>
                  </div>
                )}

                {config.enableS3 && (
                  <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <Storage className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-purple-900">S3 + CloudFront</div>
                      <div className="text-sm text-purple-700">File storage and CDN</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 ml-auto">
                      Global
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-orange-900">Security & Networking</div>
                    <div className="text-sm text-orange-700">VPC, Security Groups, Load Balancer</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 ml-auto">
                    Included
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Estimated Monthly Cost</CardTitle>
              <CardDescription>
                Based on US East (N. Virginia) region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">ECS Fargate (1 vCPU, 2GB RAM)</span>
                  <span className="font-medium">{estimatedCosts.ecs}</span>
                </div>
                {config.enableDatabase && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">RDS PostgreSQL (db.t3.micro)</span>
                    <span className="font-medium">{estimatedCosts.rds}</span>
                  </div>
                )}
                {config.enableS3 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">S3 + CloudFront</span>
                    <span className="font-medium">{estimatedCosts.s3}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">CloudWatch & Monitoring</span>
                  <span className="font-medium">{estimatedCosts.cloudwatch}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Monthly Estimate</span>
                    <span className="text-green-600">{estimatedCosts.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4" />
            <AlertDescription className="text-green-800">
              <strong>Ready to deploy!</strong> Your application will be live in approximately 10-15 minutes.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious} disabled={isDeploying}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleDeploy}
          disabled={isDeploying}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-w-[120px]"
        >
          {isDeploying ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              Deploying...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeploymentStep;
