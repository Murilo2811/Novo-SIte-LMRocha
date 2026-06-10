'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import ptBR from '../../public/locales/pt-BR.json'
import en from '../../public/locales/en.json'

type Translations = typeof ptBR
export type Locale = 'pt-BR' | 'en'

const translations: Record<Locale, Translations> = {
  'pt-BR': ptBR,
  'en': en,
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('pt-BR')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Detectar idioma do navegador ou localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    let activeLocale: Locale = 'pt-BR'

    if (savedLocale && (savedLocale === 'pt-BR' || savedLocale === 'en')) {
      activeLocale = savedLocale
    } else {
      const browserLang = navigator.language
      if (browserLang.startsWith('en')) {
        activeLocale = 'en'
      }
    }

    const timer = setTimeout(() => {
      setLocaleState(activeLocale)
      setIsMounted(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000` // 1 ano
  }

  const t = (key: string): string => {
    const activeTranslations = translations[locale] || translations['pt-BR']
    return getNestedValue(activeTranslations, key)
  }

  // Evita Hydration mismatch renderizando apenas quando montado no cliente
  if (!isMounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    )
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(I18nContext)
  if (!context) {
    // Fallback para evitar quebras de contexto durante SSR/Prerender
    return {
      locale: 'pt-BR' as Locale,
      setLocale: () => {},
      t: (key: string) => {
        return getNestedValue(ptBR, key)
      }
    }
  }
  return context
}
