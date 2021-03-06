const URL_API = 'https://codeforces.com/api';
export const handle = 'resita';
export async function getUser(inputHandle=null) {
    return fetch(`${URL_API}/user.info?handles=${!inputHandle ? handle : inputHandle}`).then(_ => _.ok ? _.json() : null)
}

export async function getRating(inputHandle=null) {
    return fetch(`${URL_API}/user.rating?handle=${!inputHandle ? handle : inputHandle}`).then(_ => _.ok ? _.json() : null)
}