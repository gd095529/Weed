export function isBottom(ref) {
    if (ref.current) {
        const contentElement = ref.current;
        if (contentElement.scrollHeight - contentElement.scrollTop === contentElement.clientHeight) {
            return true;
        }
    }
    return false;
}