export function formatDate(date) {
  if (!date) return '';

  if (typeof date === 'string') return date;

  return date.toDate().toLocaleDateString("pt-BR");
}

export function formatToBRL(value) {
  if (value == null || isNaN(value)) return "R$ 0,00";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}