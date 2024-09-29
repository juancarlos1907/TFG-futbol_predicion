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
            },
            modalTitle: "How the prediction is obtained",
            formula: "A * Goals For - B * Goals Against + C * Ball Possession + D * Accurate Passes + E * Set Pieces",
            modalDescription: "Where A, B, C, D, and E are the weights for each variable. If you are using the default prediction, the values would be 0.35 for A and B, 0.15 for C, 0.1 for D, and 0.05 for E. If you are using the custom prediction, the values for each weight will be the ones you have defined.",
            modalPoint1: "The system receives the teams for the prediction and processes the match history, focusing on the 5 key statistics to use the mathematical formula that calculates the prediction. Once the data is obtained, it is transformed into the same scale as a number between 0 and 5.",
            modalPoint2: "We use the formula to make the prediction.",
            modalPoint3: "After the weights for each variable are applied, the system calculates the score. If there is a difference of 50 points between the two teams, the result is considered a tie."
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
          aboutUsApp: {
            missionTitle: "Our Mission",
            missionText: "Our application is designed to provide accurate and personalized predictions for football match results. We use reliable statistical data and a proven mathematical formula to offer predictions based on a thorough analysis of the teams, their performance, and other relevant factors. Our mission is to provide an accessible tool for all those interested in better understanding the dynamics of matches and making informed predictions.",
            howItWorksTitle: "How It Works",
            howItWorksText: "The operation of our application is based on the collection of historical data on the performance of football teams. Through an external API, we obtain data such as goals for, goals against, goalkeeper saves, etc. This data is processed using a mathematical formula that analyzes the variables and provides a prediction of the most likely outcome.",
            formulaTitle: "The Mathematical Formula",
            formulaText: "For predictions, we use a mathematical formula that considers several variables of a match. These include goals for and against, ball possession, the effectiveness of goalkeeper saves, and the percentage of accurate passes. This formula was designed after testing six different statistical approaches, with the one that showed the highest reliability in tests conducted with historical data being selected. The formula weights each factor according to its relative importance, generating a prediction for each match, and is as follows:",
            formula: "0.35 * Goals For - 0.35 * Goals Against + 0.15 * Ball Possession + 0.10 * Accurate Passes + 0.05 * Set Pieces",
            formulaText2: "As can be seen, the greatest weight in the formula is given to goals for and against, as these are the most determining statistics for knowing which team is more likely to win. Once the teams are selected, our system retrieves the historical match data between the two selected teams and the corresponding statistics to use the formula. Once everything is processed, we obtain the results for both teams and the prediction of which one wins or if there is a draw. There may also be cases where the user wants to use different weights than the defaults, for which we provide a personalized prediction where, in addition to choosing the teams, the weight of each variable can be selected.",
            ourGoalTitle: "Our Goal",
            ourGoalText: "Our main objective is to offer a sports prediction tool that is both easy to use and reliable. We aim for users to make informed decisions based on accurate data, regardless of their level of experience in football. Additionally, we want to promote transparency in the prediction process by clearly explaining how each result is reached and allowing users to understand the factors influencing the prediction."
          }
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
            modalTitle: "Como se obtiene la predicción",
            formula: "A * Goles a favor - B * Goles en contra + C * Posesión del balón + D * Pases precisos + E * Balones Parados",
            modalDescription: "Donde A,B,C,D y E son los pesos para cada variable. Si estas usando la predicción por defecto, los valores serian 0.35 para A y B, 0.15 para C, 0.1 para D y 0.05 para E. Si estas usando la predicción personalizada, los valores para cada peso seran los que has definido.",
            modalPoint1: "El sistema recibe los equipos para realizar la predicción y procesa el historico de partidos, quedandose con las 5 estadisticas claves para usar la fórmula matemática que calcula la predicción. Una vez que se obtienen los datos, estos se transforman a la misma magnitud en un numero entre 0 y 5.",
            modalPoint2: "Cogemos la fórmula para realizar la predicción.",
            modalPoint3: "Ya introducidos los pesos a cada variable, el sistema calcula la puntuación. Si hay una diferencia de 50 puntos entre los dos equipos, el resultado se considera como un empate."
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
          aboutUsApp: {
            missionTitle: "Nuestra Misión",
            missionText: "Nuestra aplicación está diseñada para proporcionar predicciones precisas y personalizadas de los resultados de partidos de fútbol. Utilizamos datos estadísticos fiables y una fórmula matemática probada para ofrecer predicciones basadas en un análisis exhaustivo de los equipos, su rendimiento y otros factores relevantes. Nuestra misión es ofrecer una herramienta accesible para todos aquellos interesados en comprender mejor las dinámicas de los partidos y realizar predicciones informadas.",
            howItWorksTitle: "Cómo Funciona",
            howItWorksText: "El funcionamiento de nuestra aplicación se basa en la recolección de datos históricos sobre el rendimiento de equipos de fútbol. A través de una API externa, obtenemos datos como goles a favor, goles en contra, paradas del portero,etc. Estos datos son procesados mediante una fórmula matemática que analiza las variables y ofrece una predicción del resultado más probable.",
            formulaTitle: "La Fórmula Matemática",
            formulaText: "Para las predicciones, utilizamos una fórmula matemática que considera varias variables de un partido. Entre ellas se encuentran los goles a favor y en contra, la posesión del balón, la efectividad de las paradas del portero, y el porcentaje de pases precisos. Esta fórmula fue diseñada tras probar seis diferentes aproximaciones estadísticas, siendo seleccionada la que presentó mayor fiabilidad en las pruebas realizadas con datos históricos. La fórmula pondera cada factor según su importancia relativa, generando una predicción para cada encuentro, y es la siguiente:",
            formula : "0.35 * Goles a favor - 0.35 * Goles en contra + 0.15 * Posesión del balón + 0.10 * Pases precisos + 0.05 * Balones Parados",
            formulaText2 : "Como se puede ver, el mayor peso de la fórmula lo tienen los goles en contra y a favor ya que son las estadisticas mas determinantes para saber que equipo tiene mas probabilidad de ganar. Una vez seleccionado los equipos, nuestro sistema recupera el historico de partidos entre los dos equipos seleccionados y las estadisticas correspondiente para poder usar la fórmula. Una vez procesado todo obtenemos los resultados de ambos equipo y la predicción de cual de los dos gana o si hay empate. También puede darse el caso de que el usuario quiera usar unos pesos diferentes a los usados por defecto, para ello proporcionamos una predicción personalizada donde ademas de elegir los equipos, se puede elegir el peso de cada variable.",
            ourGoalTitle: "Nuestro Objetivo",
            ourGoalText: "Nuestro objetivo principal es ofrecer una herramienta de predicción deportiva que sea tanto fácil de usar como fiable. Buscamos que los usuarios puedan tomar decisiones informadas basadas en datos precisos, independientemente de su nivel de experiencia en el fútbol. Además, queremos fomentar la transparencia en el proceso de predicción, explicando claramente cómo se llega a cada resultado y permitiendo a los usuarios entender los factores que influyen en la predicción.",
          }
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
