export const getAll = async () => {
    const response = await fetch(
        'http://localhost:4444/account/list', {
            method: 'GET', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            }
        }
    )
    const accounts = await response.json()
    return accounts
}