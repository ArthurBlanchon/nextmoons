import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-12">
          <div>
            <Link 
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Retour
            </Link>
            <h1 className="mt-4 text-display font-light text-gray-900">
              Politique de Confidentialité
            </h1>
            <p className="mt-4 text-subtitle text-gray-600">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <section className="prose prose-gray max-w-none">
            <h2 className="text-title font-medium text-gray-900">Introduction</h2>
            <p>
              Nextmoons s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous utilisons les services Google pour gérer vos calendriers de cycles menstruels.
            </p>

            <h2 className="text-title font-medium text-gray-900 mt-8">Stockage des Données</h2>
            <p>
              Nextmoons ne stocke aucune donnée personnelle sur ses serveurs. Toutes les informations sont :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stockées directement dans votre Google Calendar personnel</li>
              <li>Les informations d'authentification sont uniquement conservées dans votre navigateur de manière chiffrée</li>
              <li>Aucune base de données externe n'est utilisée</li>
            </ul>

            <h2 className="text-title font-medium text-gray-900 mt-8">Autorisations Google</h2>
            <p>Nous demandons les autorisations suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accès au profil et email Google : pour une expérience utilisateur simplifiée</li>
              <li>Autorisation de créer et gérer un calendrier secondaire : pour y stocker vos données de cycles</li>
              <li>Gestion des événements du calendrier secondaire : pour mettre à jour vos cycles</li>
            </ul>

            <h2 className="text-title font-medium text-gray-900 mt-8">Google Calendar</h2>
            <p>
              Notre service fonctionne exclusivement via Google Calendar. Nous :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Créons un calendrier secondaire dédié à vos cycles</li>
              <li>N'accédons pas à vos autres calendriers</li>
              <li>Ne stockons aucune donnée en dehors de Google Calendar</li>
              <li>Utilisons des libellés discrets pour les événements</li>
            </ul>

            <h2 className="text-title font-medium text-gray-900 mt-8">Vos Droits</h2>
            <p>Vous pouvez à tout moment :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Révoquer l'accès à votre compte Google</li>
              <li>Supprimer le calendrier secondaire créé</li>
              <li>Effacer les données de votre navigateur</li>
            </ul>

            <h2 className="text-title font-medium text-gray-900 mt-8">Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, contactez-nous à :
              <a href="mailto:contact@nextmoons.com" className="text-purple-600 hover:text-purple-800 ml-1">
                seer@nextmoons.com
              </a>
            </p>

            <h2 className="text-title font-medium text-gray-900 mt-8">Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur cette page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
