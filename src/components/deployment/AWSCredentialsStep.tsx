
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Cloud, 
  CheckCircle, 
  ExternalLink,
  Key,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface AWSCredentialsStepProps {
  onNext: () => void;
}

const AWSCredentialsStep = ({ onNext }: AWSCredentialsStepProps) => {
  const [credentials, setCredentials] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1'
  });
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' }
  ];

  const handleValidate = async () => {
    setIsValidating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsValid(true);
    setIsValidating(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setIsValid(false);
  };

  const isFormValid = credentials.accessKeyId && credentials.secretAccessKey && credentials.region;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Cloud className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Configure AWS Credentials
        </h3>
        <p className="text-slate-600">
          We need your AWS credentials to deploy your application to your AWS account
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Key className="w-4 h-4" />
        <AlertDescription className="text-blue-800">
          Your credentials are encrypted and stored securely. We recommend using IAM users with minimal required permissions.
          <Button variant="link" className="p-0 h-auto text-blue-600 ml-1">
            Learn more about AWS permissions
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </AlertDescription>
      </Alert>

      <div className="max-w-2xl mx-auto">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">AWS Credentials</CardTitle>
            <CardDescription>
              Enter your AWS Access Key ID and Secret Access Key
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="accessKeyId">Access Key ID</Label>
              <Input
                id="accessKeyId"
                type="text"
                placeholder="AKIA..."
                value={credentials.accessKeyId}
                onChange={(e) => handleInputChange('accessKeyId', e.target.value)}
                className="font-mono"
              />
            </div>
            
            <div>
              <Label htmlFor="secretAccessKey">Secret Access Key</Label>
              <Input
                id="secretAccessKey"
                type="password"
                placeholder="Enter your secret access key"
                value={credentials.secretAccessKey}
                onChange={(e) => handleInputChange('secretAccessKey', e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <Label htmlFor="region">AWS Region</Label>
              <Select value={credentials.region} onValueChange={(value) => handleInputChange('region', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {region.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleValidate}
              disabled={!isFormValid || isValidating}
              className="w-full"
            >
              {isValidating ? 'Validating...' : 'Validate Credentials'}
            </Button>

            {isValid && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700 font-medium">Credentials validated successfully!</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={onNext}
          disabled={!isValid}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          Continue to GitHub
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AWSCredentialsStep;
