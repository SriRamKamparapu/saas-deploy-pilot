
export interface Deployment {
  id: number;
  name: string;
  status: 'success' | 'failed' | 'in-progress' | 'pending';
  techStack: string;
  url: string;
  lastDeploy: string;
  region: string;
  progress?: number;
}
