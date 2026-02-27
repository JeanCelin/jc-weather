import { useState, useEffect } from "react";

/**
 * Hook de debounce.
 *
 * Retarda a atualização de um valor até que ele
 * permaneça inalterado por um determinado tempo.
 *
 * Muito utilizado para:
 * - Busca com autocomplete
 * - Requisições à API
 * - Inputs que disparam efeitos custosos
 *
 * @param {*} value - Valor que será observado
 * @param {number} delay - Tempo de espera em milissegundos (padrão: 500ms)
 * @returns {*} Valor com atraso aplicado
 */
export default function useDebounce(value, delay = 500) {
  // Estado que armazenará o valor após o tempo de espera
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Cria um temporizador que atualiza o valor após o delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancela o timeout anterior se o value ou delay mudar
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}