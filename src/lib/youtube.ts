export async function fetchVideoViews(
	ids: string[],
	apiKey?: string,
): Promise<Record<string, number>> {
	if (!apiKey) return {}

	const chunkSize = 50
	const out: Record<string, number> = {}

	for (let i = 0; i < ids.length; i += chunkSize) {
		const chunk = ids.slice(i, i + chunkSize)
		const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${chunk.join(
			',',
		)}&key=${apiKey}`
		try {
			const res = await fetch(url)
			if (!res.ok) continue
			const data = await res.json()
			if (!Array.isArray(data.items)) continue
			data.items.forEach((it: any) => {
				const id = it.id
				const count = Number(it.statistics?.viewCount ?? 0)
				out[id] = Number.isFinite(count) ? count : 0
			})
		} catch {
			// ignore network errors per-chunk
		}
	}

	return out
}
