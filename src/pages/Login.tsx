import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/onboarding');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center dark:text-gray-100">Welcome Back</CardTitle>
          <CardDescription className="text-center dark:text-gray-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-200" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-200" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-pink text-white">
              Sign In
            </Button>
            <div className="text-center text-sm dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 