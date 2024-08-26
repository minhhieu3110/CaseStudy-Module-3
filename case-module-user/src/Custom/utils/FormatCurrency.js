export function formatCurrency(value) {
    return Number(value).toLocaleString("vi",{
        style: "currency",
        currency:'vnd',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
    })
}