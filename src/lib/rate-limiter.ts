interface RateLimitRecord {
  timestamps: number[]
}

const limiterMap = new Map<string, RateLimitRecord>()

interface RateLimitOptions {
  limit: number      // número máximo de requisições
  windowMs: number   // janela de tempo em milissegundos
}

/**
 * Verifica se a requisição excede os limites de taxa (Rate Limiting).
 * @param ip Endereço IP do cliente.
 * @param key Chave identificadora do endpoint (ex: 'contato', 'catalogo').
 * @param options Configurações de limite de taxa.
 * @returns Um objeto contendo se foi bloqueado, o total de requisições feitas, e o tempo restante para expirar.
 */
export function rateLimit(
  ip: string,
  key: string,
  options: RateLimitOptions
): { isBlocked: boolean; limit: number; remaining: number; resetTime: number } {
  const now = Date.now()
  const identifier = `${ip}:${key}`
  const record = limiterMap.get(identifier) || { timestamps: [] }

  // Filtrar timestamps fora da janela de tempo atual
  const activeTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < options.windowMs
  )

  const isBlocked = activeTimestamps.length >= options.limit

  if (!isBlocked) {
    activeTimestamps.push(now)
  }

  limiterMap.set(identifier, { timestamps: activeTimestamps })

  // Calcular tempo para resetar (primeiro timestamp da janela + tamanho da janela)
  const oldestTimestamp = activeTimestamps[0] || now
  const resetTime = oldestTimestamp + options.windowMs
  const remaining = Math.max(0, options.limit - activeTimestamps.length)

  return {
    isBlocked,
    limit: options.limit,
    remaining,
    resetTime
  }
}

// Limpeza periódica em memória para evitar vazamento de memória (memory leaks)
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of limiterMap.entries()) {
      const active = value.timestamps.filter(
        (timestamp) => now - timestamp < 15 * 60 * 1000 // Mantém no máximo janelas de 15 minutos
      )
      if (active.length === 0) {
        limiterMap.delete(key)
      } else {
        limiterMap.set(key, { timestamps: active })
      }
    }
  }, 5 * 60 * 1000) // Executa a cada 5 minutos
}
