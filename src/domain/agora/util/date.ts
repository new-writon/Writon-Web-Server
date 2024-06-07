
export const getKoreanDateISOString = () =>  {
    const date = new Date();
    const koreanDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)); // 한국 시간으로 변환 (UTC+9
    const realKoreanDate = koreanDate.toISOString().slice(0, 10) + "T00:00:00.000Z";
 
    return realKoreanDate;
  }


export const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}