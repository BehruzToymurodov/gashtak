import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks/useInView'
import FadeIn from './FadeIn'

interface Stat {
	end: number
	decimals?: number
	suffix: string
	labelKey: string
}

const STATS: Stat[] = [
	{ end: 10, suffix: '+', labelKey: 'about.stats.episodes' },
	{ end: 3.5, decimals: 1, suffix: 'M+', labelKey: 'about.stats.views' },
	{ end: 2024, suffix: '', labelKey: 'about.stats.since' },
]

function AnimatedStat({ stat, active }: { stat: Stat; active: boolean }) {
	const { t } = useTranslation()
	const [display, setDisplay] = useState(0)

	useEffect(() => {
		if (!active) return
		const duration = 1800
		const fps = 60
		const steps = (duration / 1000) * fps
		const increment = stat.end / steps
		let current = 0

		const tick = () => {
			current = Math.min(current + increment, stat.end)
			setDisplay(current)
			if (current < stat.end) requestAnimationFrame(tick)
		}
		requestAnimationFrame(tick)
	}, [active, stat.end])

	const formatted = stat.decimals
		? display.toFixed(stat.decimals)
		: Math.floor(display).toString()

	return (
		<div className='flex flex-col items-center justify-center py-12 px-4 bg-black gap-2'>
			<span className='font-oswald font-bold text-4xl md:text-5xl neon-text'>
				{formatted}{stat.suffix}
			</span>
			<span className='font-barlow text-xs uppercase tracking-widest text-white/40'>
				{t(stat.labelKey)}
			</span>
		</div>
	)
}

export default function About() {
	const { t } = useTranslation()
	const { ref, inView } = useInView(0.2)

	return (
		<section id='haqida' className='py-24 px-6'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
					{/* Text side */}
					<FadeIn from='left'>
						<div className='flex flex-col gap-8'>
							<div className='flex flex-col gap-3'>
								<div className='flex items-center gap-4'>
									<div className='h-px w-12 bg-neon/40' />
									<span className='font-barlow text-xs uppercase tracking-[0.4em] text-white/40'>
										{t('about.eyebrow')}
									</span>
								</div>
								<h2 className='section-title'>{t('about.title')}</h2>
							</div>

							<div className='flex flex-col gap-5 font-barlow text-base md:text-lg text-white/65 leading-relaxed'>
								<p>
									<span className='neon-text-sm font-semibold'>#GASHTAK</span> —{' '}
									{t('about.p1')}
								</p>
								<p>{t('about.p2')}</p>
								<p>{t('about.p3')}</p>
							</div>

							<a
								href='https://www.youtube.com/@gashtak'
								target='_blank'
								rel='noopener noreferrer'
								className='btn-neon self-start'
							>
								{t('about.subscribe')}
							</a>
						</div>
					</FadeIn>

					{/* Stats side */}
					<FadeIn from='right'>
						<div
							ref={ref as React.RefObject<HTMLDivElement>}
							className='grid grid-cols-3 gap-px bg-white/10'
						>
							{STATS.map(s => (
								<AnimatedStat key={s.labelKey} stat={s} active={inView} />
							))}
						</div>
					</FadeIn>
				</div>

				<div className='mt-24 flex items-center gap-6'>
					<div className='h-px flex-1 bg-white/8' />
					<span className='font-oswald font-bold text-sm neon-text-sm tracking-widest'>
						#GASHTAK
					</span>
					<div className='h-px flex-1 bg-white/8' />
				</div>
			</div>
		</section>
	)
}
