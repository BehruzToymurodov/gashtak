const SOCIALS = [
	{ label: 'YouTube', href: 'http://www.youtube.com/@Gashtak' },
	{ label: 'Instagram', href: 'https://www.instagram.com/gashtak.podcast' },
	{ label: 'Telegram', href: 'https://t.me/+xQf-5yxpTfMyYWM0' },
]

const NAV = [
	{ label: 'Podkastlar', href: '#podkastlar' },
	{ label: 'Mehmonlar', href: '#mehmonlar' },
	{ label: 'Haqida', href: '#haqida' },
	{ label: 'Tinglash', href: '#tinglash' },
]

export default function Footer() {
	return (
		<footer className='border-t border-white/8 py-14 px-6'>
			<div className='max-w-7xl mx-auto flex flex-col gap-10'>
				{/* Top row */}
				<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
					{/* Logo + tagline */}
					<div className='flex flex-col gap-2'>
						<span className='font-oswald font-bold text-2xl neon-text-sm tracking-wider'>
							#GASHTAK
						</span>
						<span className='font-barlow text-sm text-white/40'>
							O'zbek yulduzlarini dunyoga tanitamiz
						</span>
					</div>

					{/* Nav links */}
					<nav className='flex flex-wrap gap-6'>
						{NAV.map(l => (
							<a
								key={l.href}
								href={l.href}
								className='font-barlow text-sm uppercase tracking-widest text-white/40 hover:text-neon transition-colors'
							>
								{l.label}
							</a>
						))}
					</nav>

					{/* Socials */}
					<div className='flex gap-4'>
						{SOCIALS.map(s => (
							<a
								key={s.label}
								href={s.href}
								target='_blank'
								rel='noopener noreferrer'
								className='font-barlow text-xs uppercase tracking-widest text-white/40
                  border border-white/15 px-4 py-2
                  hover:border-neon/50 hover:text-neon transition-all duration-200'
							>
								{s.label}
							</a>
						))}
					</div>
				</div>

				{/* Bottom row */}
				<div className='flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/8'>
					<p className='font-barlow text-xs text-white/25'>
						© {new Date().getFullYear()} #GASHTAK. Barcha huquqlar himoyalangan.
					</p>
					<p className='font-barlow text-xs text-white/20'>
						O'zbekiston · Toshkent
					</p>
				</div>
			</div>
		</footer>
	)
}
