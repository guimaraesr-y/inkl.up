export const PUBLIC_PATHS = ['/', '/register', '/login', '/p/**'];

export function isPublicPath(pathname: string, publicPaths: string[]): boolean {
    return publicPaths.some((path) => {
        const regex = new RegExp(`^${path.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*')}$`);
        console.log(pathname, publicPaths, regex.test(pathname))
        return regex.test(pathname);
    });
}