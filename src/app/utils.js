/**
 * Clear input error
 * @param {Event} e
 */
export const clearError = (e) => {
    if(e.target.classList.contains('missing-value')){
        e.target.classList.remove('missing-value')
    }
}