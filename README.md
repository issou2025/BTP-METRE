# Métré BTP Niger

Métré BTP Niger est un site statique HTML, CSS et JavaScript pur pour préparer des avant-métrés, estimations rapides et devis indicatifs de matériaux BTP.

Le site aide à calculer les quantités de béton, ciment, sable, gravier, briques, enduit, peinture, carrelage, dalle, fondation, poteaux, poutres, ferraillage, toiture, clôture, terrassement, plomberie, électricité, menuiserie et estimation globale de maison.

## Fonctionnalités

- Site statique compatible GitHub Pages.
- Plus de 20 calculateurs BTP.
- Prix personnalisables sauvegardés dans le navigateur.
- Recherche rapide des calculateurs.
- Favoris et historique local.
- Export, impression et partage des résultats.
- Manifest PWA et service worker pour une utilisation plus rapide.
- Sitemap et robots.txt pour le référencement.
- Module Projets pour créer un devis global.
- Export CSV compatible Excel.
- Import et export JSON pour sauvegarder les projets.
- Sous-totaux par lot : gros œuvre, second œuvre, finitions, main-d’œuvre, transport, études et autres.

## Module Projets et Devis

La page `projets.html` permet de créer un projet complet, d’ajouter des lignes de devis, de calculer les montants, de gérer une marge ou des imprévus, de copier le résumé, d’imprimer, de partager, d’exporter en CSV et de sauvegarder les données en JSON.

Cette page transforme les calculateurs séparés en un outil de préparation de devis plus professionnel.

## Publication GitHub Pages

1. Ouvrir le dépôt sur GitHub.
2. Aller dans `Settings > Pages`.
3. Choisir la branche `main`.
4. Choisir le dossier `/root`.
5. Publier.

URL probable du site :

```text
https://issou2025.github.io/BTP-METRE/
```

## Test local

```bash
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

## Développeur

Email du développeur : `bacseried@gmail.com`

## Avertissement technique

Les résultats sont indicatifs. Ils ne remplacent pas une étude technique, un plan d’exécution ou un devis professionnel adapté au chantier. Pour les ouvrages porteurs, une vérification par un professionnel qualifié reste nécessaire.

## Améliorations conseillées

- Ajouter un vrai numéro WhatsApp.
- Ajouter des icônes PWA PNG en 192x192 et 512x512.
- Ajouter une page confidentialité si le site collecte des demandes client.
- Ajouter progressivement des guides SEO pour chaque calculateur.
- Ajouter un bouton pour envoyer directement les résultats d’un calculateur vers le devis global.
