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
          title: "The Football Genie",
          header: {
            logoAlt: "Genio Logo"
          },
          predictionPage: {
            noData: "No prediction data available.",
            errorTwoTeams: "Error: Expected statistics for exactly two teams.",
            resultTitle: "Prediction Result",
            winner: "Winner",
            labels: {
              goalkeeperSaves: "Goalkeeper Saves",
              goals: "Goals",
              passes: "Passes %",
              possession: "Possession %"
            }
          },
          countries: {
            Spain: "Spain",
            France: "France",
            Italy: "Italy",
            England: "England",
            Germany: "Germany",
          },
          predict: "Launch Prediction",
          selectTeam: "Select a team",
          buttonHP: "Remove"
        }
      },
      es: {
        translation: {
          title: "El Genio del Fútbol",
          header: {
            logoAlt: "Logo de Genio"
          },
          predictionPage: {
            noData: "No hay datos de predicción disponibles.",
            errorTwoTeams: "Error: Se esperaban estadísticas para exactamente dos equipos.",
            resultTitle: "Resultado de la Predicción",
            winner: "Ganador",
            labels: {
              goalkeeperSaves: "Paradas del Portero",
              goals: "Goles",
              passes: "Porcentaje de Pasos",
              possession: "Porcentaje de Posesión"
            }
          },
          countries: {
            Spain: "España",
            France: "Francia",
            Italy: "Italia",
            England: "Inglaterra",
            Germany: "Alemania",
          },
          predict: "Lanzar Predicción",
          selectTeam: "Selecciona un equipo",
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
