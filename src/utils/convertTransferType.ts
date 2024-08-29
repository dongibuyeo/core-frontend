/**
 * 주어진 transferType 문자열을 기반으로 해당하는 transferType으로 변환합니다.
 *
 * @param {string} transferType - 변환할 원본 transferType 문자열. 가능한 값은
 * 'CONSUMPTION_COFFEE', 'CONSUMPTION_DRINK', 'CONSUMPTION_DELIVERY',
 * 'SAVINGS_SEVEN', 'QUIZ_SOLBEING'입니다.
 * @returns {string} 변환된 transferType. 가능한 반환 값은 'COFFEE', 'DRINK',
 * 'DELIVERY', 'SEVEN', 'QUIZ'입니다.
 * @throws {Error} 전달받은 transferType이 유효하지 않은 경우 오류를 발생시킵니다.
 */
export function convertTransferType(transferType: string): string {
  switch (transferType) {
    case 'CONSUMPTION_COFFEE':
      return 'COFFEE'
    case 'CONSUMPTION_DRINK':
      return 'DRINK'
    case 'CONSUMPTION_DELIVERY':
      return 'DELIVERY'
    case 'SAVINGS_SEVEN':
      return 'SEVEN'
    case 'QUIZ_SOLBEING':
      return 'QUIZ'
    default:
      throw new Error('Invalid transfer type')
  }
}
