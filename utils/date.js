const dateUtils = {
  formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-CA").format(date);
  },

  formatYear(dateString) {
    if (!dateString) return "N/A";
    return new Date(dateString).getFullYear();
  }
};

export default dateUtils;
