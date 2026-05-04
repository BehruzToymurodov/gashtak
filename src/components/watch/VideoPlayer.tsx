interface Props {
	videoId: string
	title: string
}

export default function VideoPlayer({ videoId, title }: Props) {
	return (
		<div
			className='w-full aspect-video border border-neon/15 overflow-hidden'
			style={{ boxShadow: '0 0 40px var(--neon-glow-3)' }}
		>
			<iframe
				key={videoId}
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
				title={title}
				className='w-full h-full'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			/>
		</div>
	)
}
