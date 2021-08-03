module.exports = {
	poweredByHeader: false,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff"
					},
					{
						key: "Cross-Origin-Embedder-Policy",
						value: "require-corp"
					},
					{
						key: "Cross-Origin-Opener-Policy",
						value: "same-origin"
					},
					{
						key: "Cross-Origin-Resource-Policy",
						value: "same-origin"
					},
					{
						key: "Expect-CT",
						value: "max-age=86400"
					},
					{
						key: "Referrer-Policy",
						value: "no-referrer"
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=123456; includeSubDomains"
					},
					{
						key: "Origin-Agent-Cluster",
						value: "?1"
					},
					{
						key: "X-DNS-Prefetch-Control",
						value: "off"
					},
					{
						key: "X-Download-Options",
						value: "noopen"
					},
					{
						key: "X-Frame-Options",
						value: "DENY"
					},
					{
						key: "X-Permitted-Cross-Domain-Policies",
						value: "none"
					},
					{
						key: "X-XSS-Protection",
						value: "0"
					},
				]
			}
		];
	}
};
