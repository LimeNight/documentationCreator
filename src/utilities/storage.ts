export const setToken = (accessToken: string ): void =>{
    sessionStorage.setItem('accessToken', accessToken)
}

export const setId = (userId: string): void =>{
    sessionStorage.setItem('userId', userId)
}

export const getToken = (): string => {
    return <string>sessionStorage.getItem('accessToken')
}

export const getId = (): string => {
    return <string>sessionStorage.getItem('userId')
}

export const deleteToken = (): void => {
    sessionStorage.removeItem('accessToken')
}

export const deleteId = (): void => {
    sessionStorage.removeItem('userId')
}

export const swapToken = (accessToken: string): void => {
    deleteToken()
    setToken(accessToken)
}

export const swapId = (userId: string): void => {
    deleteId()
    setId(userId)
}
export default {}