import React, { useState } from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { HerAiLogo } from './HerAiLogo';
import { X, Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: { email: string; password: string }) => Promise<void>;
  onRegister: (data: { name: string; email: string; password: string }) => Promise<void>;
  language: SupportedLanguage;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await onLogin({ email, password });
      } else {
        await onRegister({ name, email, password });
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#FCE4EC] relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#292326]/60 hover:text-[#292326] rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex justify-center mb-3">
          <HerAiLogo size="md" showText={true} />
        </div>

        <h3 className="text-xl font-black text-[#542A46] text-center">
          {mode === 'login' ? 'Sign In to HerAI' : 'Create Your HerAI Account'}
        </h3>
        <p className="text-xs text-[#292326]/70 text-center mt-1">
          Save your application journey, checklist, and preferences across devices.
        </p>

        {/* Tab switch */}
        <div className="flex bg-[#FCE4EC]/50 p-1 rounded-xl my-4">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#542A46] shadow-xs'
                : 'text-[#292326]/60 hover:text-[#542A46]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-[#542A46] shadow-xs'
                : 'text-[#292326]/60 hover:text-[#542A46]'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-[#542A46] mb-1">
                Your Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#292326]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Devi"
                  className="w-full bg-[#FFF9F5] border border-[#FCE4EC] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#292326] focus:outline-none focus:ring-2 focus:ring-[#E95D8A]/30"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#542A46] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#292326]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#FFF9F5] border border-[#FCE4EC] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#292326] focus:outline-none focus:ring-2 focus:ring-[#E95D8A]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#542A46] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#292326]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#FFF9F5] border border-[#FCE4EC] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#292326] focus:outline-none focus:ring-2 focus:ring-[#E95D8A]/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-xs sm:text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-center text-[#292326]/60">
          First-time user? You can always use HerAI as a guest without creating an account.
        </p>
      </div>
    </div>
  );
};
