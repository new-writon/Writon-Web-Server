/**
* 
* @param data 
* @returns  데이터가 없을 경우 false 반환, 있을 경우 true 반환
*/
export const checkData = (data: any): boolean => {
    let result = true
    if (!data) {   // 데이터가 없을 경우
        return result = false;
    }
    return result;
}

export const isSameDate = (
    firstDate: Date,
    secondDate: Date
): boolean => {
    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
    );
}
