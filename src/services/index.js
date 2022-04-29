const URL_API = 'https://codeforces.com/api';
export const handle = 'resita';
export async function getUser() {
    return fetch(`${URL_API}/user.info?handles=${handle}`).then(_ => _.ok ? _.json() : null)
}

export async function getRating() {
    return fetch(`${URL_API}/user.rating?handle=${handle}`).then(_ => _.ok ? _.json() : null)
}