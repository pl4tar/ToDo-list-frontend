export function useFormatDate() {
  function formatDate(date) {
    if (date) {
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return '';
  }

  return {
    formatDate,
  };
}
