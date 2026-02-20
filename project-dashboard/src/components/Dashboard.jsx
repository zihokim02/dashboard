import { useState } from 'react';

export default function Dashboard({ projects, onOpenProject }) {
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(filter.toLowerCase()) ||
                         p.description.toLowerCase().includes(filter.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: projects.length,
    research: projects.filter(p => p.type === 'research').length,
    development: projects.filter(p => p.type === 'development').length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    notStarted: projects.filter(p => p.status === 'not-started').length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Research" value={stats.research} />
        <StatCard label="Development" value={stats.development} />
        <StatCard label="In Progress" value={stats.inProgress} />
        <StatCard label="Not Started" value={stats.notStarted} />
        <StatCard label="Completed" value={stats.completed} />
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Search projects..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="flex-1 min-w-[200px] glass-input px-4 py-2.5 text-sm"
          />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="glass-input pl-4 pr-8 py-2.5 text-sm min-w-[120px] appearance-none bg-no-repeat bg-right"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff60' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
          >
            <option value="all" className="bg-neutral-900">All Types</option>
            <option value="research" className="bg-neutral-900">Research</option>
            <option value="development" className="bg-neutral-900">Development</option>
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="glass-input pl-4 pr-8 py-2.5 text-sm min-w-[140px] appearance-none bg-no-repeat bg-right"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff60' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
          >
            <option value="all" className="bg-neutral-900">All Statuses</option>
            <option value="not-started" className="bg-neutral-900">Not Started</option>
            <option value="in-progress" className="bg-neutral-900">In Progress</option>
            <option value="completed" className="bg-neutral-900">Completed</option>
          </select>
          {(filter || typeFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => { setFilter(''); setTypeFilter('all'); setStatusFilter('all'); }}
              className="text-white/60 hover:text-white px-4 py-2.5 text-sm transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Project List */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white/90">
          Projects
          <span className="text-white/40 text-sm font-normal ml-2">
            ({filteredProjects.length} of {projects.length})
          </span>
        </h2>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState hasFilters={filter || typeFilter !== 'all' || statusFilter !== 'all'} />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => onOpenProject(project.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ hasFilters }) {
  return (
    <div className="glass-card p-12 text-center border-dashed border-white/20">
      <div className="text-4xl mb-3 opacity-60">📁</div>
      <h3 className="text-white/80 font-medium mb-1">
        {hasFilters ? 'No projects match your filters' : 'No projects yet'}
      </h3>
      <p className="text-white/50 text-sm">
        {hasFilters
          ? 'Try adjusting your search or filters'
          : 'Create your first project to get started!'}
      </p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="glass-card p-4 bg-gradient-to-br from-white/10 to-white/5 border-t border-white/10">
      <div className="text-2xl font-bold text-white/90">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = project.tasks.filter(t => t.status === 'in-progress').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const nextSteps = project.nextSteps || [];
  const pendingSteps = nextSteps.filter(s => !s.done).length;

  const typeColors = {
    research: 'bg-white/10 text-white/70 border-white/15',
    development: 'bg-white/10 text-white/70 border-white/15',
  };
  const statusColors = {
    'not-started': 'bg-white/8 text-white/50 border-white/12',
    'in-progress': 'bg-white/10 text-white/70 border-white/15',
    completed: 'bg-white/12 text-white/80 border-white/18',
  };

  const daysLeft = project.endDate
    ? Math.ceil((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div
      onClick={onClick}
      className="glass-card p-5 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${typeColors[project.type] || ''}`}>
          {project.type}
        </span>
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${statusColors[project.status] || ''}`}>
          {project.status.replace('-', ' ')}
        </span>
      </div>
      <h3 className="text-base font-semibold text-white/90 mb-2">{project.title}</h3>
      <p className="text-sm text-white/50 mb-4 line-clamp-2">{project.description}</p>

      {/* Quick stats */}
      <div className="flex gap-3 mb-4 text-xs flex-wrap">
        <span className="text-white/40">📋 {totalTasks} tasks</span>
        {inProgressTasks > 0 && <span className="text-white/60">🔄 {inProgressTasks} active</span>}
        {pendingSteps > 0 && <span className="text-white/70">📌 {pendingSteps} next</span>}
        {daysLeft !== null && daysLeft > 0 && (
          <span className={daysLeft < 7 ? 'text-white/70' : 'text-white/40'}>
            ⏰ {daysLeft}d left
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 glass-progress h-2">
          <div
            className="glass-progress-bar h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-white/50 font-medium">{progress}%</span>
      </div>
    </div>
  );
}
