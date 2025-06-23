
import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Task, Habit, ChatMessage } from '../types';

export function useSampleData() {
  const { dispatch } = useApp();

  useEffect(() => {
    // Sample tasks
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Completar proyecto de Machine Learning',
        description: 'Implementar algoritmo de clasificación y documentar resultados',
        priority: 'high',
        status: 'in-progress',
        dueDate: new Date(2024, 11, 25),
        estimatedTime: 180,
        createdAt: new Date(2024, 11, 20),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Estudiar para examen de Algoritmos',
        description: 'Repasar capítulos 5-8 del libro de texto',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(2024, 11, 24),
        estimatedTime: 120,
        createdAt: new Date(2024, 11, 21),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Comprar ingredientes para cena',
        description: '',
        priority: 'low',
        status: 'pending',
        estimatedTime: 30,
        createdAt: new Date(2024, 11, 23),
        updatedAt: new Date(),
      },
      {
        id: '4',
        title: 'Revisar correos pendientes',
        description: 'Responder emails de profesores y compañeros',
        priority: 'medium',
        status: 'completed',
        estimatedTime: 45,
        createdAt: new Date(2024, 11, 22),
        updatedAt: new Date(),
      }
    ];

    // Sample habits
    const sampleHabits: Habit[] = [
      {
        id: '1',
        title: 'Leer 30 minutos',
        description: 'Lectura diaria para mejorar conocimientos',
        frequency: 'daily',
        streak: 5,
        lastCompleted: new Date(2024, 11, 22),
        createdAt: new Date(2024, 11, 18),
      },
      {
        id: '2',
        title: 'Ejercicio físico',
        description: '30 minutos de actividad física',
        frequency: 'daily',
        streak: 3,
        lastCompleted: new Date(2024, 11, 22),
        createdAt: new Date(2024, 11, 20),
      },
      {
        id: '3',
        title: 'Meditar',
        description: '10 minutos de meditación mindfulness',
        frequency: 'daily',
        streak: 7,
        lastCompleted: new Date(2024, 11, 22),
        createdAt: new Date(2024, 11, 16),
      }
    ];

    // Sample chat messages
    const sampleMessages: ChatMessage[] = [
      {
        id: '1',
        content: 'Hola Aegis, ¿cómo está mi día hoy?',
        sender: 'user',
        timestamp: new Date(2024, 11, 23, 9, 0),
        type: 'text'
      },
      {
        id: '2',
        content: '¡Buenos días! He revisado tu agenda y tienes 4 tareas pendientes. Tu proyecto de Machine Learning tiene prioridad alta y vence pronto. ¿Te ayudo a organizarte?',
        sender: 'aegis',
        timestamp: new Date(2024, 11, 23, 9, 1),
        type: 'text'
      },
      {
        id: '3',
        content: 'Sí, por favor ayúdame a priorizar',
        sender: 'user',
        timestamp: new Date(2024, 11, 23, 9, 2),
        type: 'text'
      },
      {
        id: '4',
        content: 'Perfecto. Te sugiero empezar con el proyecto de ML (3 horas), luego estudiar para el examen (2 horas), y dejar las tareas menores para la tarde. ¿Te parece bien este plan?',
        sender: 'aegis',
        timestamp: new Date(2024, 11, 23, 9, 3),
        type: 'suggestion'
      }
    ];

    // Initialize sample data
    dispatch({
      type: 'SET_INITIAL_DATA',
      payload: {
        tasks: sampleTasks,
        habits: sampleHabits,
        chatMessages: sampleMessages,
      }
    });
  }, [dispatch]);
}
