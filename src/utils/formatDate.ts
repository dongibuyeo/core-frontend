/**
 * 주어진 날짜 문자열을 `YYYY-MM-DD` 형식으로 변환합니다.
 *
 * @param {string} dateString - 변환할 날짜 문자열 (`YYYYMMDD` 형식).
 * @returns {string} 변환된 날짜 문자열 (`YYYY-MM-DD` 형식).
 */

export function formatDate(dateString: string) {
  return dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
}
