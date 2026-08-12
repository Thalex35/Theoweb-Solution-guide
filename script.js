/**
 * TheoWeb Solutions - Script Principal
 * Gestion du formulaire, interactions et animations
 */

// ============================================
// CONFIGURATION GLOBALE
// ============================================
const config = {
    // Lorsque vous connecterez une vraie base de données, remplacez cette section
    // Par vos endpoints et configurations
};

// ============================================
// SÉLECTEURS DOM
// ============================================
const leadForm = document.getElementById('leadForm');
const successMessage = document.getElementById('successMessage');
const headerCTA = document.getElementById('headerCTA');
const menuToggle = document.getElementById('menuToggle');
const privacyToggle = document.getElementById('privacyToggle');
const privacyModal = document.getElementById('privacyModal');
const closeModal = document.getElementById('closeModal');
const auditLink = document.getElementById('auditLink');
const faqQuestions = document.querySelectorAll('.faq-question');

// ============================================
// GESTION DU FORMULAIRE PRINCIPAL
// ============================================

/**
 * Valide le formulaire côté front-end
 * @param {Object} data - Les données du formulaire
 * @returns {Object} - { isValid: boolean, errors: array }
 */
function validateForm(data) {
    const errors = [];

    if (!data.firstName.trim()) {
        errors.push('Le prénom est requis');
    }

    if (!data.companyName.trim()) {
        errors.push('Le nom de l\'entreprise est requis');
    }

    if (!data.email.trim()) {
        errors.push('L\'email est requis');
    } else if (!isValidEmail(data.email)) {
        errors.push('Veuillez entrer un email valide');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Valide un email
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Gère la soumission du formulaire
 */
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Récupère les données du formulaire
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        companyName: document.getElementById('companyName').value.trim(),
        email: document.getElementById('email').value.trim(),
        whatsapp: document.getElementById('whatsapp').value.trim(),
        timestamp: new Date().toISOString()
    };

    // Valide les données
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
        alert('Erreur :\n' + validation.errors.join('\n'));
        return;
    }

    // Affiche un état de chargement
    const submitButton = leadForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Traitement...';
    submitButton.disabled = true;

    try {
        // ============================================
        // INTÉGRATION FUTURE - ÉTAPE 1 : FORMSPREE
        // ============================================
        // Pour utiliser Formspree :
        // 1. Allez sur https://formspree.io/
        // 2. Créez un formulaire (ex: mon-formulaire@example.com)
        // 3. Remplacez 'YOUR_FORM_ID@formspree.io' par votre ID
        // 4. Décommentez le code ci-dessous
        /*
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        */

        // ============================================
        // INTÉGRATION FUTURE - ÉTAPE 2 : GOOGLE SHEETS
        // ============================================
        // Pour utiliser Google Sheets avec Apps Script :
        // 1. Créez une feuille Google
        // 2. Allez à Tools > Script editor
        // 3. Collez ce code :
        /*
        function doPost(e) {
            const sheet = SpreadsheetApp.getActiveSheet();
            const data = JSON.parse(e.postData.contents);
            sheet.appendRow([
                data.timestamp,
                data.firstName,
                data.companyName,
                data.email,
                data.whatsapp
            ]);
            return ContentService.createTextOutput('OK');
        }
        */
        // 4. Déployez comme Web App (exécuter en tant que vous-même)
        // 5. Remplacez 'YOUR_SCRIPT_ID' par l'ID du déploiement
        /*
        const response = await fetch(
            'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy',
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            }
        );
        */

        // ============================================
        // INTÉGRATION FUTURE - ÉTAPE 3 : BREVO
        // ============================================
        // Pour utiliser Brevo (anciennement Sendinblue) :
        // 1. Allez sur https://www.brevo.com/
        // 2. Créez un compte et récupérez votre clé API
        // 3. Créez une liste de contacts
        // 4. Utilisez cette intégration :
        /*
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': 'YOUR_BREVO_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                attributes: {
                    FIRSTNAME: formData.firstName,
                    COMPANY: formData.companyName,
                    SMS: formData.whatsapp
                },
                listIds: [YOUR_LIST_ID]
            })
        });
        */

        // ============================================
        // INTÉGRATION FUTURE - ÉTAPE 4 : MAILCHIMP
        // ============================================
        // Pour utiliser Mailchimp :
        // 1. Allez sur https://mailchimp.com/
        // 2. Créez une audience/liste
        // 3. Récupérez votre API key et Audience ID
        // 4. Utilisez cette intégration :
        /*
        const response = await fetch(
            'https://YOUR_SERVER_DC.api.mailchimp.com/3.0/lists/YOUR_AUDIENCE_ID/members',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('any:YOUR_API_KEY'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_address: formData.email,
                    status: 'subscribed',
                    merge_fields: {
                        FNAME: formData.firstName,
                        COMPANY: formData.companyName,
                        PHONE: formData.whatsapp
                    }
                })
            }
        );
        */

        // ============================================
        // SIMULATION ACTUELLE - À REMPLACER
        // ============================================
        // Pour développement local, nous simulons une soumission réussie
        // Remplacez cette section par l'une des intégrations ci-dessus
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simule une requête
        const simulated = true;

        if (simulated) {
            // Affiche le message de succès
            showSuccessMessage(formData);
            
            // Sauvegarde les données en localStorage pour démo
            localStorage.setItem('lastSubmission', JSON.stringify(formData));
            
            // Sauvegarde aussi dans sessionStorage en cas de besoin
            sessionStorage.setItem('formSubmitted', 'true');
        }

    } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

/**
 * Affiche le message de succès
 */
function showSuccessMessage(formData) {
    // Cache le formulaire
    leadForm.style.display = 'none';

    // Remplit le message de succès
    document.getElementById('successName').textContent = formData.firstName;

    // Personnalise le lien WhatsApp avec le message prérempli
    const whatsappMessage = `Bonjour TheoWeb Solutions, je viens de télécharger la checklist et je souhaite un mini-audit gratuit de ma présence en ligne. Mon entreprise est : ${formData.companyName}.`;
    const whatsappLink = `[LIEN_WHATSAPP]${encodeURIComponent(whatsappMessage)}`;
    auditLink.href = whatsappLink;

    // Affiche le message de succès
    successMessage.style.display = 'block';

    // Fait défiler vers le message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Réinitialise le formulaire
    leadForm.reset();
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Gère le clic sur le bouton CTA du header
 */
headerCTA.addEventListener('click', () => {
    const formSection = document.querySelector('.hero-form-section');
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('firstName').focus();
});

/**
 * Gère le menu toggle mobile
 */
menuToggle.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// ============================================
// FAQ - ACCORDÉON
// ============================================

faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
        const faqId = button.getAttribute('data-faq');
        const faqAnswer = document.getElementById(`faq-${faqId}`);
        
        // Ferme tous les autres
        faqQuestions.forEach((q) => {
            if (q.getAttribute('data-faq') !== faqId) {
                const otherId = q.getAttribute('data-faq');
                document.getElementById(`faq-${otherId}`).style.display = 'none';
                q.classList.remove('active');
            }
        });

        // Bascule le courant
        button.classList.toggle('active');
        if (faqAnswer.style.display === 'none' || !faqAnswer.style.display) {
            faqAnswer.style.display = 'block';
        } else {
            faqAnswer.style.display = 'none';
        }
    });
});

// ============================================
// MODAL DE CONFIDENTIALITÉ
// ============================================

privacyToggle.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    privacyModal.style.display = 'none';
});

privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) {
        privacyModal.style.display = 'none';
    }
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

/**
 * Détecte quand un élément devient visible au scroll
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe les cartes de la checklist
document.querySelectorAll('.check-item').forEach((item) => {
    item.style.opacity = '0';
    observer.observe(item);
});

// ============================================
// GESTION DES INPUTS
// ============================================

/**
 * Formate le numéro WhatsApp au format haïtien
 */
document.getElementById('whatsapp').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = '+509 ' + value;
        } else if (value.length <= 7) {
            value = '+509 ' + value.slice(0, 2) + ' ' + value.slice(2);
        } else {
            value = '+509 ' + value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 8);
        }
    }
    
    e.target.value = value;
});

// ============================================
// UTILITAIRES DE DÉBOGAGE
// ============================================

/**
 * Fonction pour afficher les données stockées (développement)
 */
window.debugForm = () => {
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
        console.table(JSON.parse(lastSubmission));
    } else {
        console.log('Aucune soumission enregistrée');
    }
};

// ============================================
// INITIALISATION
// ============================================

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    // Vérifie si localStorage est disponible
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
    } catch (e) {
        console.warn('localStorage n\'est pas disponible');
    }

    // Log un message de démarrage en développement
    console.log('%c✓ TheoWeb Solutions - Prêt', 'color: #E85D3F; font-weight: bold; font-size: 14px;');
});

// ============================================
// SUPPORT ÉVÉNEMENTS DE CLAVIER
// ============================================

// Ferme la modal avec Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyModal.style.display === 'flex') {
        privacyModal.style.display = 'none';
    }
});

// ============================================
// SMOOTH SCROLL POLYFILL POUR ANCRES
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});