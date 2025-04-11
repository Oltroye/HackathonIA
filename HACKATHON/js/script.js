// Quiz Questions
const questions = [
    {
        question: "Utilisez-vous une gourde réutilisable ?",
        correct: "Oui"
    },
    {
        question: "Éteignez-vous systématiquement les lumières en quittant une pièce ?",
        correct: "Oui"
    },
    {
        question: "Triez-vous vos déchets ?",
        correct: "Oui"
    },
    {
        question: "Privilégiez-vous les produits locaux et de saison ?",
        correct: "Oui"
    },
    {
        question: "Évitez-vous les emballages plastiques à usage unique ?",
        correct: "Oui"
    },
    {
        question: "Avez-vous des plantes ou un jardin que vous entretenez ?",
        correct: "Oui"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const startContainer = document.getElementById('start-container');
const resultContainer = document.getElementById('result-container');
const questionText = document.getElementById('question-text');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const shareButton = document.getElementById('share-btn');

// Event Listeners
startButton.addEventListener('click', startQuiz);
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => handleAnswer(button.textContent));
});
shareButton.addEventListener('click', shareScore);

// Quiz Functions
function startQuiz() {
    startContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionText.textContent = questions[currentQuestionIndex].question;
    } else {
        showResult();
    }
}

function handleAnswer(answer) {
    if (answer === questions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    setNextQuestion();
}

function showResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = score + '/6';
    
    let feedback;
    if (score <= 2) {
        feedback = 'Pas grave, chaque geste compte. Commence aujourd\'hui !';
    } else if (score <= 4) {
        feedback = 'Tu es sur la bonne voie ! Continue !';
    } else {
        feedback = 'Bravo ! Tu es un exemple à suivre.';
    }
    feedbackElement.textContent = feedback;
    
    // Sauvegarder le score
    saveScore(score);
}

async function saveScore(score) {
    try {
        const response = await fetch('/api/quiz/save-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score })
        });
        
        const data = await response.json();
        if (response.ok) {
            console.log('Score sauvegardé avec succès');
        }
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du score:', error);
    }
}

function shareScore() {
    const text = `J'ai obtenu un score de ${score}/6 sur le quiz éco-responsable ! Teste tes connaissances sur #AgirEnsemble`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mon Score Éco',
            text: text,
            url: window.location.href
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    try {
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            this.reset();
        }
    } catch (error) {
        alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    }
});

// Share Campaign Button
document.querySelector('.share-campaign').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'Agir Ensemble, Maintenant',
            text: 'Rejoignez le mouvement pour un avenir plus durable !',
            url: window.location.href
        });
    } else {
        alert('Partagez ce lien avec vos amis : ' + window.location.href);
    }
});

// Gestion des vidéos
document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playBtn = wrapper.querySelector('.play-btn');
    const overlay = wrapper.querySelector('.video-overlay');

    // Gestion du bouton play
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            overlay.style.opacity = '0';
        } else {
            video.pause();
            overlay.style.opacity = '1';
        }
    });

    // Réafficher l'overlay quand la vidéo est en pause
    video.addEventListener('pause', () => {
        overlay.style.opacity = '1';
    });

    // Cacher l'overlay pendant la lecture
    video.addEventListener('play', () => {
        overlay.style.opacity = '0';
    });
});

// Gestion du partage des vidéos
document.querySelectorAll('.share-video-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const videoCard = this.closest('.video-card');
        const title = videoCard.querySelector('h4').textContent;
        const description = videoCard.querySelector('.video-description').textContent;

        if (navigator.share) {
            navigator.share({
                title: title,
                text: description,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ' - ' + description)}&url=${encodeURIComponent(window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    });
});

// Préchargement des miniatures
document.querySelectorAll('video').forEach(video => {
    const poster = video.getAttribute('poster');
    if (poster) {
        const img = new Image();
        img.src = poster;
    }
});

// Animation des compteurs d'impact
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animate = (counter) => {
        const target = parseInt(counter.closest('.impact-card').dataset.count);
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        counter.classList.add('animate');
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Observer pour démarrer l'animation quand les compteurs sont visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Effet de parallaxe sur le header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.scrollY;
    
    if (header) {
        header.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Animation des boutons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// Fonctions de partage social
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Rejoignez le mouvement pour un avenir durable ! #AgirEnsemble");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Ensemble, changeons la donne pour notre planète ! 🌍 #AgirEnsemble");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnInstagram() {
    alert("Copiez le lien et partagez sur Instagram avec #AgirEnsemble !");
    navigator.clipboard.writeText(window.location.href);
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Agir Ensemble pour un Avenir Durable");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
}

// Animation des compteurs sociaux
function animateSocialStats() {
    const stats = document.querySelectorAll('.post-stats span');
    stats.forEach(stat => {
        const value = stat.textContent.match(/\d+(\.\d+)?/)[0];
        let start = 0;
        const duration = 2000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                clearInterval(timer);
                start = value;
            }
            stat.textContent = stat.textContent.replace(/\d+(\.\d+)?/, Math.floor(start));
        }, 16);
    });
}

// Appeler l'animation au chargement
document.addEventListener('DOMContentLoaded', () => {
    animateCounters();
    animateSocialStats();
});

// Observer pour déclencher les animations au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.social-card, .demarche-card').forEach(card => {
    observer.observe(card);
});

// Fonctions pour le challenge et les actions
function joinChallenge() {
    const challengeBtn = document.querySelector('.join-challenge-btn');
    const currentParticipants = document.querySelector('.challenge-stats .number');
    
    challengeBtn.textContent = 'Challenge Rejoint !';
    challengeBtn.style.background = '#4CAF50';
    challengeBtn.style.color = 'white';
    
    // Mettre à jour le nombre de participants
    const count = parseInt(currentParticipants.textContent.replace(/[^\d]/g, ''));
    currentParticipants.textContent = (count + 1).toLocaleString() + 'K';
    
    // Sauvegarder dans localStorage
    localStorage.setItem('challengeJoined', 'true');
}

function getBiodiversityGuide() {
    const modal = document.createElement('div');
    modal.className = 'biodiversity-guide-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Guide Biodiversité</h3>
            <div class="guide-steps">
                <div class="step">
                    <h4>1. Évaluez votre espace</h4>
                    <p>Mesurez la surface disponible et notez l'exposition au soleil.</p>
                </div>
                <div class="step">
                    <h4>2. Choisissez vos plantes</h4>
                    <ul>
                        <li>Lavande 🌿</li>
                        <li>Thym 🌱</li>
                        <li>Sauge 🌺</li>
                        <li>Bourrache 🌸</li>
                    </ul>
                </div>
                <div class="step">
                    <h4>3. Créez des habitats</h4>
                    <ul>
                        <li>Hôtel à insectes 🐝</li>
                        <li>Point d'eau 💧</li>
                        <li>Tas de bois 🪵</li>
                    </ul>
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">Fermer</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si l'utilisateur a déjà rejoint le challenge
    if (localStorage.getItem('challengeJoined') === 'true') {
        const challengeBtn = document.querySelector('.join-challenge-btn');
        challengeBtn.textContent = 'Challenge Rejoint !';
        challengeBtn.style.background = '#4CAF50';
        challengeBtn.style.color = 'white';
    }
    
    // Ajouter les écouteurs d'événements
    document.querySelector('.join-challenge-btn').addEventListener('click', joinChallenge);
    
    // Animation des compteurs
    animateCounters();
    animateSocialStats();
    
    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.social-card, .demarche-card').forEach(card => {
        observer.observe(card);
    });
});
