import { useTranslation } from 'react-i18next'

const LANGS = ['uz', 'ru', 'en'] as const

export default function LanguageSwitcher() {
	const { i18n } = useTranslation()

	function switchLang(lang: string) {
		i18n.changeLanguage(lang)
		localStorage.setItem('gashtak:lang', lang)
	}

	return (
		<div className='flex items-center gap-1'>
			{LANGS.map(lang => (
				<button
					key={lang}
					onClick={() => switchLang(lang)}
					className={`font-oswald text-xs uppercase tracking-widest px-2.5 py-1 border transition-all duration-150 ${
						i18n.language === lang
							? 'border-neon text-neon shadow-[0_0_8px_rgba(125,255,244,0.4)]'
							: 'border-white/20 text-white/40 hover:border-white/40 hover:text-white/70'
					}`}
				>
					{lang}
				</button>
			))}
		</div>
	)
}
