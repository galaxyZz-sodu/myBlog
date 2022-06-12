import $http from './index'

export function getList() {
    return $http({
        url: '/getList',
        method: 'get'
    })
}

export function postInsertList(data) {
    return $http({
        url: '/insertList',
        method: 'post',
        data
    })
}



export function postDeleteList(data) {
    return $http({
        url: '/deleteList',
        method: 'post',
        data
    })
}