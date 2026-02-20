const STORAGE_KEY = 'project-dashboard-data';

const defaultData = {
  projects: [
    {
      id: '1',
      title: 'Sample Research Project',
      description: 'A sample project to demonstrate the dashboard',
      type: 'research',
      status: 'in-progress',
      startDate: '2025-01-01',
      endDate: '2025-03-01',
      tasks: [
        { id: 't1', title: 'Literature review', status: 'done' },
        { id: 't2', title: 'Data collection', status: 'in-progress' },
        { id: 't3', title: 'Analysis', status: 'todo' },
        { id: 't4', title: 'Write report', status: 'todo' },
      ],
      nextSteps: [
        { id: 'ns1', title: 'Review collected data', done: false },
        { id: 'ns2', title: 'Prepare presentation slides', done: false },
      ],
      createdAt: Date.now(),
    },
    {
      id: '2',
      title: 'Dashboard App',
      description: 'Build the project management dashboard',
      type: 'development',
      status: 'in-progress',
      startDate: '2025-01-15',
      endDate: '2025-02-15',
      tasks: [
        { id: 't5', title: 'Setup project', status: 'done' },
        { id: 't6', title: 'Build UI components', status: 'done' },
        { id: 't7', title: 'Implement Kanban', status: 'in-progress' },
        { id: 't8', title: 'Add Gantt chart', status: 'todo' },
        { id: 't9', title: 'Testing', status: 'todo' },
      ],
      nextSteps: [
        { id: 'ns3', title: 'Create GitHub account', done: true },
        { id: 'ns4', title: 'Create Vercel account', done: true },
        { id: 'ns5', title: 'Push project to GitHub', done: true },
        { id: 'ns6', title: 'Deploy to Vercel', done: true },
      ],
      createdAt: Date.now(),
    },
  ],
};

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      // Migrate old projects without nextSteps
      data.projects = data.projects.map(p => ({
        ...p,
        nextSteps: p.nextSteps || [],
      }));
      return data;
    }
  } catch (e) { /* ignore */ }
  return defaultData;
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
