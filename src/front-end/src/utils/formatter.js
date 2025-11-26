export function formatDate(date) {
  if (!date) return '';

  if (date instanceof Date) {
    return date.toLocaleDateString("pt-BR");
  }

  if (date.toDate) {
    return date.toDate().toLocaleDateString("pt-BR");
  }

  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  return '';
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