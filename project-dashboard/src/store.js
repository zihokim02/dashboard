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
      createdAt: Date.now(),
    },
  ],
};

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return defaultData;
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
