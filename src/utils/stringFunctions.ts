export function stringToBoolean(str: string): boolean {
    return str.toLowerCase() === "true";
}

export function stringToInteger(str: string): number {
    return parseInt(str);
} 