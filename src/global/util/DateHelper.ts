export class DateHelper {
  static getAllDatesInCurrentMonth(): string[] {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDate.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
}
