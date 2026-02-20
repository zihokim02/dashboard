import { useState } from 'react';
import { generateId } from '../store';

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    type: project?.type || 'research',
    status: project?.status || 'not-started',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    tasks: project?.tasks || [],
  });
  const [newTask, setNewTask] = useState('');

  function set(key, val) { setForm(prev => ({ ...prev, [key]: val })); }

  function addTask() {
    if (!newTask.trim()) return;
    set('tasks', [...form.tasks, { id: generateId(), title: newTask.trim(), status: 'todo' }]);
    setNewTask('');
  }

  function removeTask(id) {
    set('tasks', form.tasks.filter(t => t.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...project, ...form });
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white/90 mb-5">
        {project ? 'Edit Project' : 'New Project'}
      </h2>
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5 max-w-2xl">
        <Field label="Title">
          <input
            required value={form.title} onChange={e => set('title', e.target.value)}
            className="w-full glass-input px-4 py-2.5 text-sm"
            placeholder="Enter project title..."
          />
        </Field>
        <Field label="Description">
          <textarea
            value={form.description} onChange={e => set('description', e.target.value)} rows={3}
            className="w-full glass-input px-4 py-2.5 text-sm resize-none"
            placeholder="Describe your project..."
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Type">
            <select value={form.type} onChange={e => set('type', e.target.value)}
              className="w-full glass-input px-4 py-2.5 text-sm">
              <option value="research" className="bg-neutral-900">Research</option>
              <option value="development" className="bg-neutral-900">Development</option>
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={e => set('status', e.target.value)}
              className="w-full glass-input px-4 py-2.5 text-sm">
              <option value="not-started" className="bg-neutral-900">Not Started</option>
              <option value="in-progress" className="bg-neutral-900">In Progress</option>
              <option value="completed" className="bg-neutral-900">Completed</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date">
            <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)}
              className="w-full glass-input px-4 py-2.5 text-sm" />
          </Field>
          <Field label="End Date">
            <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)}
              className="w-full glass-input px-4 py-2.5 text-sm" />
          </Field>
        </div>

        {/* Tasks */}
        <Field label="Tasks">
          <div className="space-y-2 mb-3">
            {form.tasks.map(t => (
              <div key={t.id} className="flex items-center gap-3 glass-input px-3 py-2">
                <span className="text-sm text-white/70 flex-1">{t.title}</span>
                <button type="button" onClick={() => removeTask(t.id)}
                  className="text-white/40 hover:text-white/70 text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition-all">✕</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newTask} onChange={e => setNewTask(e.target.value)}
              placeholder="Add a task..."
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTask())}
              className="flex-1 glass-input px-4 py-2.5 text-sm"
            />
            <button type="button" onClick={addTask}
              className="glass-button px-4 py-2.5 text-sm font-medium">Add</button>
          </div>
        </Field>

        <div className="flex gap-3 pt-3">
          <button type="submit" className="glass-button-primary px-6 py-2.5 text-sm font-medium">
            {project ? 'Save Changes' : 'Create Project'}
          </button>
          <button type="button" onClick={onCancel} className="glass-button px-6 py-2.5 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm text-white/50 mb-2">{label}</label>
      {children}
    </div>
  );
}
