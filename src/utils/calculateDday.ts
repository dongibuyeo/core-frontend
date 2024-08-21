export const calculateDday = (startDate: string): string => {
  const today = new Date()
  const start = new Date(startDate)

  const diffTime = start.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `D-${diffDays}`
  }
  return '진행중'
}
