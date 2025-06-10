
import React from 'react';
import { Package } from '../types';

interface PackagesSectionProps {
  onPackageSelect: (pkg: Package) => void;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({ onPackageSelect }) => {
  const packages: Package[] = [
    {
      id: 1,
      name: "Acesso Semanal",
      description: "Grupo VIP por 1 semana",
      price: 17.00,
      emoji: "⭐",
      features: ["Acesso ao grupo por 1 semana", "Conteúdo exclusivo diário", "Chat direto", "Fotos e vídeos sensuais"]
    },
    {
      id: 2,
      name: "Acesso Mensal",
      description: "Grupo VIP por 1 mês",
      price: 27.00,
      emoji: "💎",
      features: ["Acesso ao grupo por 1 mês", "Todo conteúdo exclusivo", "Chat direto prioritário", "Vídeos íntimos completos"],
      popular: true
    },
    {
      id: 3,
      name: "Acesso Vitalício",
      description: "Grupo VIP permanente",
      price: 37.00,
      emoji: "👑",
      features: ["Acesso permanente ao grupo", "Todo o conteúdo premium", "Chat VIP", "Conteúdo personalizado", "Prioridade total"],
      vip: true
    },
    {
      id: 4,
      name: "Chamada Privada",
      description: "Vídeo chamada exclusiva",
      price: 35.00,
      emoji: "📱",
      features: ["Chamada de vídeo 15min", "Conversa íntima", "Momento exclusivo", "Agendamento flexível"]
    }
  ];

  const handleWhatsAppCall = () => {
    const phoneNumber = "5511999999999";
    const message = "Olá Isabella! Quero agendar uma chamada privada";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="packages" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Planos <span className="dark-red">Exclusivos</span>
          </h2>
          <p className="text-xl md:text-2xl mature-text font-light">
            Escolha sua experiência premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id}
              className={`relative card-gradient rounded-xl p-6 transition-all duration-300 elegant-hover animate-fade-in ${
                pkg.popular ? 'popular-glow' : pkg.vip ? 'gold-border' : 'border border-gray-700'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}
              
              {pkg.vip && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  Melhor Custo
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-3xl mb-4">{pkg.emoji}</div>
                <h3 className="font-playfair text-xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="mature-text text-sm mb-4">
                  {pkg.description}
                </p>
                <div className={`text-3xl font-bold ${pkg.vip ? 'premium-gold' : 'dark-red'}`}>
                  R$ {pkg.price.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="mature-text text-sm flex items-start">
                    <span className="dark-red mr-3 mt-1">•</span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={pkg.name === "Chamada Privada" ? handleWhatsAppCall : () => onPackageSelect(pkg)}
                className="w-full btn-primary text-white font-semibold py-3 rounded-xl elegant-hover transition-all duration-300"
              >
                {pkg.name === "Chamada Privada" ? "Agendar Agora" : "Assinar Agora"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
