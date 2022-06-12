import $http from './index'

export function postDeleteImg(data) {
    return $http({
        url: '/deleteImg',
        method: 'post',
        data
    })
}