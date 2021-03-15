import request from './network'

export function wxlogin(code) {
  return request({
    url: `/login?code=${code}`,
  })
}

export function login(nickname,password) {
  return request({
    url: `/login`,
    method: 'post',
    data: {nickname,password}
  })
}

export function register(nickname, password) {
  return request({
    url: `/register`,
    method: 'post',
    data: {nickname,password}
  })
}