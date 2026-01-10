/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path((?!auth).*)",
                destination: "https://passgen.mdeploy.dev/api/:path*",
            },
        ];
    },
};

export default nextConfig;
