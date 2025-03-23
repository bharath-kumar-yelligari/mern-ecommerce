export const FormatCurrency = (amount, format = "en-IN") => {
    return new Intl.NumberFormat(format).format(amount);
};