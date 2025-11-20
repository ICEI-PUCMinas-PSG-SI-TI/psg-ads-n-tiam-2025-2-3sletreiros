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

export function formatCNPJ(value) {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
}