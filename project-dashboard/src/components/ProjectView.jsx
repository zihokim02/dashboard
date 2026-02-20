import { useState } from 'react';

export default function ProjectView({ project, onEdit, onDelete, onBack, onUpdateTask, onAddNextStep, onToggleNextStep, onDeleteNextStep }) {
  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter(t => t.status === 'done').length;
  const progress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const statusCycle = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };

  return (
    <div>
      <button 
        onClick={onBack} 
        className="text-white/50 hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="glass-card p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TypeBadge type={project.type} />
              <StatusBadge status={project.status} />
            </div>
            <h2 className="text-2xl font-bold text-white/90">{project.title}</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onEdit} 
              className="glass-button px-4 py-2 text-sm"
            >
              Edit
            </button>
            <button 
              onClick={onDelete} 
              className="px-4 py-2 text-sm rounded-xl bg-white/10 text-white/70 border border-white/15 hover:bg-white/15 hover:text-white transition-all"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>

        <div className="flex gap-6 text-sm text-white/50 mb-5">
          <span className="flex items-center gap-1">📅 Start: {project.startDate || 'N/A'}</span>
          <span className="flex items-center gap-1">🏁 End: {project.endDate || 'N/A'}</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 glass-progress h-3">
            <div className="glass-progress-bar h-3 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-medium text-white/80">{progress}%</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Column */}
        <div>
          <h3 className="text-lg font-semibold text-white/90 mb-4">Tasks ({doneTasks}/{totalTasks})</h3>
          <div className="space-y-3">
            {project.tasks.map(task => (
              <TaskRow 
                key={task.id} 
                task={task} 
                onUpdate={() => onUpdateTask(task.id, statusCycle[task.status])} 
              />
            ))}
            {project.tasks.length === 0 && (
              <p className="text-white/40 text-sm italic">No tasks yet.</p>
            )}
          </div>
        </div>

        {/* Next Steps Column */}
        <div>
          <NextStepsList 
            steps={project.nextSteps || []} 
            onAdd={onAddNextStep}
            onToggle={onToggleNextStep}
            onDelete={onDeleteNextStep}
          />
        </div>
      </div>
    </div>
  );
}

function NextStepsList({ steps, onAdd, onToggle, onDelete }) {
  const [newStep, setNewStep] = useState('');
  const doneCount = steps.filter(s => s.done).length;

  function handleAdd(e) {
    e.preventDefault();
    if (!newStep.trim()) return;
    onAdd(newStep.trim());
    setNewStep('');
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white/90">Next Steps ({doneCount}/{steps.length})</h3>
      </div>

      {/* Add Step Input */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newStep}
          onChange={e => setNewStep(e.target.value)}
          placeholder="Add a next step..."
          className="flex-1 glass-input px-4 py-2 text-sm"
        />
        <button type="submit" className="glass-button px-4 py-2 text-sm font-medium">
          Add
        </button>
      </form>

      {/* Steps List */}
      <div className="space-y-2">
        {steps.map(step => (
          <div
            key={step.id}
            className={`flex items-center gap-3 glass-input px-3 py-2.5 transition-all ${
              step.done ? 'opacity-50' : ''
            }`}
          >
            <button
              onClick={() => onToggle(step.id)}
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                step.done 
                  ? 'bg-white/20 border-white/30' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              {step.done && <span className="text-white/80 text-xs">✓</span>}
            </button>
            <span className={`flex-1 text-sm ${step.done ? 'line-through text-white/40' : 'text-white/80'}`}>
              {step.title}
            </span>
            <button
              onClick={() => onDelete(step.id)}
              className="text-white/30 hover:text-white/60 text-sm px-2 py-1 rounded hover:bg-white/10 transition-all"
            >
              ✕
            </button>
          </div>
        ))}
        {steps.length === 0 && (
          <p className="text-white/40 text-sm italic text-center py-4">
            No next steps yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}

function TaskRow({ task, onUpdate }) {
  const statusStyles = {
    todo: { bg: 'bg-white/5', text: 'text-white/50', border: 'border-white/10', label: '⬜ To Do' },
    'in-progress': { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/15', label: '🔄 In Progress' },
    done: { bg: 'bg-white/15', text: 'text-white/90', border: 'border-white/20', label: '✅ Done' },
  };
  
  const style = statusStyles[task.status];
  
  return (
    <div
      className={`glass-card px-5 py-3 flex items-center justify-between ${task.status === 'done' ? 'opacity-60' : ''}`}
    >
      <span className={task.status === 'done' ? 'line-through text-white/40' : 'text-white/80'}>
        {task.title}
      </span>
      <button
        onClick={onUpdate}
        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${style.bg} ${style.text} ${style.border} hover:opacity-80`}
      >
        {style.label}
      </button>
    </div>
  );
}

function TypeBadge({ type }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-lg border font-medium bg-white/8 text-white/60 border-white/12">
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'not-started': 'bg-white/5 text-white/50 border-white/10',
    'in-progress': 'bg-white/10 text-white/70 border-white/15',
    completed: 'bg-white/15 text-white/80 border-white/20',
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${styles[status] || ''}`}>
      {status.replace('-', ' ')}
    </span>
  );
}
