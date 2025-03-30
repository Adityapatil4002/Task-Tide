
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Moon, Sun, UserRound, Bell, Mail, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { UserProvider, useUser } from '../contexts/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div 
            className={`cursor-pointer border rounded-lg p-3 flex justify-center items-center flex-col gap-2 ${theme === 'light' ? 'border-primary bg-primary/10' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Sun className="h-6 w-6" />
            <span>Light</span>
          </div>
          
          <div 
            className={`cursor-pointer border rounded-lg p-3 flex justify-center items-center flex-col gap-2 ${theme === 'dark' ? 'border-primary bg-primary/10' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Moon className="h-6 w-6" />
            <span>Dark</span>
          </div>
          
          <div 
            className={`cursor-pointer border rounded-lg p-3 flex justify-center items-center flex-col gap-2 ${theme === 'system' ? 'border-primary bg-primary/10' : ''}`}
            onClick={() => setTheme('system')}
          >
            <div className="flex">
              <Sun className="h-6 w-6" />
              <Moon className="h-6 w-6" />
            </div>
            <span>System</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProfileSettings = () => {
  const { userProfile, updateProfile } = useUser();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form is already updating via controlled inputs
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={userProfile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={userProfile.email}
              onChange={(e) => updateProfile({ email: e.target.value })}
            />
          </div>
          
          <Button type="submit">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const NotificationSettings = () => {
  const { userProfile, updateProfile } = useUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about task updates
            </p>
          </div>
          <Switch 
            id="notifications"
            checked={userProfile.notificationsEnabled}
            onCheckedChange={(checked) => updateProfile({ notificationsEnabled: checked })}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-digest">Email Digest</Label>
            <p className="text-sm text-muted-foreground">
              Receive a weekly summary of your tasks
            </p>
          </div>
          <Switch 
            id="email-digest"
            checked={userProfile.emailDigest}
            onCheckedChange={(checked) => updateProfile({ emailDigest: checked })}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sound-effects">Sound Effects</Label>
            <p className="text-sm text-muted-foreground">
              Play sounds when completing tasks
            </p>
          </div>
          <Switch 
            id="sound-effects"
            checked={userProfile.soundEffects}
            onCheckedChange={(checked) => updateProfile({ soundEffects: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const SettingsContent = () => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile" className="flex gap-2 items-center">
          <UserRound className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex gap-2 items-center">
          <Sun className="h-4 w-4" />
          Appearance
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex gap-2 items-center">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>
      
      <TabsContent value="appearance">
        <ThemeSettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
};

const Settings = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col">
          <div className="animated-background"></div>
          
          <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <h1 className="text-xl font-bold">Settings</h1>
              </div>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-8">
            <SettingsContent />
          </main>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Settings;
