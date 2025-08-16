/**
 * Hook para gerenciar dados no localStorage
 * Permite salvar e recuperar dados com tipagem TypeScript
 */

import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((val: T) => T);

interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: SetValue<T>) => void;
  removeValue: () => void;
  loading: boolean;
  error: string | null;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Função para ler do localStorage
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage key "${key}":`, error);
      setError(`Erro ao ler dados: ${error}`);
      return initialValue;
    }
  }, [initialValue, key]);

  // Inicializar o valor do estado
  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      const value = readValue();
      setStoredValue(value);
    } catch (error) {
      setError(`Erro ao inicializar: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [readValue]);

  // Função para salvar no localStorage
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        setError(null);
        
        // Permitir que value seja uma função para que tenhamos a mesma API do useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Salvar no estado
        setStoredValue(valueToStore);
        
        // Salvar no localStorage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          // Disparar evento customizado para sincronizar entre abas
          window.dispatchEvent(
            new CustomEvent('local-storage', {
              detail: {
                key,
                newValue: valueToStore,
              },
            })
          );
        }
      } catch (error) {
        console.warn(`Erro ao salvar localStorage key "${key}":`, error);
        setError(`Erro ao salvar dados: ${error}`);
      }
    },
    [key, storedValue]
  );

  // Função para remover do localStorage
  const removeValue = useCallback(() => {
    try {
      setError(null);
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        
        // Disparar evento customizado
        window.dispatchEvent(
          new CustomEvent('local-storage', {
            detail: {
              key,
              newValue: null,
            },
          })
        );
      }
    } catch (error) {
      console.warn(`Erro ao remover localStorage key "${key}":`, error);
      setError(`Erro ao remover dados: ${error}`);
    }
  }, [key, initialValue]);

  // Escutar mudanças no localStorage (sincronização entre abas)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if ('key' in e && e.key !== key) {
        return;
      }

      try {
        setError(null);
        const newValue = readValue();
        setStoredValue(newValue);
      } catch (error) {
        setError(`Erro ao sincronizar dados: ${error}`);
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key !== key) {
        return;
      }

      try {
        setError(null);
        const newValue = e.detail.newValue ?? initialValue;
        setStoredValue(newValue);
      } catch (error) {
        setError(`Erro ao sincronizar dados: ${error}`);
      }
    };

    // Escutar eventos nativos do storage (mudanças de outras abas)
    window.addEventListener('storage', handleStorageChange);
    
    // Escutar eventos customizados (mudanças da mesma aba)
    window.addEventListener('local-storage', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleCustomStorageChange as EventListener);
    };
  }, [key, readValue, initialValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    loading,
    error
  };
};

// Hook especializado para configurações
export const useSettings = <T extends Record<string, any>>(
  defaultSettings: T
) => {
  return useLocalStorage('budget-loop:settings', defaultSettings);
};

// Hook especializado para filtros
export const useFilters = <T extends Record<string, any>>(
  defaultFilters: T
) => {
  return useLocalStorage('budget-loop:filters', defaultFilters);
};

// Hook para cache temporário
export const useCache = <T>(
  key: string,
  initialValue: T,
  ttl: number = 5 * 60 * 1000 // 5 minutos por padrão
) => {
  const cacheKey = `budget-loop:cache:${key}`;
  
  const { value, setValue, removeValue, loading, error } = useLocalStorage(
    cacheKey,
    {
      data: initialValue,
      timestamp: Date.now(),
      ttl
    }
  );

  // Verificar se o cache expirou
  const isExpired = Date.now() - value.timestamp > value.ttl;

  const setCachedValue = useCallback((newValue: SetValue<T>) => {
    const valueToStore = newValue instanceof Function ? newValue(value.data) : newValue;
    setValue({
      data: valueToStore,
      timestamp: Date.now(),
      ttl
    });
  }, [setValue, value.data, ttl]);

  const getCachedValue = useCallback(() => {
    if (isExpired) {
      removeValue();
      return initialValue;
    }
    return value.data;
  }, [isExpired, removeValue, initialValue, value.data]);

  return {
    value: getCachedValue(),
    setValue: setCachedValue,
    removeValue,
    loading,
    error,
    isExpired
  };
};

