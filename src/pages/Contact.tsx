import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { SEO } from '../components/SEO';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    'your-name': '',
    'your-email': '',
    'your-subject': '',
    'your-message': ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formId = import.meta.env.VITE_CF7_FORM_ID || '1'; // Fallback to 1 or let user configure

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value as string);
      });
      
      // CF7 requires these hidden fields to process the REST API request correctly
      data.append('_wpcf7', formId);
      data.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);

      const response = await submitContactForm(formId, data);
      
      if (response.status === 'mail_sent') {
        setStatus('success');
        setFormData({
          'your-name': '',
          'your-email': '',
          'your-subject': '',
          'your-message': ''
        });
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'There was an error trying to send your message. Please try again later.');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to connect to the server. Please check your API configuration.');
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us",
    "description": "Have a question or want to get in touch? We'd love to hear from you.",
    "url": window.location.href
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Contact Us"
        description="Have a question or want to get in touch? We'd love to hear from you."
        canonicalUrl={window.location.href}
        schema={contactSchema}
      />
      {/* Hero Section */}
      <div className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Have a question or want to get in touch? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you have a question about features, trials, pricing, need a demo, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">support@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="mt-1 text-gray-600">
                    123 Commerce Street<br />
                    Suite 100<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-gray-50 p-8 sm:p-10 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            
            {status === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-md p-4">
                Thank you for your message. It has been sent successfully.
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="your-name" className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    name="your-name"
                    id="your-name"
                    required
                    value={formData['your-name']}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3 border bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="your-email" className="block text-sm font-medium text-gray-700">Your Email</label>
                  <input
                    type="email"
                    name="your-email"
                    id="your-email"
                    required
                    value={formData['your-email']}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3 border bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="your-subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="your-subject"
                  id="your-subject"
                  required
                  value={formData['your-subject']}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3 border bg-white"
                />
              </div>

              <div>
                <label htmlFor="your-message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="your-message"
                  id="your-message"
                  rows={5}
                  required
                  value={formData['your-message']}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3 border bg-white"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Note: This form requires the Contact Form 7 plugin to be installed and configured on your WordPress backend.
                Please ensure VITE_CF7_FORM_ID is set in your environment variables.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
