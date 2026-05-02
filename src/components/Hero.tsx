export default function Hero() {
	return (
		<section
			id='top'
			className='relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden'
		>
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					backgroundImage:
						'linear-gradient(var(--neon-glow-3) 1px, transparent 1px), linear-gradient(90deg, var(--neon-glow-3) 1px, transparent 1px)',
					backgroundSize: '80px 80px',
				}}
			/>

			{/* Radial spotlight */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 70% 60% at 50% 50%, var(--neon-glow-3) 0%, transparent 70%)',
				}}
			/>

			{/* Content */}
			<div className='relative z-10 flex flex-col items-center gap-6'>
				{/* Eyebrow */}
				<p
					className='font-barlow text-xs md:text-sm uppercase tracking-[0.4em] text-white/40 animate-fade-up'
					style={{ animationDelay: '0.1s' }}
				>
					O'zbek Celebrity Podcast
				</p>

				{/* Main title */}
				<h1
					className='font-oswald font-bold leading-none neon-text
            text-[clamp(4rem,18vw,14rem)] tracking-tight
            animate-fade-up'
					style={{ animationDelay: '0.2s' }}
				>
					#GASHTAK
				</h1>

				{/* Tagline */}
				<p
					className='font-barlow text-lg md:text-xl text-white/70 max-w-lg animate-fade-up'
					style={{ animationDelay: '0.35s' }}
				>
					O'zbek yulduzlarini dunyoga tanitamiz
				</p>

				{/* Sub tagline */}
				<p
					className='font-barlow text-sm text-white/40 uppercase tracking-widest animate-fade-up'
					style={{ animationDelay: '0.45s' }}
				>
					Mashxur siymolar · Qiziqarli suhbatlar
				</p>

				{/* CTA */}
				<a
					href='https://www.youtube.com/@gashtak'
					target='_blank'
					rel='noopener noreferrer'
					className='btn-neon mt-4 text-base animate-fade-up'
					style={{ animationDelay: '0.55s' }}
				>
					<svg
						className='w-5 h-5'
						viewBox='0 0 24 24'
						fill='currentColor'
						aria-hidden='true'
					>
						<path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z' />
					</svg>
					YouTube'da Ko'ring
				</a>
			</div>

			{/* Scroll indicator */}
			<div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25'>
				<span className='font-barlow text-xs uppercase tracking-widest'>
					Pastga
				</span>
				<div className='w-px h-12 bg-gradient-to-b from-white/25 to-transparent' />
			</div>
		</section>
	)
}
