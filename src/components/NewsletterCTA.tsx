import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { submitContactForm } from '../services/api';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const formId = import.meta.env.VITE_CF7_NEWSLETTER_ID || '0b0e2f0';
      const formData = new FormData();
      
      // CF7 default email field name is usually 'your-email', but we also send 'email' just in case
      formData.append('your-email', email);
      formData.append('email', email);
      
      // CF7 requires these hidden fields to process the REST API request correctly
      formData.append('_wpcf7', formId);
      formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);

      const response = await submitContactForm(formId, formData);

      if (response.status === 'mail_sent' || response.status === 'success') {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-900 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Newsletter</h2>
        <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
          Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered directly to your inbox.
        </p>
        
        {status === 'success' ? (
          <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg inline-block">
            Thanks for subscribing! Keep an eye on your inbox.
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="flex-1 flex flex-col gap-2 text-left">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all" 
                required 
                disabled={status === 'loading'}
              />
              {status === 'error' && (
                <span className="text-red-400 text-sm px-1">{errorMessage}</span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-[58px]"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Subscribe <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
