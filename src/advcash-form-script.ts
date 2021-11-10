export const loadAdvcashForm = (callback) => {
    const simplexFormScript = document.getElementById('main');
    if (!simplexFormScript) {
        const script = document.createElement('script');
        script.id = 'script_id';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }
    if (simplexFormScript && callback) callback();
};

export const unloadAdvcashForm = (callback) => {
    const simplexFormScript = document.getElementById('main');
    if (simplexFormScript) {
        simplexFormScript.parentNode?.removeChild(simplexFormScript);
        if (callback) callback();
    }
}