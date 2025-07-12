export function debounce(callback, timer){
    let timeout
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(callback,timer)
}