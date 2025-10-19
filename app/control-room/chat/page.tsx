'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Shield, Heart, Car, User, Clock, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderRole: 'admin' | 'security' | 'medical' | 'traffic' | 'control-room';
  message: string;
  timestamp: string;
  read: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Security Chief',
    senderRole: 'security',
    message: 'High crowd density detected in Main Darshan Hall. Deploying additional personnel.',
    timestamp: '2025-10-08T10:05:00',
    read: true,
  },
  {
    id: '2',
    sender: 'Control Room',
    senderRole: 'control-room',
    message: 'Acknowledged. Please provide status updates every 10 minutes.',
    timestamp: '2025-10-08T10:06:00',
    read: true,
  },
  {
    id: '3',
    sender: 'Medical Team',
    senderRole: 'medical',
    message: 'Emergency patient stabilized. Ambulance AMB-002 returning to base.',
    timestamp: '2025-10-08T10:08:00',
    read: true,
  },
  {
    id: '4',
    sender: 'Traffic Manager',
    senderRole: 'traffic',
    message: 'Parking Lot B is now full. Diverting incoming vehicles to Lot C.',
    timestamp: '2025-10-08T10:10:00',
    read: true,
  },
  {
    id: '5',
    sender: 'Control Room',
    senderRole: 'control-room',
    message: 'All departments: Prepare for afternoon rush. Expected crowd surge at 12 PM.',
    timestamp: '2025-10-08T10:12:00',
    read: true,
  },
  {
    id: '6',
    sender: 'Security Chief',
    senderRole: 'security',
    message: 'Crowd levels reducing. Extra personnel can be reassigned.',
    timestamp: '2025-10-08T10:15:00',
    read: false,
  },
];

export default function ControlRoomChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const filteredMessages = messages.filter(
    (msg) => selectedDepartment === 'all' || msg.senderRole === selectedDepartment
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: String(messages.length + 1),
        sender: 'Control Room',
        senderRole: 'control-room',
        message: newMessage,
        timestamp: new Date().toISOString(),
        read: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const getRoleConfig = (role: Message['senderRole']) => {
    const configs = {
      admin: {
        icon: User,
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        bgColor: 'bg-purple-50 dark:bg-purple-950',
      },
      security: {
        icon: Shield,
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        bgColor: 'bg-red-50 dark:bg-red-950',
      },
      medical: {
        icon: Heart,
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        bgColor: 'bg-green-50 dark:bg-green-950',
      },
      traffic: {
        icon: Car,
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        bgColor: 'bg-blue-50 dark:bg-blue-950',
      },
      'control-room': {
        icon: User,
        color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
        bgColor: 'bg-indigo-50 dark:bg-indigo-950',
      },
    };
    return configs[role];
  };

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.read).length,
    security: messages.filter((m) => m.senderRole === 'security').length,
    medical: messages.filter((m) => m.senderRole === 'medical').length,
    traffic: messages.filter((m) => m.senderRole === 'traffic').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Inter-Department Chat</h1>
            <p className="text-muted-foreground mt-1">
              Real-time communication between departments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-1 animate-pulse" />
              Online
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Send className="h-8 w-8 text-primary opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.unread}</p>
              </div>
              <Badge className="h-8 w-8 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 flex items-center justify-center font-bold">
                {stats.unread}
              </Badge>
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security</p>
                <p className="text-2xl font-bold mt-1">{stats.security}</p>
              </div>
              <Shield className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medical</p>
                <p className="text-2xl font-bold mt-1">{stats.medical}</p>
              </div>
              <Heart className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Traffic</p>
                <p className="text-2xl font-bold mt-1">{stats.traffic}</p>
              </div>
              <Car className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Department Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Departments</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedDepartment('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedDepartment === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  All Departments
                </button>
                <button
                  onClick={() => setSelectedDepartment('security')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedDepartment === 'security'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Security
                </button>
                <button
                  onClick={() => setSelectedDepartment('medical')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedDepartment === 'medical'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  Medical
                </button>
                <button
                  onClick={() => setSelectedDepartment('traffic')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedDepartment === 'traffic'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Car className="h-4 w-4" />
                  Traffic
                </button>
                <button
                  onClick={() => setSelectedDepartment('admin')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedDepartment === 'admin'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      : 'hover:bg-muted'
                  }`}
                >
                  <User className="h-4 w-4" />
                  Admin
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-card border rounded-lg flex flex-col h-[600px]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredMessages.map((msg) => {
                  const roleConfig = getRoleConfig(msg.senderRole);
                  const RoleIcon = roleConfig.icon;

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.senderRole === 'control-room' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-full ${roleConfig.color} flex items-center justify-center flex-shrink-0`}>
                        <RoleIcon className="h-5 w-5" />
                      </div>
                      <div
                        className={`flex-1 max-w-md ${
                          msg.senderRole === 'control-room' ? 'text-right' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{msg.sender}</span>
                          <Badge className={roleConfig.color} variant="outline">
                            {msg.senderRole.replace('-', ' ').toUpperCase()}
                          </Badge>
                          {msg.read && (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          )}
                        </div>
                        <div
                          className={`${roleConfig.bgColor} border rounded-lg p-3 ${
                            msg.senderRole === 'control-room' ? 'rounded-tr-none' : 'rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(msg.timestamp).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • Messages are sent to all departments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
