const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatBRL = (value: number) => brl.format(value);

// Soma em centavos para evitar erro de ponto flutuante.
export const sumBRL = (values: number[]) => values.reduce((s, v) => s + Math.round(v * 100), 0) / 100;
