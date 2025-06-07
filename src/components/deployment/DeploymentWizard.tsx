
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import AWSCredentialsStep from './AWSCredentialsStep';
import GitHubStep from './GitHubStep';
import DeploymentStep from './DeploymentStep';
import SuccessStep from './SuccessStep';

interface DeploymentWizardProps {
  onClose: () => void;
}

const DeploymentWizard = ({ onClose }: DeploymentWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const steps = [
    { id: 1, title: 'AWS Credentials', description: 'Configure your AWS access' },
    { id: 2, title: 'GitHub Repository', description: 'Select your project' },
    { id: 3, title: 'Deploy Configuration', description: 'Review and deploy' },
    { id: 4, title: 'Success', description: 'Deployment complete' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (completedSteps.includes(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);
    }
  };

  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isStepCurrent = (stepId: number) => stepId === currentStep;
  const isStepAccessible = (stepId: number) => 
    stepId === currentStep || completedSteps.includes(stepId);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <AWSCredentialsStep onNext={handleNext} />;
      case 2:
        return <GitHubStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <DeploymentStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <SuccessStep onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Deploy Your Application
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isStepAccessible(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                    isStepCompleted(step.id)
                      ? 'bg-green-500 text-white'
                      : isStepCurrent(step.id)
                      ? 'bg-blue-600 text-white'
                      : isStepAccessible(step.id)
                      ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isStepCompleted(step.id) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-1 mx-2 rounded-full transition-colors duration-200 ${
                      isStepCompleted(step.id) ? 'bg-green-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="text-center max-w-[120px]">
                <p className={`text-sm font-medium ${
                  isStepCurrent(step.id) ? 'text-blue-600' : 'text-slate-600'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Overall Progress</span>
              <span className="text-sm text-slate-500">
                {Math.round(((completedSteps.length) / steps.length) * 100)}%
              </span>
            </div>
            <Progress 
              value={(completedSteps.length / steps.length) * 100} 
              className="h-2"
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeploymentWizard;
