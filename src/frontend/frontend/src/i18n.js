import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: "The Football Oracle",
          countries: {
            Spain: "Spain",
            France: "France",
            Italy: "Italy",
            England: "England",
            Germany: "Germany",
          },
          predict: "Launch Prediction",
          selectTeam : "Select a team",
          buttonHP: "Remove"
        }
      },
      es: {
        translation: {
          title: "El Oráculo del Fútbol",
          countries: {
            Spain: "España",
            France: "Francia",
            Italy: "Italia",
            England: "Inglaterra",
            Germany: "Alemania",
          },
          predict: "Lanzar Predicción",
          selectTeam : "Selecciona un equipo",
          buttonHP: "Eliminar"
          
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
