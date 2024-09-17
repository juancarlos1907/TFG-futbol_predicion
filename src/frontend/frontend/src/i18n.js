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
            logoAlt: "Genie Logo"
          },
          welcomeTitle: "Your perfect page to find out if you win the bet with your friend for tonight's match!",
          welcomeStartPredict: "Start using our app and predict all the matches you want, whether with our optimized formula or your own preferences!",
          predict: "Match Prediction",
          predictCustom: "Custom Prediction",
          features: {
            dataReliable: {
              title: "Reliable and Updated Data",
              description: "Thanks to the API-FOOTBALL database, we can offer our predictions with the latest data and statistics from the most famous teams, updated the day after the matches."
            },
            teamsLeagues: {
              title: "International Teams and Leagues",
              description: "Our app includes more than 100 teams from up to 5 European Union countries like Spain, France, Italy, Germany, and the United Kingdom, as well as European or national leagues such as the Super Cup, Champions, Europa League, among many others."
            },
            realTimePredictions: {
              title: "Real-Time Predictions",
              description: "Thanks to our team of data analysts, statisticians, and mathematicians, we have created a system to predict the results of your favorite team's matches based on crucial statistics to provide an approximate result."
            }
          },
          predictionPage: {
            noData: "No prediction data available.",
            errorTwoTeams: "Error: Expected statistics for exactly two teams.",
            resultTitle: "Prediction Result",
            winner: "Winner",
            labels: {
              goalkeeperSaves: "Goalkeeper Saves",
              goals: "Goals",
              passes: "Precise Soccer Passes",
              possession: "Ball Possession"
            }
          },
          countries: {
            Spain: "Spain",
            France: "France",
            Italy: "Italy",
            England: "England",
            Germany: "Germany",
          },
          selectTeam: "Select a team",
          buttonHP: "Remove",
          home: "Home",
          primerPredicc: "Prediction",
          segundoPredicc:"Custom Prediction",
          aboutUs:"About Us",
          noDataTitle: "Parece que no hay suficientes datos para predecir",
          noDataDescription: "Nuestra base de datos es amplia, pero no todos los equipos se pueden predecir con otros equipos de otras ligas o paises." ,
          retryButton: "Volver a predecir",
        }
      },
      es: {
        translation: {
          title: "El Genio del Fútbol",
          header: {
            logoAlt: "Logo de Genio"
          },
          welcomeTitle: "¡Tu página perfecta para saber si la apuesta con tu amigo para el partido de esta noche la ganas!",
          welcomeStartPredict: "Empieza a usar nuestra aplicación y predice todos los partidos que quieras, ¡ya sea con nuestra fórmula optimizada o con tus propios gustos!",
          predict: "Predicción de Partidos",
          predictCustom: "Predicción Personalizada",
          features: {
            dataReliable: {
              title: "Datos fiables y actualizados",
              description: "Gracias a la base de datos API-FOOTBALL, podemos ofrecer nuestras predicciones con los últimos datos y estadísticas de los equipos más famosos, actualizados al día siguiente de celebrarse los partidos."
            },
            teamsLeagues: {
              title: "Equipos y ligas Internacionales",
              description: "Nuestra aplicación cuenta con más de 100 equipos de hasta 5 países de la Unión Europea como España, Francia, Italia, Alemania y Reino Unido, así como ligas europeas o nacionales como la Supercopa, Champions, Europa League, entre muchas."
            },
            realTimePredictions: {
              title: "Predicciones en tiempo real",
              description: "Gracias a nuestro equipo de análisis de datos, estadístico y matemático, hemos creado un sistema con el que predecir los resultados de los partidos de tu equipo favorito en base a estadísticas determinantes con las cuales obtener un resultado aproximado."
            }
          },
          predictionPage: {
            noData: "No hay datos de predicción disponibles.",
            errorTwoTeams: "Error: Se esperaban estadísticas para exactamente dos equipos.",
            resultTitle: "Resultado de la Predicción",
            winner: "Ganador",
            labels: {
              goalkeeperSaves: "Paradas del Portero",
              goals: "Goles",
              passes: "Pases precisos",
              possession: "Posesión del balón"
            },
            warningMessage: "Predicción con pocos datos, posible baja fiabilidad.",
            explanationButton:"Explicación",
            modalTitle: "Realizacion de la predicción",
            modalDescription: "Se ha llevado a cabo varios estudios y calculos matematicos",
            modalPoint1: "Se normalizan los datos, se pone un limite y un minimo, luego se le aplican unos pesos  la formula",
          },
          countries: {
            Spain: "España",
            France: "Francia",
            Italy: "Italia",
            England: "Inglaterra",
            Germany: "Alemania",
          },
          selectTeam: "Selecciona un equipo",
          buttonHP: "Eliminar",
          home: "Inicio",
          primerPredicc: "Predicción base",
          segundoPredicc:"Prediccion personalizada",
          aboutUs: "Sobre nuestra aplicación",
          noDataTitle: "Parece que no hay suficientes datos para predecir",
          noDataDescription: "Nuestra base de datos es amplia, pero no todos los equipos se pueden predecir con otros equipos de otras ligas o paises." ,
          retryButton: "Volver a predecir",
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
