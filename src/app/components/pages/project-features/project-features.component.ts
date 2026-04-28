import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProjectFeature {
  id: number;
  title: string;
  description: string;
  category: 'Front-End' | 'Back-End' | 'DevOps' | 'General';
  status: 'Terminé' | 'En cours' | 'Planifié';
  icon: string;
}

@Component({
  selector: 'app-project-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-features.component.html',
  styleUrl: './project-features.component.scss'
})
export class ProjectFeaturesComponent implements OnInit {
  
  features: ProjectFeature[] = [
    // Back-End Features
    {
      id: 1,
      title: 'Authentification & Tokens JWT',
      description: 'Système d\'authentification sécurisé utilisant les JSON Web Tokens (JWT) stockés en cookies (httpOnly) pour protéger les routes de l\'API et maintenir les sessions utilisateurs.',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-key'
    },
    {
      id: 2,
      title: 'Gestion des Rôles (RBAC)',
      description: 'Contrôle d\'accès basé sur les rôles (Admin vs Client). Sécurisation des endpoints backend et des routes frontend via des Guards Angular spécifiques.',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-person-badge'
    },
    {
      id: 3,
      title: 'CRUD Complet (Produits, Commandes, Utilisateurs)',
      description: 'Mise en place d\'opérations CRUD (Create, Read, Update, Delete) complètes via une API REST avec Node.js/Express et une base de données MongoDB (Mongoose).',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-database'
    },
    {
      id: 4,
      title: 'Intégration Paiement Stripe',
      description: 'Gestion avancée des paiements via Stripe Checkout, incluant la création de sessions, la reprise de paiement en attente, et les webhooks pour la synchronisation sécurisée des statuts.',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-credit-card'
    },
    {
      id: 5,
      title: 'Restrictions Géographiques (Haversine)',
      description: 'Calcul précis de la distance entre le restaurant et le client (formule de Haversine) pour valider l\'éligibilité à la livraison selon un rayon défini.',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-geo-alt'
    },
    {
      id: 6,
      title: 'Documentation Swagger API',
      description: 'Documentation interactive et exhaustive de toutes les routes API générée automatiquement pour faciliter les tests et l\'intégration frontend.',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-file-earmark-code'
    },
    {
      id: 7,
      title: 'Sécurité Express & Helmet',
      description: 'Configuration approfondie de la sécurité avec Helmet, incluant des politiques CSP strictes, et la protection contre les vulnérabilités web courantes.',
      category: 'Back-End',
      status: 'Terminé',
      icon: 'bi-shield-check'
    },
    
    // Front-End Features
    {
      id: 8,
      title: 'Architecture Angular Standalone',
      description: 'Utilisation exclusive des composants Standalone Angular 17+ pour une structure de projet moderne, modulaire et optimisée sans l\'utilisation de NgModules.',
      category: 'Front-End',
      status: 'Terminé',
      icon: 'bi-box'
    },
    {
      id: 9,
      title: 'Tableaux de Bord & Administration',
      description: 'Interface d\'administration dédiée (Dashboard) pour la gestion du CRUD (ajout/modification de produits, gestion des commandes) réservée au rôle Admin.',
      category: 'Front-End',
      status: 'Terminé',
      icon: 'bi-speedometer2'
    },
    {
      id: 10,
      title: 'Intercepteurs & RxJS',
      description: 'Utilisation d\'intercepteurs HTTP pour l\'envoi automatique des cookies (withCredentials) et gestion réactive des flux de données avec RxJS (Observables, Pipes).',
      category: 'Front-End',
      status: 'Terminé',
      icon: 'bi-arrow-left-right'
    },
    {
      id: 11,
      title: 'Carte Interactive (Leaflet)',
      description: 'Intégration d\'une carte interactive avec Leaflet permettant la géolocalisation et la sélection précise d\'adresses pour la validation de livraison.',
      category: 'Front-End',
      status: 'Terminé',
      icon: 'bi-map'
    },
    {
      id: 12,
      title: 'Design Responsif Premium',
      description: 'Interface utilisateur moderne, responsive et soignée conçue avec SCSS et Bootstrap, incluant des animations fluides et un design system cohérent.',
      category: 'Front-End',
      status: 'Terminé',
      icon: 'bi-phone'
    },
    
    // DevOps / General
    {
      id: 13,
      title: 'Déploiement Automatisé CI/CD',
      description: 'Pipeline GitHub Actions complet pour le test, la construction et le déploiement continu du projet (Docker) sur l\'environnement de production.',
      category: 'DevOps',
      status: 'En cours',
      icon: 'bi-rocket'
    }
  ];

  filteredFeatures: ProjectFeature[] = [];
  activeFilter: string = 'Tous';
  categories: string[] = ['Tous', 'Front-End', 'Back-End', 'DevOps'];

  constructor() { }

  ngOnInit(): void {
    this.filteredFeatures = this.features;
  }

  filterCategory(category: string): void {
    this.activeFilter = category;
    if (category === 'Tous') {
      this.filteredFeatures = this.features;
    } else {
      this.filteredFeatures = this.features.filter(f => f.category === category);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Terminé': return 'bg-success text-white';
      case 'En cours': return 'bg-warning text-dark';
      case 'Planifié': return 'bg-secondary text-white';
      default: return 'bg-light text-dark';
    }
  }
}
