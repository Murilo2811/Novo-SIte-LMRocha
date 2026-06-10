import { z } from 'zod'

// Helper para remover tags HTML (Sanitização básica de strings)
export const sanitizeString = (str: string): string => {
  if (!str) return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

// Validador matemático de CNPJ brasileiro
export const isValidCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/[^\d]+/g, '')
  if (cleaned.length !== 14) return false

  // Elimina CNPJs conhecidos inválidos
  if (/^(\d)\1{13}$/.test(cleaned)) return false

  // Valida DVs
  let tamanho = cleaned.length - 2
  let numeros = cleaned.substring(0, tamanho)
  const digitos = cleaned.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(0))) return false

  tamanho = tamanho + 1
  numeros = cleaned.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(1))) return false

  return true
}

// Expressão regular básica para telefones brasileiros: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
const phoneRegex = /^(?:\+?55)?\s?(?:\(?([1-9][1-9])\)?)\s?(?:9\s?\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})$/

// Schema do formulário de contato simplificado (Home/Contato)
export const contactFormSchema = z.object({
  name: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  phone: z.string()
    .min(10, { message: 'requiredError' })
    .regex(phoneRegex, { message: 'phoneError' }),
  subject: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  message: z.string()
    .min(5, { message: 'requiredError' })
    .transform(sanitizeString)
})

// Schema do formulário "Seja Nosso Cliente"
export const clientFormSchema = z.object({
  companyName: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  cnpj: z.string()
    .min(14, { message: 'requiredError' })
    .refine(isValidCNPJ, { message: 'cnpjError' }),
  contactName: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  phone: z.string()
    .min(10, { message: 'requiredError' })
    .regex(phoneRegex, { message: 'phoneError' }),
  email: z.string()
    .min(1, { message: 'requiredError' })
    .email({ message: 'emailError' })
    .transform(sanitizeString),
  cityState: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  message: z.string()
    .optional()
    .transform(val => sanitizeString(val || ''))
})

// Schema do formulário "Trabalhe Conosco"
export const careersFormSchema = z.object({
  name: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  email: z.string()
    .min(1, { message: 'requiredError' })
    .email({ message: 'emailError' })
    .transform(sanitizeString),
  phone: z.string()
    .min(10, { message: 'requiredError' })
    .regex(phoneRegex, { message: 'phoneError' }),
  position: z.string()
    .min(3, { message: 'requiredError' })
    .transform(sanitizeString),
  message: z.string()
    .min(5, { message: 'requiredError' })
    .transform(sanitizeString)
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ClientFormData = z.infer<typeof clientFormSchema>
export type CareersFormData = z.infer<typeof careersFormSchema>
