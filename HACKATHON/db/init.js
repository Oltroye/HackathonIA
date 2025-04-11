const sequelize = require('./config');
const { Newsletter, QuizScore } = require('./models');

async function initDatabase() {
    try {
        // Synchroniser les modèles avec la base de données
        await sequelize.sync({ force: true });
        console.log('Base de données initialisée avec succès !');

        // Ajouter des données de test si nécessaire
        await Newsletter.create({
            email: 'test@example.com'
        });

        await QuizScore.create({
            score: 5,
            email: 'test@example.com'
        });

        console.log('Données de test ajoutées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    } finally {
        await sequelize.close();
    }
}

initDatabase();
