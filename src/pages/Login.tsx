import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAppStore } from '../store/useAppStore';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAppStore(state => state.login);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    login({ id: '1', name: 'Alex Doe', email: data.email, role: 'Admin' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-0">
      <div className="blob-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 md:p-10 !rounded-[40px] shadow-[var(--shadow-clay-hover)] bg-card/80 backdrop-blur-xl border border-white/20">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-[20px] flex items-center justify-center shadow-[var(--shadow-clay-sm)] mb-6 transform rotate-3">
              <span className="text-white font-bold text-3xl -rotate-3">J</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-text-muted">Sign in to Jemx CRM to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input 
                  {...register("email")}
                  type="email" 
                  placeholder="name@company.com" 
                  className="pl-12" 
                />
              </div>
              {errors.email && <p className="text-danger text-xs pl-4">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-12 pr-12" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs pl-4">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded-md border-black/10 text-primary focus:ring-primary h-4 w-4 bg-background shadow-inner" />
                <span className="text-text-muted font-medium">Remember me</span>
              </label>
              <a href="#" className="text-primary font-semibold hover:underline">Forgot Password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-8 bg-gradient-to-r from-primary to-secondary border-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
