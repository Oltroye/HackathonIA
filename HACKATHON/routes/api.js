const express = require('express');
const router = express.Router();
const { Newsletter, QuizScore } = require('../db/models');

// Route pour l'inscription à la newsletter
router.post('/newsletter/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        await Newsletter.create({ email });
        res.status(201).json({ message: 'Inscription réussie à la newsletter !' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Cette adresse email est déjà inscrite.' });
        } else {
            console.error('Erreur newsletter:', error);
            res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
        }
    }
});

// Route pour sauvegarder le score du quiz
router.post('/quiz/save-score', async (req, res) => {
    try {
        const { score, email } = req.body;
        const quizScore = await QuizScore.create({ score, email });
        res.status(200).json({ 
            message: 'Score sauvegardé avec succès !',
            shareUrl: `${req.protocol}://${req.get('host')}/share?score=${score}`
        });
    } catch (error) {
        console.error('Erreur quiz:', error);
        res.status(500).json({ message: 'Erreur lors de la sauvegarde du score.' });
    }
});

// Route pour obtenir les statistiques
router.get('/stats', async (req, res) => {
    try {
        const totalSubscribers = await Newsletter.count();
        const averageScore = await QuizScore.findOne({
            attributes: [[sequelize.fn('AVG', sequelize.col('score')), 'average']]
        });

        res.json({
            totalSubscribers,
            averageScore: averageScore.getDataValue('average') || 0
        });
    } catch (error) {
        console.error('Erreur stats:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des statistiques.' });
    }
});

module.exports = router;
