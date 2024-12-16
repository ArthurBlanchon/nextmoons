import Link from 'next/link'

export default function Privacy() {
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
              Politique de Confidentialité
            </h1>
            <p className="mt-4 text-subtitle text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <section className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Introduction</h2>
              <p className="text-body text-gray-600">
                Nextmoons s'engage à protéger votre vie privée avec les plus hauts standards de sécurité et de transparence. Cette politique de confidentialité détaille précisément comment nous utilisons les services Google pour gérer vos calendriers de cycles menstruels, tout en garantissant la protection absolue de vos données personnelles.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Stockage des Données</h2>
              <p className="text-body text-gray-600">
                Par conception, Nextmoons adopte une approche minimaliste du stockage des données :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Données de Calendrier :</strong> Stockées exclusivement dans votre Google Calendar personnel, dans un calendrier secondaire dédié "Periods of"</li>
                <li><strong>Données d'Authentification :</strong> Conservées uniquement dans votre navigateur sous forme chiffrée, comprenant uniquement les jetons d'accès Google</li>
                <li><strong>Absence de Base de Données :</strong> Aucune base de données externe n'est utilisée, garantissant que vos données restent sous votre contrôle</li>
                <li><strong>Données Temporaires :</strong> Les données en mémoire sont effacées dès que vous quittez l'application</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Partage et Protection des Données</h2>
              <p className="text-body text-gray-600">
                Chez Nextmoons, nous prenons la protection de vos données très au sérieux. Voici notre politique stricte concernant le partage des données :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Aucun Partage de Données :</strong> Nous ne partageons, ne transférons, ni ne divulguons vos données Google à aucun tiers, y compris mais sans s'y limiter : partenaires commerciaux, annonceurs, ou autres services tiers</li>
                <li><strong>Usage Exclusif :</strong> Nous n'utilisons vos données que pour fournir le service Nextmoons via l'API Google Calendar</li>
                <li><strong>Aucun Stockage Externe :</strong> Nous ne stockons aucune donnée sur nos serveurs ou des serveurs tiers</li>
                <li><strong>Stockage Local Uniquement :</strong> Les seules données stockées le sont sur votre appareil dans un cookie chiffré</li>
                <li><strong>Données Minimales :</strong> Le cookie chiffré ne contient que les jetons d'accès et de rafraîchissement de l'API Google Calendar</li>
                <li><strong>Accès Temporaire :</strong> Nous n'accédons à vos données que lorsque vous utilisez activement l'application</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Mécanismes de Protection des Données Sensibles</h2>
              <p className="text-body text-gray-600">
                Pour assurer la sécurité de vos données sensibles, nous avons implémenté les mécanismes de protection suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Chiffrement Local :</strong> Chiffrement de bout en bout des données stockées localement sur votre appareil</li>
                <li><strong>Protocoles Sécurisés :</strong> Utilisation exclusive des protocoles sécurisés HTTPS et OAuth 2.0 pour toutes les communications</li>
                <li><strong>Accès Restreint :</strong> Accès limité au seul calendrier "Periods of" que nous créons, sans accès à vos autres calendriers</li>
                <li><strong>Zéro Persistance :</strong> Aucune persistance des données sur nos serveurs ou infrastructure cloud</li>
                <li><strong>Nettoyage Automatique :</strong> Suppression automatique des données lors de la déconnexion</li>
                <li><strong>Contrôle Utilisateur :</strong> Possibilité de révoquer l'accès à tout moment via votre compte Google</li>
                <li><strong>Surveillance Continue :</strong> Monitoring régulier de nos systèmes de sécurité</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Autorisations Google</h2>
              <p className="text-body text-gray-600">
                Pour fournir notre service, nous demandons les autorisations Google suivantes. Chaque autorisation a un but spécifique et limité :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>OpenID :</strong> Requis pour le fonctionnement sécurisé des autres autorisations et l'authentification de base</li>
                <li><strong>Email :</strong> Utilisé uniquement pour l'identification de votre compte, nous ne stockons pas cette information</li>
                <li><strong>Profil :</strong> Utilisé uniquement pour améliorer votre expérience utilisateur et personnaliser l'interface</li>
                <li><strong>Calendrier :</strong> Utilisé exclusivement pour :
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>Créer et gérer le calendrier "Periods of"</li>
                    <li>Créer et mettre à jour les événements dans ce calendrier</li>
                    <li>Rechercher le calendrier "Periods of" parmi vos calendriers</li>
                    <li>Nous n'accédons pas au contenu de vos autres calendriers</li>
                  </ul>
                </li>
              </ul>
              <p className="text-body text-gray-600 mt-4">
                <strong>Note importante :</strong> L'accès complet au calendrier est techniquement requis pour pouvoir localiser et gérer le calendrier "Periods of". Cependant, par design et par engagement, nous limitons strictement notre utilisation au seul calendrier "Periods of".
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Google Calendar</h2>
              <p className="text-body text-gray-600">
                Notre service fonctionne exclusivement via Google Calendar, avec des restrictions strictes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Calendrier Dédié :</strong> Création d'un calendrier secondaire "Periods of" spécifique à vos cycles</li>
                <li><strong>Accès Limité :</strong> Aucun accès technique ou pratique à vos autres calendriers</li>
                <li><strong>Données Minimales :</strong> Stockage uniquement des dates de cycles dans Google Calendar</li>
                <li><strong>Libellés Discrets :</strong> Utilisation de descriptions neutres pour tous les événements</li>
                <li><strong>Contrôle Total :</strong> Possibilité de supprimer ou modifier le calendrier à tout moment</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Vos Droits</h2>
              <p className="text-body text-gray-600">
                Vous disposez d'un contrôle total sur vos données et votre utilisation de Nextmoons :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Révocation d'Accès :</strong> Révoquez l'accès à votre compte Google instantanément via votre compte Google</li>
                <li><strong>Suppression du Calendrier :</strong> Supprimez le calendrier "Periods of" directement depuis Google Calendar</li>
                <li><strong>Effacement des Données :</strong> Effacez les données de votre navigateur en vous déconnectant ou en supprimant les cookies</li>
                <li><strong>Portabilité :</strong> Exportez vos données de cycle depuis Google Calendar à tout moment</li>
                <li><strong>Modification :</strong> Modifiez ou supprimez n'importe quelle donnée de cycle quand vous le souhaitez</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Contact</h2>
              <p className="text-body text-gray-600">
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Email :</strong> Contactez-nous à <a href="mailto:seer@nextmoons.com" className="font-semibold hover:underline">seer@nextmoons.com</a></li>
                <li><strong>Demandes de Données :</strong> Pour toute demande concernant vos données, nous vous répondrons dans un délai maximum de 30 jours</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-title font-medium text-gray-900">Modifications de la Politique</h2>
              <p className="text-body text-gray-600">
                Concernant les modifications de cette politique de confidentialité :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body text-gray-600">
                <li><strong>Mises à Jour :</strong> Nous nous réservons le droit de modifier cette politique à tout moment</li>
                <li><strong>Notification :</strong> Les modifications importantes feront l'objet d'une notification dans l'application</li>
                <li><strong>Date d'Effet :</strong> Les modifications entrent en vigueur dès leur publication sur cette page</li>
                <li><strong>Historique :</strong> L'historique des modifications est disponible sur demande</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
