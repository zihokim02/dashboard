import { useState, useEffect } from 'react';
import { loadData, saveData, generateId } from './store';
import Dashboard from './components/Dashboard';
import ProjectView from './components/ProjectView';
import ProjectForm from './components/ProjectForm';

const VIEWS = {
  DASHBOARD: 'dashboard',
  PROJECT: 'project',
  NEW_PROJECT: 'new-project',
  EDIT_PROJECT: 'edit-project',
};

export default function App() {
  const [data, setData] = useState(loadData);
  const [view, setView] = useState(VIEWS.DASHBOARD);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => { saveData(data); }, [data]);

  const selectedProject = data.projects.find(p => p.id === selectedProjectId);

  function addProject(project) {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: generateId(), createdAt: Date.now() }],
    }));
    setView(VIEWS.DASHBOARD);
  }

  function updateProject(updated) {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updated.id ? updated : p),
    }));
    if (view === VIEWS.EDIT_PROJECT) setView(VIEWS.PROJECT);
  }

  function deleteProject(id) {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    setView(VIEWS.DASHBOARD);
    setSelectedProjectId(null);
  }

  function openProject(id) {
    setSelectedProjectId(id);
    setView(VIEWS.PROJECT);
  }

  function updateTaskStatus(projectId, taskId, newStatus) {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t),
        };
      }),
    }));
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Nav */}
      <nav className="glass-nav px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
        <h1
          className="text-xl font-semibold text-white cursor-pointer tracking-tight"
          onClick={() => setView(VIEWS.DASHBOARD)}
        >
          <span className="mr-2">📊</span>Projects
        </h1>
        <div className="flex gap-2 ml-auto">
          <NavBtn active={view === VIEWS.DASHBOARD} onClick={() => setView(VIEWS.DASHBOARD)}>Overview</NavBtn>
          <button
            onClick={() => setView(VIEWS.NEW_PROJECT)}
            className="glass-button-primary px-4 py-2 text-sm font-medium"
          >
            + New Project
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6">
        {view === VIEWS.DASHBOARD && (
          <Dashboard projects={data.projects} onOpenProject={openProject} />
        )}
        {view === VIEWS.PROJECT && selectedProject && (
          <ProjectView
            project={selectedProject}
            onEdit={() => setView(VIEWS.EDIT_PROJECT)}
            onDelete={() => deleteProject(selectedProject.id)}
            onBack={() => setView(VIEWS.DASHBOARD)}
            onUpdateTask={(taskId, status) => updateTaskStatus(selectedProject.id, taskId, status)}
          />
        )}
        {view === VIEWS.NEW_PROJECT && (
          <ProjectForm onSubmit={addProject} onCancel={() => setView(VIEWS.DASHBOARD)} />
        )}
        {view === VIEWS.EDIT_PROJECT && selectedProject && (
          <ProjectForm
            project={selectedProject}
            onSubmit={updateProject}
            onCancel={() => setView(VIEWS.PROJECT)}
          />
        )}
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-white/15 text-white backdrop-blur-sm' 
          : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}
