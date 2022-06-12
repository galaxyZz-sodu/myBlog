import $http  from "./index";

export function postComment(data) {
    return $http({
        url: '/postComment',
        method: 'post',
        data
    })
}

export function postDeleteComment(data) {
    return $http({
        url: '/deleteComment',
        method: 'post',
        data
    })
}


export function insertComment(data) {
    return $http({
        url: '/insertComment',
        method: 'post',
        data
    })
}

export function deleteArticalAllComment(data) {
    return $http({
        url: '/deleteArticalAllComment',
        method: 'post',
        data
    })
}