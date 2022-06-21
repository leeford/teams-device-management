export const renderInitials = (displayName: string): string => {
    const names = displayName.split(" ");
    const initials = names.map((n, index) => {
        if (index === 0 || index === names.length - 1) {
            return n.substring(0, 1).toUpperCase();
        } else {
            return undefined;
        }
    }).join("")
    return initials;
}