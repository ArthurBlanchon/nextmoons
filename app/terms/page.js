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
                En utilisant Nextmoons, vous acceptez ces conditions d&apos;utilisation dans leur intégralité. 
                Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">2. Description du Service</h2>
              <p className="text-body text-gray-600">
                Nextmoons est un service qui permet de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Suivre vos cycles menstruels</li>
                <li>Synchroniser ces informations avec Google Calendar</li>
                <li>Recevoir des prédictions sur vos prochains cycles</li>
                <li>Gérer vos données de cycle de manière privée et professionnelle</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">3. Compte Google</h2>
              <p className="text-body text-gray-600">
                Pour utiliser Nextmoons, vous devez :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Avoir un compte Google actif</li>
                <li>Autoriser Nextmoons à accéder à votre Google Calendar</li>
                <li>Maintenir la sécurité de vos identifiants de connexion</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">4. Utilisation du Service</h2>
              <p className="text-body text-gray-600">
                Vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Fournir des informations exactes pour le suivi de vos cycles</li>
                <li>Ne pas utiliser le service à des fins illégales</li>
                <li>Ne pas tenter de perturber ou d'endommager le service</li>
                <li>Ne pas accéder aux données d'autres utilisateurs</li>
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
                Nextmoons ne peut être tenu responsable :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Des inexactitudes dans les prédictions de cycles</li>
                <li>Des décisions prises sur la base de ces prédictions</li>
                <li>Des problèmes techniques liés à Google Calendar</li>
                <li>De l'utilisation inappropriée du service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">9. Modifications du Service</h2>
              <p className="text-body text-gray-600">
                Nextmoons se réserve le droit de :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Modifier ou interrompre le service à tout moment</li>
                <li>Mettre à jour ces conditions d'utilisation</li>
                <li>Changer les fonctionnalités proposées</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">10. Résiliation</h2>
              <p className="text-body text-gray-600">
                Vous pouvez arrêter d'utiliser Nextmoons à tout moment en :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li>Révoquant l'accès à votre compte Google</li>
                <li>Supprimant le calendrier créé par l'application</li>
                <li>Cessant d'utiliser le service</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">11. Contact</h2>
              <p className="text-body text-gray-600">
                Pour toute question concernant ces conditions d&apos;utilisation, contactez-nous à :
                <a href="mailto:seer@nextmoons.com" className="font-semibold hover:underline ml-1">
                  seer@nextmoons.com
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">12. Droit Applicable</h2>
              <p className="text-body text-gray-600">
                Ces conditions sont régies par le droit français. Tout litige relatif à leur interprétation 
                ou leur exécution relève des tribunaux français compétents.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
