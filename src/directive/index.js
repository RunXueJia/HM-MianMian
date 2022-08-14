
export const imgerror = {
    inserted(el, binding) {
        el.onerror = () => {
            // console.log(binding);
            el.src = binding.value
        }

    },
    componentUpdated(el, binding) {
        el.src = el.src || binding.value
    }
} 