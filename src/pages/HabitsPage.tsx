
import React, { useState } from 'react';
import { Plus, Target, Calendar, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../contexts/AppContext';
import { Habit } from '../types';

const HabitsPage = () => {
  const { state, dispatch } = useApp();

  const markHabitComplete = (habitId: string) => {
    const habit = state.habits.find(h => h.id === habitId);
    if (habit) {
      const today = new Date();
      const lastCompleted = habit.lastCompleted;
      const isToday = lastCompleted && 
        lastCompleted.toDateString() === today.toDateString();

      if (!isToday) {
        dispatch({
          type: 'UPDATE_HABIT',
          payload: {
            id: habitId,
            updates: {
              lastCompleted: today,
              streak: habit.streak + 1
            }
          }
        });
      }
    }
  };

  const addSampleHabits = () => {
    const sampleHabits: Habit[] = [
      {
        id: '1',
        title: 'Leer 30 minutos',
        description: 'Lectura diaria para mejorar conocimientos',
        frequency: 'daily',
        streak: 5,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Ejercicio',
        description: 'Actividad física regular',
        frequency: 'daily',
        streak: 3,
        createdAt: new Date(),
      },
      {
        id: '3',
        title: 'Meditar',
        description: '10 minutos de meditación',
        frequency: 'daily',
        streak: 7,
        createdAt: new Date(),
      }
    ];

    sampleHabits.forEach(habit => {
      dispatch({ type: 'ADD_HABIT', payload: habit });
    });
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-green-600 bg-green-100';
    if (streak >= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getTodayProgress = () => {
    const today = new Date().toDateString();
    const completedToday = state.habits.filter(habit => 
      habit.lastCompleted?.toDateString() === today
    ).length;
    return state.habits.length > 0 ? (completedToday / state.habits.length) * 100 : 0;
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Hábitos</h1>
          <p className="text-gray-600">
            Construye rutinas positivas día a día
          </p>
        </div>
        
        <Button 
          className="bg-[#4F46E5] hover:bg-[#4338CA]"
          onClick={state.habits.length === 0 ? addSampleHabits : undefined}
        >
          <Plus className="w-4 h-4 mr-2" />
          {state.habits.length === 0 ? 'Agregar Hábitos de Ejemplo' : 'Nuevo Hábito'}
        </Button>
      </div>

      {/* Daily Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-[#4F46E5]" />
            <span>Progreso de Hoy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hábitos completados</span>
              <span>{Math.round(getTodayProgress())}%</span>
            </div>
            <Progress value={getTodayProgress()} className="h-2" />
            <p className="text-xs text-gray-600">
              {state.habits.filter(h => h.lastCompleted?.toDateString() === new Date().toDateString()).length} de {state.habits.length} hábitos completados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      <div className="space-y-4">
        {state.habits.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¡Empieza a construir hábitos!
              </h3>
              <p className="text-gray-600 mb-4">
                Los pequeños cambios diarios crean grandes resultados.
              </p>
              <Button onClick={addSampleHabits} variant="outline">
                Agregar algunos hábitos de ejemplo
              </Button>
            </CardContent>
          </Card>
        ) : (
          state.habits.map((habit) => {
            const isCompletedToday = habit.lastCompleted?.toDateString() === new Date().toDateString();
            
            return (
              <Card key={habit.id} className="transition-all hover:shadow-md">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => markHabitComplete(habit.id)}
                        disabled={isCompletedToday}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isCompletedToday
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-[#4F46E5] text-gray-400 hover:text-[#4F46E5]'
                        }`}
                      >
                        {isCompletedToday ? '✓' : '○'}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          isCompletedToday ? 'text-green-700' : 'text-gray-900'
                        }`}>
                          {habit.title}
                        </h3>
                        {habit.description && (
                          <p className="text-sm text-gray-600">{habit.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getStreakColor(habit.streak)} border-0`}>
                        <Flame className="w-3 h-3 mr-1" />
                        {habit.streak} días
                      </Badge>
                      
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {habit.frequency === 'daily' ? 'Diario' : 
                         habit.frequency === 'weekly' ? 'Semanal' : 'Mensual'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Streak Achievements */}
      {state.habits.some(h => h.streak >= 7) && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Flame className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">¡Increíble racha!</h3>
                <p className="text-sm text-yellow-700">
                  Tienes hábitos con más de 7 días consecutivos. ¡Sigue así!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HabitsPage;
