import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ru from './ru.json'
import uz from './uz.json'

const savedLang = localStorage.getItem('gashtak:lang') ?? 'uz'

i18n
	.use(initReactI18next)
	.init({
		resources: {
			uz: { translation: uz },
			ru: { translation: ru },
			en: { translation: en },
		},
		lng: savedLang,
		fallbackLng: 'uz',
		interpolation: { escapeValue: false },
	})

export default i18n
