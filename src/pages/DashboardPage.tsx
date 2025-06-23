
import React from 'react';
import { Calendar, CheckSquare, Target, TrendingUp, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { state } = useApp();
  const navigate = useNavigate();

  const today = new Date();
  const todayTasks = state.tasks.filter(task => 
    task.status === 'pending' && 
    (!task.dueDate || task.dueDate.toDateString() === today.toDateString())
  );
  
  const completedTasks = state.tasks.filter(task => task.status === 'completed');
  const totalTasks = state.tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

  const todayHabits = state.habits.filter(habit => 
    !habit.lastCompleted || habit.lastCompleted.toDateString() !== today.toDateString()
  );

  const completedHabitsToday = state.habits.filter(habit =>
    habit.lastCompleted?.toDateString() === today.toDateString()
  );

  const habitsCompletionRate = state.habits.length > 0 
    ? (completedHabitsToday.length / state.habits.length) * 100 
    : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getProductivityStatus = () => {
    const avgRate = (completionRate + habitsCompletionRate) / 2;
    if (avgRate >= 80) return { status: 'Excelente', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (avgRate >= 60) return { status: 'Bien', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (avgRate >= 40) return { status: 'Regular', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { status: 'Necesita atención', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const productivityStatus = getProductivityStatus();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, Usuario
          </h1>
          <p className="text-gray-600">
            Aquí tienes un resumen de tu día
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={`${productivityStatus.bgColor} ${productivityStatus.color} border-0`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {productivityStatus.status}
          </Badge>
          <Button 
            variant="outline" 
            onClick={() => navigate('/chat')}
            className="border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
          >
            <Zap className="w-4 h-4 mr-2" />
            Hablar con Aegis
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tareas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">{todayTasks.length}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hábitos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedHabitsToday.length}/{state.habits.length}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completado</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(completionRate)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo Libre</p>
                <p className="text-2xl font-bold text-gray-900">4h</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5" />
              <span>Progreso de Tareas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tareas Completadas</span>
                <span>{completedTasks.length}/{totalTasks}</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Tareas Prioritarias</h4>
              {todayTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="flex-1 truncate">{task.title}</span>
                </div>
              ))}
              {todayTasks.length === 0 && (
                <p className="text-sm text-gray-500">¡No hay tareas pendientes para hoy!</p>
              )}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/tasks')}
              className="w-full"
            >
              Ver Todas las Tareas
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Hábitos de Hoy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progreso Diario</span>
                <span>{Math.round(habitsCompletionRate)}%</span>
              </div>
              <Progress value={habitsCompletionRate} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Pendientes</h4>
              {todayHabits.slice(0, 3).map((habit) => (
                <div key={habit.id} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="flex-1 truncate">{habit.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {habit.streak} días
                  </Badge>
                </div>
              ))}
              {todayHabits.length === 0 && (
                <p className="text-sm text-gray-500">¡Todos los hábitos completados!</p>
              )}
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/habits')}
              className="w-full"
            >
              Ver Todos los Hábitos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/chat')}
            >
              <Zap className="w-6 h-6 text-[#4F46E5]" />
              <span>Organizar con Aegis</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/tasks')}
            >
              <CheckSquare className="w-6 h-6 text-blue-500" />
              <span>Agregar Tarea</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="w-6 h-6 text-green-500" />
              <span>Ver Calendario</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aegis Suggestion */}
      {(todayTasks.length > 5 || habitsCompletionRate < 50) && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-aegis-gradient flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Sugerencia de Aegis</h3>
                <p className="text-sm text-gray-700 mb-3">
                  {todayTasks.length > 5 
                    ? "Tienes muchas tareas para hoy. ¿Te ayudo a priorizarlas o activamos el modo Caos?"
                    : "Tu progreso en hábitos puede mejorar. ¿Hablamos sobre cómo organizarte mejor?"
                  }
                </p>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/chat')}
                  className="bg-[#4F46E5] hover:bg-[#4338CA]"
                >
                  Hablar con Aegis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
