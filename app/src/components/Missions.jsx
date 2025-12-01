import { useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import {
  Box,
  Shield,
  AlertTriangle,
  Camera,
  BarChart3,
  MessageSquare,
} from 'lucide-react';
import './styles/Missions.css';
import paperMission from '../assets/desktop/paperMission.png';
import scotch from '../assets/desktop/scoth.png';

const missions = [
  {
    id: 1,
    title: 'Représentation 3D des constructions',
    description: 'Visualisation immersive et interactive des projets de construction en trois dimensions pour une meilleure compréhension et planification.',
    icon: Box,
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'Calculs d\'avancement et prédictions des travaux',
    description: 'Analyse par reconnaissance caméra drone pour suivre l\'avancement des travaux et prédire les délais avec précision.',
    icon: Camera,
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: 'Détection d\'intrusion sur chantier',
    description: 'Système de surveillance intelligent pour détecter et alerter en temps réel toute intrusion non autorisée sur le site.',
    icon: AlertTriangle,
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Reconnaissance des équipements de sécurité',
    description: 'Identification automatique et suivi des équipements de sécurité sur le chantier pour garantir la conformité et la sécurité.',
    icon: Shield,
    color: '#10b981',
  },
  {
    id: 5,
    title: 'Suivi du management des travaux',
    description: 'Plateforme complète de gestion et de suivi de tous les aspects du projet de construction en temps réel.',
    icon: BarChart3,
    color: '#ec4899',
  },
  {
    id: 6,
    title: 'Echanges entre collaborateurs',
    description: 'Communication sécurisée et efficace entre les responsables et dirigeants du projet pour une coordination optimale.',
    icon: MessageSquare,
    color: '#06b6d4',
  },
];

const Missions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselApiRef = useRef(null);

  const handleApi = (api) => {
    carouselApiRef.current = api;
    if (api) {
      api.on('select', () => {
        setCurrentIndex(api.selectedScrollSnap());
      });
      setCurrentIndex(api.selectedScrollSnap());
    }
  };

  const goToSlide = (index) => {
    if (carouselApiRef.current) {
      carouselApiRef.current.scrollTo(index);
    }
  };

  return (
    <section className="missions-section">
      <div className="missions-container">
        <h2 className="missions-title">NOS MISSIONS</h2>
        <div className='mission-paper'>
          <p className="missions-subtitle">
        L’objectif : transformer chaque chantier en un espace intelligent où l’information circule mieux et où le travail avance plus simplement.
        </p>
        <img src={paperMission} alt="Paper Mission Background" className="mission-paper-img" />
        <img src={scotch} alt="Scotch Mission" className="mission-scotch-img" />
        </div>
        
        
        <div className="missions-carousel-wrapper">
          <Carousel
            className="missions-carousel"
            opts={{
              align: 'start',
              loop: true,
            }}
            setApi={handleApi}
          >
            <CarouselContent className="missions-carousel-content">
              {missions.map((mission) => {
                const IconComponent = mission.icon;
                return (
                  <CarouselItem key={mission.id} className="missions-carousel-item">
                    <div className="mission-card">
                      <div 
                        className="mission-icon-wrapper"
                        style={{ '--mission-color': mission.color }}
                      >
                        <IconComponent className="mission-icon" size={64} />
                      </div>
                      <div className="mission-content">
                        <h3 className="mission-title">{mission.title}</h3>
                        <p className="mission-description">{mission.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="missions-nav-button missions-nav-prev" />
            <CarouselNext className="missions-nav-button missions-nav-next" />
          </Carousel>
          
          <div className="missions-indicators">
            {missions.map((_, index) => (
              <button
                key={index}
                className={`missions-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Aller à la mission ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Missions;

