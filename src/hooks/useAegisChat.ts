
import { useState, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { ChatMessage } from '../types';

const AEGIS_RESPONSES = {
  greeting: [
    "¡Hola! Soy Aegis, tu asistente personal. ¿En qué puedo ayudarte hoy?",
    "¡Buenos días! ¿Cómo te sientes hoy? ¿Listos para organizarnos?",
    "¡Hola de nuevo! ¿Qué tienes planeado para hoy?"
  ],
  taskHelp: [
    "Perfecto, te ayudo a organizar tus tareas. ¿Quieres que revise tu lista actual?",
    "Veo que tienes algunas tareas pendientes. ¿Te ayudo a priorizarlas?",
    "¿Prefieres que divida alguna tarea grande en subtareas más pequeñas?"
  ],
  chaos: [
    "Veo que estás un poco saturado. ¿Activamos el modo Caos para enfocarnos en lo esencial?",
    "Parece que hay mucho en tu plato. Te sugiero priorizar solo las tareas más críticas por ahora.",
    "Modo Caos activado. Vamos a simplificar tu día y enfocarnos en lo más importante."
  ],
  encouragement: [
    "¡Vas genial! Has completado varias tareas hoy.",
    "Me gusta ver tu progreso. ¡Sigue así!",
    "Recuerda tomar descansos. El bienestar es tan importante como la productividad."
  ],
  schedule: [
    "Revisando tu calendario... Te sugiero algunos bloques de tiempo para tus tareas pendientes.",
    "He reorganizado tu día para optimizar tu tiempo y energía.",
    "¿Qué tal si reservamos la mañana para las tareas más importantes?"
  ]
};

export function useAegisChat() {
  const { state, dispatch } = useApp();
  const [isTyping, setIsTyping] = useState(false);

  const getRandomResponse = useCallback((category: keyof typeof AEGIS_RESPONSES) => {
    const responses = AEGIS_RESPONSES[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const getAegisResponse = useCallback((userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hola') || message.includes('buenos') || message.includes('hey')) {
      return getRandomResponse('greeting');
    }
    
    if (message.includes('tareas') || message.includes('organizar') || message.includes('pendiente')) {
      return getRandomResponse('taskHelp');
    }
    
    if (message.includes('saturado') || message.includes('estrés') || message.includes('caos') || message.includes('mucho')) {
      return getRandomResponse('chaos');
    }
    
    if (message.includes('bien') || message.includes('progreso') || message.includes('completé')) {
      return getRandomResponse('encouragement');
    }
    
    if (message.includes('calendario') || message.includes('horario') || message.includes('tiempo')) {
      return getRandomResponse('schedule');
    }
    
    // Respuesta por defecto con contexto del estado actual
    const pendingTasks = state.tasks.filter(task => task.status === 'pending').length;
    if (pendingTasks > 5) {
      return getRandomResponse('chaos');
    } else if (pendingTasks > 0) {
      return getRandomResponse('taskHelp');
    } else {
      return getRandomResponse('encouragement');
    }
  }, [state.tasks, getRandomResponse]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setIsTyping(true);

    // Simular tiempo de respuesta de Aegis
    setTimeout(() => {
      const aegisResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAegisResponse(content),
        sender: 'aegis',
        timestamp: new Date(),
        type: 'text'
      };

      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aegisResponse });
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 segundos

  }, [dispatch, getAegisResponse]);

  return {
    messages: state.chatMessages,
    sendMessage,
    isTyping
  };
}
