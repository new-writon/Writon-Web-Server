export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const utcDate = new Date(date.getTime() - 9 * 60 * 60 * 1000); 
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(utcDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`; 
};
