import $http from './index'


export function postRegister(data) {
    return $http({
        url: '/regist',
        method: 'post',
        data
    })
}

export function postLogin(data) {
    return $http({
        url: '/login',
        method: 'post',
        data
    })
}

export function getUser() {
    return $http({
        url: '/getUser',
        method: 'get',
    })
}

export function postDeleteUser(data) {
    return $http({
        url: '/deleteUser',
        method: 'post',
        data
    })
}


export function postDeleteUserComment(data) {
    return $http({
        url: '/deleteUserComment',
        method: 'post',
        data
    })
}