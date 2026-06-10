'use client'

import React, { useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'

interface ContactFormProps {
  formType: 'contact' | 'client' | 'careers'
}

export const ContactForm: React.FC<ContactFormProps> = ({ formType }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpar erro ao digitar
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validate = () => {
    const tempErrors: Record<string, string> = {}
    
    if (formType === 'contact') {
      if (!formData.name) tempErrors.name = 'forms.requiredError'
      if (!formData.phone) tempErrors.phone = 'forms.requiredError'
      if (!formData.subject) tempErrors.subject = 'forms.requiredError'
      if (!formData.message) tempErrors.message = 'forms.requiredError'
    } else if (formType === 'client') {
      if (!formData.companyName) tempErrors.companyName = 'forms.requiredError'
      if (!formData.cnpj) tempErrors.cnpj = 'forms.requiredError'
      if (!formData.contactName) tempErrors.contactName = 'forms.requiredError'
      if (!formData.phone) tempErrors.phone = 'forms.requiredError'
      if (!formData.email) tempErrors.email = 'forms.requiredError'
      if (!formData.cityState) tempErrors.cityState = 'forms.requiredError'
    } else if (formType === 'careers') {
      if (!formData.name) tempErrors.name = 'forms.requiredError'
      if (!formData.email) tempErrors.email = 'forms.requiredError'
      if (!formData.phone) tempErrors.phone = 'forms.requiredError'
      if (!formData.position) tempErrors.position = 'forms.requiredError'
      if (!formData.message) tempErrors.message = 'forms.requiredError'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType,
          ...formData
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSuccess(true)
        setFormData({})
        // Redirecionar para o WhatsApp após um breve delay
        setTimeout(() => {
          window.open(result.whatsappUrl, '_blank')
        }, 1500)
      } else {
        setErrors({ apiError: result.error || 'Ocorreu um erro ao enviar.' })
      }
    } catch {
      setErrors({ apiError: 'Erro de conexão com o servidor.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form-wrapper glass">
      {success ? (
        <div className="success-message">
          <svg className="success-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3>{t('forms.successMessage')}</h3>
          <p className="redirect-text">{t('forms.whatsappRedirect')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form">
          {errors.apiError && <div className="api-error">{errors.apiError}</div>}

          {formType === 'contact' && (
            <>
              <div className="form-group">
                <label className="form-label">{t('forms.name')}</label>
                <input 
                  type="text" 
                  name="name" 
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  value={formData.name || ''} 
                  onChange={handleChange} 
                />
                {errors.name && <span className="error-text">{t(errors.name)}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.phone')}</label>
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="(21) 99999-9999"
                  className={`form-control ${errors.phone ? 'error' : ''}`}
                  value={formData.phone || ''} 
                  onChange={handleChange} 
                />
                {errors.phone && <span className="error-text">{t(errors.phone)}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.subject')}</label>
                <input 
                  type="text" 
                  name="subject" 
                  className={`form-control ${errors.subject ? 'error' : ''}`}
                  value={formData.subject || ''} 
                  onChange={handleChange} 
                />
                {errors.subject && <span className="error-text">{t(errors.subject)}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.message')}</label>
                <textarea 
                  name="message" 
                  rows={4}
                  className={`form-control ${errors.message ? 'error' : ''}`}
                  value={formData.message || ''} 
                  onChange={handleChange} 
                />
                {errors.message && <span className="error-text">{t(errors.message)}</span>}
              </div>
            </>
          )}

          {formType === 'client' && (
            <>
              <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 0 }}>
                <div className="form-group">
                  <label className="form-label">{t('forms.company')}</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    className={`form-control ${errors.companyName ? 'error' : ''}`}
                    value={formData.companyName || ''} 
                    onChange={handleChange} 
                  />
                  {errors.companyName && <span className="error-text">{t(errors.companyName)}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">{t('forms.cnpj')}</label>
                  <input 
                    type="text" 
                    name="cnpj" 
                    placeholder="00.000.000/0000-00"
                    className={`form-control ${errors.cnpj ? 'error' : ''}`}
                    value={formData.cnpj || ''} 
                    onChange={handleChange} 
                  />
                  {errors.cnpj && <span className="error-text">{t(errors.cnpj)}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 0 }}>
                <div className="form-group">
                  <label className="form-label">{t('forms.name')}</label>
                  <input 
                    type="text" 
                    name="contactName" 
                    className={`form-control ${errors.contactName ? 'error' : ''}`}
                    value={formData.contactName || ''} 
                    onChange={handleChange} 
                  />
                  {errors.contactName && <span className="error-text">{t(errors.contactName)}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">{t('forms.phone')}</label>
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="(21) 99999-9999"
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    value={formData.phone || ''} 
                    onChange={handleChange} 
                  />
                  {errors.phone && <span className="error-text">{t(errors.phone)}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('forms.email')}</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  value={formData.email || ''} 
                  onChange={handleChange} 
                />
                {errors.email && <span className="error-text">{t(errors.email)}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{t('forms.cityState')}</label>
                <input 
                  type="text" 
                  name="cityState" 
                  placeholder="Rio de Janeiro - RJ"
                  className={`form-control ${errors.cityState ? 'error' : ''}`}
                  value={formData.cityState || ''} 
                  onChange={handleChange} 
                />
                {errors.cityState && <span className="error-text">{t(errors.cityState)}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">{t('forms.message')}</label>
                <textarea 
                  name="message" 
                  rows={3}
                  className="form-control"
                  value={formData.message || ''} 
                  onChange={handleChange} 
                />
              </div>
            </>
          )}

          {formType === 'careers' && (
            <>
              <div className="form-group">
                <label className="form-label">{t('forms.name')}</label>
                <input 
                  type="text" 
                  name="name" 
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  value={formData.name || ''} 
                  onChange={handleChange} 
                />
                {errors.name && <span className="error-text">{t(errors.name)}</span>}
              </div>
              <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 0 }}>
                <div className="form-group">
                  <label className="form-label">{t('forms.email')}</label>
                  <input 
                    type="email" 
                    name="email" 
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    value={formData.email || ''} 
                    onChange={handleChange} 
                  />
                  {errors.email && <span className="error-text">{t(errors.email)}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">{t('forms.phone')}</label>
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="(21) 99999-9999"
                    className={`form-control ${errors.phone ? 'error' : ''}`}
                    value={formData.phone || ''} 
                    onChange={handleChange} 
                  />
                  {errors.phone && <span className="error-text">{t(errors.phone)}</span>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.position')}</label>
                <input 
                  type="text" 
                  name="position" 
                  placeholder="Vendedor, Logística, Administrativo..."
                  className={`form-control ${errors.position ? 'error' : ''}`}
                  value={formData.position || ''} 
                  onChange={handleChange} 
                />
                {errors.position && <span className="error-text">{t(errors.position)}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t('forms.message')}</label>
                <textarea 
                  name="message" 
                  rows={3}
                  className={`form-control ${errors.message ? 'error' : ''}`}
                  value={formData.message || ''} 
                  onChange={handleChange} 
                />
                {errors.message && <span className="error-text">{t(errors.message)}</span>}
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={loading}
            style={{ marginTop: '10px' }}
          >
            {loading ? t('common.submitting') : t('common.send')}
          </button>
        </form>
      )}

      <style jsx>{`
        .contact-form-wrapper {
          padding: 32px;
          border-radius: var(--border-radius-md);
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 204, 102, 0.25);
          width: 100%;
        }

        [data-theme="dark"] .contact-form-wrapper {
          background: rgba(23, 23, 21, 0.85);
          border: 1px solid rgba(255, 204, 102, 0.15);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }

        .success-message {
          text-align: center;
          padding: 40px 10px;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          color: #25d366;
          margin-bottom: 20px;
        }

        .success-message h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 12px;
        }

        .redirect-text {
          font-size: 0.95rem;
          color: var(--foreground-muted);
        }

        .api-error {
          background: rgba(255, 85, 85, 0.15);
          color: #ff3333;
          border: 1px solid rgba(255, 85, 85, 0.3);
          padding: 12px;
          border-radius: var(--border-radius-sm);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .error-text {
          color: #ff3333;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 4px;
        }

        .form-control.error {
          border-color: #ff3333;
        }

        .btn-block {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default ContactForm
