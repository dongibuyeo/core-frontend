/* eslint-disable no-useless-escape */

// 회원가입
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const NICKNAME_REGEX = /^[a-zA-Z0-9가-힣]{1,10}$/

// URL
export const challengeDynamicRouteRegex =
  /^\/challenge\/(?!list)([^\/]+)(\/result\/[^\/]+)?$/
