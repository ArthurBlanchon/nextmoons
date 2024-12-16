import Link from 'next/link'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-12">
          <div>
            <Link 
              href="/"
              className="text-small text-gray-500 hover:text-gray-700"
            >
              ← Retour
            </Link>
            <h1 className="mt-4 text-display font-light tracking-tight text-gray-900">
              Conditions d&apos;Utilisation
            </h1>
            <p className="mt-4 text-subtitle text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">1. Acceptation des Conditions</h2>
              <p className="text-body text-gray-600">
                En utilisant Nextmoons, vous acceptez les présentes conditions dans leur intégralité :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Consentement :</strong> Votre utilisation du service implique l'acceptation de ces conditions</li>
                <li><strong>Âge Minimum :</strong> Vous confirmez avoir l'âge légal pour utiliser ce service</li>
                <li><strong>Capacité :</strong> Vous êtes légalement capable de former un contrat contraignant</li>
                <li><strong>Refus :</strong> En cas de non-acceptation, veuillez ne pas utiliser le service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">2. Description du Service</h2>
              <p className="text-body text-gray-600">
                Nextmoons est un service spécialisé qui vous permet de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Suivi Personnel :</strong> Gérer et suivre vos cycles menstruels de manière professionnelle</li>
                <li><strong>Intégration Google :</strong> Synchroniser vos données avec Google Calendar de manière sécurisée</li>
                <li><strong>Prédictions :</strong> Recevoir des estimations pour vos prochains cycles</li>
                <li><strong>Confidentialité :</strong> Gérer vos données de manière privée et discrète</li>
                <li><strong>Accessibilité :</strong> Accéder à vos informations depuis n'importe quel appareil connecté</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">3. Compte Google</h2>
              <p className="text-body text-gray-600">
                Pour utiliser Nextmoons, les conditions suivantes s'appliquent :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Compte Requis :</strong> Disposer d'un compte Google actif et en règle</li>
                <li><strong>Autorisation :</strong> Accepter de donner à Nextmoons un accès limité à votre Google Calendar</li>
                <li><strong>Sécurité :</strong> Maintenir la confidentialité de vos identifiants Google</li>
                <li><strong>Responsabilité :</strong> Être responsable de toute activité sur votre compte</li>
                <li><strong>Révocation :</strong> Pouvoir révoquer l'accès à tout moment via votre compte Google</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">4. Utilisation du Service</h2>
              <p className="text-body text-gray-600">
                En tant qu'utilisatrice de Nextmoons, vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Exactitude :</strong> Fournir des informations exactes pour le suivi de vos cycles</li>
                <li><strong>Usage Approprié :</strong> Ne pas utiliser le service à des fins illégales ou non autorisées</li>
                <li><strong>Respect :</strong> Ne pas tenter de perturber ou d'endommager le service</li>
                <li><strong>Confidentialité :</strong> Ne pas tenter d'accéder aux données d'autres utilisatrices</li>
                <li><strong>Sécurité :</strong> Signaler toute faille de sécurité détectée</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">5. Données et Confidentialité</h2>
              <p className="text-body text-gray-600">
                En utilisant Nextmoons, vous acceptez notre politique de gestion des données suivante :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Non-Divulgation :</strong> Nous ne partageons, ne transférons, ni ne divulguons vos données Google à aucun tiers, incluant mais sans s'y limiter : partenaires commerciaux, annonceurs, ou autres services tiers</li>
                <li><strong>Usage Limité :</strong> Vos données sont utilisées exclusivement pour fournir le service Nextmoons via l'API Google Calendar</li>
                <li><strong>Stockage Minimal :</strong> Nous ne stockons aucune donnée sur nos serveurs, uniquement un cookie chiffré sur votre appareil contenant les jetons d'authentification Google</li>
                <li><strong>Accès Restreint :</strong> Nous n'accédons qu'au calendrier "Periods of" créé spécifiquement pour le service</li>
                <li><strong>Protection Maximale :</strong> Vos données sont protégées par des protocoles de sécurité robustes (HTTPS, OAuth 2.0) et un chiffrement de bout en bout</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">6. Sécurité et Protection des Données</h2>
              <p className="text-body text-gray-600">
                Nous nous engageons à maintenir les plus hauts standards de sécurité :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Chiffrement :</strong> Toutes les données stockées localement sont chiffrées</li>
                <li><strong>Protocoles Sécurisés :</strong> Utilisation exclusive de HTTPS et OAuth 2.0</li>
                <li><strong>Accès Temporaire :</strong> Nous n'accédons à vos données que pendant votre utilisation active</li>
                <li><strong>Nettoyage Automatique :</strong> Suppression des données lors de la déconnexion</li>
                <li><strong>Contrôle Total :</strong> Vous pouvez révoquer l'accès à tout moment</li>
              </ul>
              <p className="text-body text-gray-600 mt-4">
                <strong>Important :</strong> Par design, Nextmoons ne peut pas :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Accéder à vos données sans votre présence active sur l'application</li>
                <li>Partager ou vendre vos données à des tiers</li>
                <li>Stocker vos données sur des serveurs externes</li>
                <li>Accéder à vos calendriers autres que "Periods of"</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">7. Vos Droits et Contrôle</h2>
              <p className="text-body text-gray-600">
                Vous gardez un contrôle total sur vos données :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Révocation :</strong> Révoquez l'accès à votre compte Google à tout moment</li>
                <li><strong>Suppression :</strong> Supprimez le calendrier "Periods of" quand vous le souhaitez</li>
                <li><strong>Effacement :</strong> Effacez les données de votre navigateur instantanément</li>
                <li><strong>Modification :</strong> Modifiez ou supprimez vos données de cycle à volonté</li>
                <li><strong>Transparence :</strong> Consultez notre politique de confidentialité pour plus de détails</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">8. Limitation de Responsabilité</h2>
              <p className="text-body text-gray-600">
                Nextmoons décline toute responsabilité concernant :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Prédictions :</strong> L'exactitude des prédictions de cycles, qui sont des estimations</li>
                <li><strong>Décisions :</strong> Les décisions prises sur la base de ces prédictions</li>
                <li><strong>Disponibilité :</strong> Les interruptions temporaires du service liées à Google Calendar</li>
                <li><strong>Données :</strong> La perte de données due à des actions de l'utilisatrice</li>
                <li><strong>Usage :</strong> Toute utilisation inappropriée du service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">9. Modifications du Service</h2>
              <p className="text-body text-gray-600">
                Nextmoons se réserve les droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Évolution :</strong> Modifier ou améliorer le service à tout moment</li>
                <li><strong>Maintenance :</strong> Interrompre temporairement le service pour maintenance</li>
                <li><strong>Notification :</strong> Informer les utilisatrices des changements majeurs</li>
                <li><strong>Fonctionnalités :</strong> Ajouter ou retirer des fonctionnalités</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">10. Résiliation</h2>
              <p className="text-body text-gray-600">
                Vous pouvez arrêter d'utiliser Nextmoons à tout moment en :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Révocation :</strong> Révoquant l'accès via votre compte Google</li>
                <li><strong>Suppression :</strong> Supprimant le calendrier "Periods of"</li>
                <li><strong>Données :</strong> Effaçant les données de votre navigateur</li>
                <li><strong>Compte :</strong> Cessant simplement d'utiliser le service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">11. Contact</h2>
              <p className="text-body text-gray-600">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Email :</strong> Contactez-nous à <a href="mailto:seer@nextmoons.com" className="font-semibold hover:underline">seer@nextmoons.com</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">12. Droit Applicable</h2>
              <p className="text-body text-gray-600">
                Cadre juridique de ces conditions :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Juridiction :</strong> Ces conditions sont régies par le droit français</li>
                <li><strong>Litiges :</strong> Tout litige relève des tribunaux français compétents</li>
                <li><strong>Invalidité :</strong> Si une clause est invalide, les autres restent en vigueur</li>
                <li><strong>Intégralité :</strong> Ces conditions constituent l'accord complet entre vous et Nextmoons</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
