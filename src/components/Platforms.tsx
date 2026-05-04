import FadeIn from './FadeIn'

const PLATFORMS = [
	{
		name: 'YouTube',
		handle: '@Gashtak',
		href: 'http://www.youtube.com/@Gashtak',
		description: "To'liq podkastlar",
		icon: (
			<svg viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8'>
				<path d='M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z' />
			</svg>
		),
	},
	{
		name: 'Instagram',
		handle: '@gashtak.podcast',
		href: 'https://www.instagram.com/gashtak.podcast',
		description: 'Sahna ortida',
		icon: (
			<svg viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8'>
				<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
			</svg>
		),
	},
	{
		name: 'Telegram',
		handle: '@hashtag_gashtak',
		href: 'https://t.me/hashtag_gashtak',
		description: 'Yangiliklar va xabarlar',
		icon: (
			<svg viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8'>
				<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
			</svg>
		),
	},
]

export default function Platforms() {
	return (
		<section id='tinglash' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<FadeIn className='mb-14 flex flex-col gap-3 text-center'>
					<div className='flex items-center justify-center gap-4'>
						<div className='h-px w-12 bg-neon/40' />
						<span className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>
							Bizni kuzating
						</span>
						<div className='h-px w-12 bg-neon/40' />
					</div>
					<h2 className='section-title'>Tinglash</h2>
				</FadeIn>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{PLATFORMS.map((p, i) => (
						<FadeIn key={p.name} delay={i * 0.1}>
							<a
								href={p.href}
								target='_blank'
								rel='noopener noreferrer'
								className='group flex flex-col items-center gap-5 p-10 border border-white/10 bg-white/[0.02]
                  hover:border-neon/50 hover:bg-white/[0.04] transition-all duration-250'
								onMouseEnter={e => {
									;(e.currentTarget as HTMLAnchorElement).style.boxShadow =
										'0 0 24px rgba(125,255,244,0.15), 0 0 48px rgba(125,255,244,0.06)'
								}}
								onMouseLeave={e => {
									;(e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'
								}}
							>
								<div className='text-white/50 group-hover:text-neon transition-colors duration-200'>
									{p.icon}
								</div>
								<div className='text-center flex flex-col gap-1'>
									<span className='font-oswald font-bold text-xl uppercase tracking-wider text-white/90 group-hover:neon-text transition-colors duration-200'>
										{p.name}
									</span>
									<span className='font-barlow text-sm text-white/40'>{p.handle}</span>
									<span className='font-barlow text-xs uppercase tracking-widest text-white/30 mt-1'>
										{p.description}
									</span>
								</div>
								<div className='font-oswald text-xs uppercase tracking-widest text-neon/60 group-hover:text-neon transition-colors mt-auto'>
									Kuzatish →
								</div>
							</a>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	)
}
