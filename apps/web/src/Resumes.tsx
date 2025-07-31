import type React from 'react';
import { trpc } from './trpc/TRPCProvider';

const getStatusColor = (status?: string): string => {
  if (!status) return 'bg-gray-100 text-gray-600';

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    'under review': 'bg-blue-100 text-blue-800',
    'interview scheduled': 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
  };

  return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-600';
};

const getPipelineStageColor = (stage?: string): string => {
  if (!stage) return 'bg-gray-100 text-gray-700';

  const stageColors: Record<string, string> = {
    screening: 'bg-blue-50 text-blue-700',
    interview: 'bg-yellow-50 text-yellow-700',
    final: 'bg-green-50 text-green-700',
    offer: 'bg-indigo-50 text-indigo-700',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-50 text-red-700',
  };

  return stageColors[stage.toLowerCase()] || 'bg-gray-100 text-gray-700';
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';

  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export function ApplicationCard({ application }: { application: any }) {
  const { personalInfo, applicationDetails, documents, callDetails, timestamps } = application;

  const displayName =
    personalInfo?.fullName ||
    `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim() ||
    'Unknown Applicant';

  const primaryJobTitle =
    applicationDetails?.jobTitle?.[0] || applicationDetails?.selectedPosition || 'No Position';
  const hasResume = documents?.resume?.length > 0;
  const hasCallCompleted = callDetails?.callCompleted;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-3">
              {personalInfo?.initials ||
                displayName
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{displayName}</h3>
              <p className="text-sm text-gray-600">{personalInfo?.email || 'No email provided'}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {applicationDetails?.applicationStatus && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicationDetails.applicationStatus)}`}
            >
              {applicationDetails.applicationStatus}
            </span>
          )}

          {applicationDetails?.pipelineStage && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getPipelineStageColor(applicationDetails.pipelineStage)}`}
            >
              {applicationDetails.pipelineStage}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-base font-medium text-gray-700 mb-2">{primaryJobTitle}</h4>

        {applicationDetails?.clientName && (
          <p className="text-sm text-gray-600 mb-2">Client: {applicationDetails.clientName}</p>
        )}

        {personalInfo?.mobileNumber && (
          <p className="text-sm text-gray-600">
            Phone: {personalInfo.formattedMobileNumber || personalInfo.mobileNumber}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Applied: {formatDate(applicationDetails?.applicationDate)}</span>
          {timestamps?.dateModified && <span>Updated: {formatDate(timestamps.dateModified)}</span>}
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
            hasResume ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          <span className="text-base">{hasResume ? '📄' : '❌'}</span>
          Resume {hasResume ? 'Uploaded' : 'Missing'}
        </div>

        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
            hasCallCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          <span className="text-base">{hasCallCompleted ? '📞' : '⏳'}</span>
          Call {hasCallCompleted ? 'Completed' : 'Pending'}
        </div>

        {callDetails?.duration?.length > 0 && (
          <div className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-medium">
            Duration: {Math.round(callDetails.duration[0] / 60)}min
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-3" />
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded mb-2 w-3/5" />
          <div className="h-4 bg-gray-200 rounded w-2/5" />
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded mb-3 w-4/5" />
      <div className="h-4 bg-gray-200 rounded w-3/5" />
    </div>
  );
}

export function Resumes() {
  const applicationsQuery = trpc.applications.list.useQuery();

  const handleRefresh = () => {
    applicationsQuery.refetch();
  };

  const applications = applicationsQuery.data?.success ? applicationsQuery.data.data : [];
  const hasError = applicationsQuery.data?.success === false;
  const serverError = hasError ? (applicationsQuery.data as any)?.error : null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
          <p className="text-gray-600">Manage and review candidate applications</p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={applicationsQuery.isLoading}
          className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
            applicationsQuery.isLoading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {applicationsQuery.isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {applicationsQuery.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Applications</h3>
          <p className="text-red-700 text-sm">{applicationsQuery.error.message}</p>
        </div>
      )}

      {hasError && serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-semibold mb-2">Server Error</h3>
          <p className="text-red-700 text-sm">{serverError}</p>
        </div>
      )}

      {applicationsQuery.isLoading && (
        <div>
          {[1, 2, 3].map(id => (
            <LoadingCard key={`loading-card-${id}`} />
          ))}
        </div>
      )}

      {applications && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">
              Showing {applications.length} application{applications.length !== 1 ? 's' : ''}
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
              <p className="text-gray-600">There are currently no job applications to display.</p>
            </div>
          ) : (
            applications.map((application: any, index: number) => (
              <ApplicationCard
                key={application.id || `application-${index}`}
                application={application}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
