
interface ReportFiltersProps {
  activeTab: 'pending' | 'resolved' | 'dismissed' | 'suspended' | 'all';
  onTabChange: (tab: 'pending' | 'resolved' | 'dismissed' | 'suspended' | 'all') => void;
}

const ReportFilters = ({ activeTab, onTabChange }: ReportFiltersProps) => {
  const tabs = [
    { key: 'pending', label: 'Pending Reports' },
    { key: 'resolved', label: 'Resolved Reports' },
    { key: 'dismissed', label: 'Dismissed Reports' },
    { key: 'suspended', label: 'Suspended Users' },
    { key: 'all', label: 'All Reports' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key as any)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.key
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ReportFilters;
