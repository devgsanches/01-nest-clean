export function toSlug(text: string) {
    return text
      .toLowerCase()                 // tudo minúsculo
      .normalize("NFD")              // remove acentos
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9\s-]/g, "")  // remove caracteres especiais
      .trim()                        // remove espaços no início/fim
      .replace(/\s+/g, "-")          // troca espaços por hífen
      .replace(/-+/g, "-");          // evita múltiplos hífens
  }
  
  // Exemplo:
  // Olá Mundo! Programação Top!!!
  // -> "ola-mundo-programacao-top"
  