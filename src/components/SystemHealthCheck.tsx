
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { performHealthCheck, HealthCheckResult, getServiceStatusIcon, getOverallStatusColor } from '@/services/healthCheck';

const SystemHealthCheck = () => {
  const [healthData, setHealthData] = useState<HealthCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    runHealthCheck();
  }, []);

  const runHealthCheck = async () => {
    setIsLoading(true);
    try {
      const result = await performHealthCheck();
      setHealthData(result);
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'default';
      case 'degraded':
        return 'secondary';
      case 'unhealthy':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <CardTitle>System Health Status</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={runHealthCheck}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Check Status
          </Button>
        </div>
        <CardDescription>
          Monitor the health of core system services
        </CardDescription>
      </CardHeader>
      <CardContent>
        {healthData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(healthData.status)}
                <span className="font-medium">Overall Status:</span>
                <Badge variant={getStatusBadgeVariant(healthData.status)}>
                  {healthData.status.toUpperCase()}
                </Badge>
              </div>
              <span className="text-sm text-gray-500">
                Response time: {healthData.responseTime}ms
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Service Status</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Database Connection</span>
                    <span>{getServiceStatusIcon(healthData.checks.database)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Authentication Service</span>
                    <span>{getServiceStatusIcon(healthData.checks.authentication)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Environment Config</span>
                    <span>{getServiceStatusIcon(healthData.checks.environment)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Network Connectivity</span>
                    <span>{getServiceStatusIcon(healthData.checks.connectivity)}</span>
                  </div>
                </div>
              </div>

              {healthData.errors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-red-600">Issues Detected</h4>
                  <div className="space-y-1">
                    {healthData.errors.map((error, index) => (
                      <div key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                        {error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500">
              Last checked: {new Date(healthData.timestamp).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-gray-500">Click "Check Status" to run health check</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemHealthCheck;
