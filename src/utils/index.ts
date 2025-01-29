
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
}

export function formatDate(isoString: string){
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-AR', {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    })
    return formatter.format(date)
}