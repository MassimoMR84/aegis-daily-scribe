
import React, { useState } from 'react';
import { Bell, Moon, Sun, Smartphone, Calendar, Mail, User, Shield, Palette, Clock, Zap, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useApp } from '../contexts/AppContext';
import { toast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { state, dispatch } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [workingMode, setWorkingMode] = useState('assisted');
  const [chaosThreshold, setChaosThreshold] = useState([75]);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [syncCalendar, setSyncCalendar] = useState(false);
  const [syncEmail, setSyncEmail] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas correctamente.",
    });
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setDarkMode(false);
    setSoundEnabled(true);
    setWorkingMode('assisted');
    setChaosThreshold([75]);
    setAutoSchedule(true);
    setSyncCalendar(false);
    setSyncEmail(false);
    
    toast({
      title: "Configuración restablecida",
      description: "Se han restaurado los valores por defecto.",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
          <p className="text-gray-600">Personaliza tu experiencia con Aegis</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Restablecer
          </Button>
          <Button onClick={handleSaveSettings} className="bg-[#4F46E5] hover:bg-[#4338CA]">
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Modo de Trabajo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Modo de Trabajo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={workingMode} onValueChange={setWorkingMode}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="assisted" id="assisted" />
                <Label htmlFor="assisted" className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium">Asistido</span>
                    <span className="text-sm text-gray-500">Aegis te ayuda a organizar paso a paso</span>
                  </div>
                </Label>
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  Recomendado
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic" className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium">Automático</span>
                    <span className="text-sm text-gray-500">Aegis organiza tu día automáticamente</span>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chaos" id="chaos" />
                <Label htmlFor="chaos" className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium">Caos</span>
                    <span className="text-sm text-gray-500">Solo tareas esenciales y críticas</span>
                  </div>
                </Label>
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                  Emergencia
                </Badge>
              </div>
            </RadioGroup>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Umbral para Modo Caos: {chaosThreshold[0]}%</Label>
              <Slider
                value={chaosThreshold}
                onValueChange={setChaosThreshold}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Activa automáticamente el modo caos cuando tengas más del {chaosThreshold[0]}% de tareas pendientes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones push</Label>
                <p className="text-sm text-gray-500">Recibe recordatorios y alertas</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sonidos</Label>
                <p className="text-sm text-gray-500">Alertas sonoras para notificaciones</p>
              </div>
              <div className="flex items-center space-x-2">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-gray-500" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Programación automática</Label>
                <p className="text-sm text-gray-500">Aegis programa tareas automáticamente</p>
              </div>
              <Switch checked={autoSchedule} onCheckedChange={setAutoSchedule} />
            </div>
          </CardContent>
        </Card>

        {/* Apariencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Apariencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo oscuro</Label>
                <p className="text-sm text-gray-500">Cambia entre tema claro y oscuro</p>
              </div>
              <div className="flex items-center space-x-2">
                {darkMode ? <Moon className="w-4 h-4 text-gray-500" /> : <Sun className="w-4 h-4 text-gray-500" />}
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>

            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Vista previa del tema:</p>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-[#4F46E5] rounded"></div>
                <div className="w-8 h-8 bg-[#7C3AED] rounded"></div>
                <div className="w-8 h-8 bg-[#06B6D4] rounded"></div>
                <div className="w-8 h-8 bg-[#10B981] rounded"></div>
                <div className="w-8 h-8 bg-[#F97316] rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integraciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Integraciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div className="space-y-0.5">
                  <Label>Google Calendar</Label>
                  <p className="text-sm text-gray-500">Sincronizar eventos y horarios</p>
                </div>
              </div>
              <Switch checked={syncCalendar} onCheckedChange={setSyncCalendar} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500" />
                <div className="space-y-0.5">
                  <Label>Email</Label>
                  <p className="text-sm text-gray-500">Extraer tareas de correos</p>
                </div>
              </div>
              <Switch checked={syncEmail} onCheckedChange={setSyncEmail} />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Privacidad</p>
                  <p className="text-xs text-blue-700">
                    Aegis solo accede a la información necesaria para mejorar tu productividad
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horarios */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Horarios de Trabajo</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Horario de inicio</Label>
                <select className="w-full p-2 border border-gray-200 rounded-md">
                  <option>06:00</option>
                  <option>07:00</option>
                  <option selected>08:00</option>
                  <option>09:00</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label>Horario de fin</Label>
                <select className="w-full p-2 border border-gray-200 rounded-md">
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                  <option selected>22:00</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Días de trabajo</Label>
              <div className="flex flex-wrap gap-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                  <Button
                    key={day}
                    variant={index < 5 ? "default" : "outline"}
                    size="sm"
                    className={index < 5 ? "bg-[#4F46E5] hover:bg-[#4338CA]" : ""}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cuenta */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Cuenta</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Usuario Demo</p>
                <p className="text-sm text-gray-500">demo@aegis.app</p>
              </div>
              <Button variant="outline">Editar Perfil</Button>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1">
                Exportar Datos
              </Button>
              <Button variant="outline" className="flex-1">
                Importar Datos
              </Button>
              <Button variant="destructive" className="flex-1">
                Eliminar Cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
