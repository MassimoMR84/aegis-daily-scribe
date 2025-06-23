
import React, { useState } from 'react';
import { Plus, Filter, Clock, Flag, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../contexts/AppContext';
import { Task } from '../types';

const TasksPage = () => {
  const { state, dispatch } = useApp();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        priority: 'medium',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setNewTaskTitle('');
    }
  };

  const toggleTaskStatus = (taskId: string, currentStatus: Task['status']) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    dispatch({ 
      type: 'UPDATE_TASK', 
      payload: { id: taskId, updates: { status: newStatus } } 
    });
  };

  const filteredTasks = state.tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    return status === 'completed' ? '✓' : '○';
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Tareas</h1>
          <p className="text-gray-600">
            {state.tasks.filter(t => t.status === 'pending').length} pendientes, {' '}
            {state.tasks.filter(t => t.status === 'completed').length} completadas
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <Button 
            className="bg-[#4F46E5] hover:bg-[#4338CA]"
            onClick={() => {
              const title = prompt('Título de la nueva tarea:');
              if (title) {
                setNewTaskTitle(title);
                addTask();
              }
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      {/* Quick Add */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Agregar nueva tarea..."
              className="flex-1"
            />
            <Button onClick={addTask} disabled={!newTaskTitle.trim()}>
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 w-fit">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'pending', label: 'Pendientes' },
          { key: 'completed', label: 'Completadas' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-[#4F46E5] text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'No hay tareas' : 
                 filter === 'pending' ? 'No hay tareas pendientes' : 
                 'No hay tareas completadas'}
              </h3>
              <p className="text-gray-600">
                {filter === 'pending' ? '¡Buen trabajo! Has completado todas tus tareas.' : 
                 'Agrega algunas tareas para empezar a organizarte.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card 
              key={task.id} 
              className={`transition-all hover:shadow-md ${
                task.status === 'completed' ? 'opacity-75' : ''
              }`}
            >
              <CardContent className="py-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleTaskStatus(task.id, task.status)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${
                      task.status === 'completed'
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-[#4F46E5] text-gray-400 hover:text-[#4F46E5]'
                    }`}
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium ${
                      task.status === 'completed' 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                    {task.dueDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Vence: {task.dueDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority}
                    </Badge>
                    
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
