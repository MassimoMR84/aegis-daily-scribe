
import React, { useState } from 'react';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../contexts/AppContext';

const CalendarPage = () => {
  const { state } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  // Sample events for demonstration
  const sampleEvents = [
    {
      id: '1',
      title: 'Matemáticas Discretas',
      start: new Date(2024, 11, 23, 9, 0),
      end: new Date(2024, 11, 23, 10, 30),
      type: 'class' as const,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Proyecto Final - Programación',
      start: new Date(2024, 11, 23, 14, 0),
      end: new Date(2024, 11, 23, 16, 0),
      type: 'task' as const,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      title: 'Gimnasio',
      start: new Date(2024, 11, 23, 18, 0),
      end: new Date(2024, 11, 23, 19, 30),
      type: 'habit' as const,
      color: 'bg-green-500'
    }
  ];

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const weekDays = getWeekDays(currentDate);
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getEventsForDay = (day: Date) => {
    return sampleEvents.filter(event => 
      event.start.toDateString() === day.toDateString()
    );
  };

  const getEventPosition = (event: typeof sampleEvents[0]) => {
    const startHour = event.start.getHours();
    const startMinute = event.start.getMinutes();
    const endHour = event.end.getHours();
    const endMinute = event.end.getMinutes();
    
    const top = ((startHour - 8) * 60 + startMinute) * (60 / 60); // 60px per hour
    const height = ((endHour - startHour) * 60 + (endMinute - startMinute)) * (60 / 60);
    
    return { top, height };
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {currentDate.toLocaleDateString('es-ES', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'week' 
                  ? 'bg-[#4F46E5] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'day' 
                  ? 'bg-[#4F46E5] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Día
            </button>
          </div>
          <Button className="bg-[#4F46E5] hover:bg-[#4338CA]">
            <Plus className="w-4 h-4 mr-2" />
            Evento
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Eventos Hoy</p>
                <p className="text-xl font-bold text-gray-900">
                  {getEventsForDay(new Date()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiempo Libre</p>
                <p className="text-xl font-bold text-gray-900">4h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Esta Semana</p>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Semanal</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Days Header */}
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 text-sm font-medium text-gray-500">Hora</div>
                {weekDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-4 text-center border-l border-gray-200 ${
                      isToday(day) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-500">
                      {dayNames[day.getDay()]}
                    </div>
                    <div className={`text-lg font-bold ${
                      isToday(day) ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid */}
              <div className="relative">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b border-gray-100">
                    <div className="p-2 text-right text-sm text-gray-500 border-r border-gray-200">
                      {hour}:00
                    </div>
                    {weekDays.map((day, dayIndex) => (
                      <div 
                        key={dayIndex} 
                        className="relative h-15 border-l border-gray-100 hover:bg-gray-50"
                        style={{ height: '60px' }}
                      >
                        {/* Events for this day */}
                        {getEventsForDay(day)
                          .filter(event => {
                            const eventHour = event.start.getHours();
                            return eventHour === hour;
                          })
                          .map((event) => {
                            const { top, height } = getEventPosition(event);
                            return (
                              <div
                                key={event.id}
                                className={`absolute left-1 right-1 ${event.color} text-white text-xs p-1 rounded shadow-sm overflow-hidden`}
                                style={{
                                  top: `${top % 60}px`,
                                  height: `${Math.min(height, 60 - (top % 60))}px`
                                }}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="opacity-90">
                                  {formatTime(event.start)} - {formatTime(event.end)}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Events */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getEventsForDay(new Date()).length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No hay eventos programados para hoy
              </p>
            ) : (
              getEventsForDay(new Date()).map((event) => (
                <div key={event.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                  <div className={`w-4 h-4 rounded-full ${event.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {event.type === 'class' ? 'Clase' : 
                     event.type === 'task' ? 'Tarea' : 'Hábito'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
