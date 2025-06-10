
import React, { useEffect, useState } from 'react';
import { Instagram, MessageCircle, Heart, Star } from 'lucide-react';

const HeroSection = () => {
  const [cidade, setCidade] = useState('São Paulo');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city) {
          setCidade(data.city);
        }
      })
      .catch(() => {
        setCidade('São Paulo'); // fallback
      });
  }, []);

  const handleInstagramClick = () => {
    // TODO: Substituir pela URL real do Instagram
    window.open('https://instagram.com/isabella', '_blank');
  };

  const handleTelegramClick = () => {
    // TODO: Substituir pela URL real do Telegram
    window.open('https://t.me/isabella_previas', '_blank');
  };

  const handleWhatsAppClick = () => {
    // TODO: Substituir pelo número real do WhatsApp
    const whatsappUrl = `https://wa.link/gv2qop`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col bg-black">
      {/* Floating decorative elements */}
      <div className="absolute top-8 left-8 animate-pulse">
        <Heart className="w-6 h-6 text-red-600 fill-current opacity-60" />
      </div>
      <div className="absolute top-16 right-12 animate-bounce">
        <Star className="w-5 h-5 text-red-500 fill-current opacity-50" />
      </div>
      <div className="absolute bottom-20 left-16 animate-pulse">
        <div className="w-3 h-3 bg-red-600 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-32 right-8 animate-bounce">
        <div className="w-2 h-2 bg-red-500 rounded-full opacity-60"></div>
      </div>

      {/* Cover Image - Reduzido */}
      <div className="relative h-32 md:h-40 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=400" 
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-red-600/20"></div>
      </div>

      {/* Profile Section */}
      <div className="relative -mt-12 px-4 pb-6">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 max-w-4xl mx-auto">
          
          {/* Profile Image com efeitos */}
          <div className="relative">
            <div className="absolute -inset-1 bg-red-600 rounded-full blur opacity-75"></div>
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 border-red-600 bg-black shadow-xl glow-red">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=200&h=200&face" 
                alt="Isabella"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black pulse-red flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="font-playfair text-2xl md:text-3xl font-bold text-red-600">
                ISABELA
              </h1>
              <div className="flex gap-1">
                <Star className="w-4 h-4 text-red-600 fill-current" />
                <Star className="w-4 h-4 text-red-600 fill-current" />
                <Star className="w-4 h-4 text-red-600 fill-current" />
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm md:text-base mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Tenho 21 anos e sou de <span className="text-red-600 font-semibold">{cidade}</span>
            </p>

            {/* Social Media Buttons com novos estilos */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={handleInstagramClick}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-all shadow-lg hover:shadow-red-600/30 border border-red-600/30 hover:bg-red-700"
              >
                <Instagram size={14} />
                Instagram
              </button>
              
              <button
                onClick={handleTelegramClick}
                className="flex items-center gap-2 bg-red-700 text-white px-3 py-2 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-all shadow-lg hover:shadow-red-700/30 border border-red-700/30 hover:bg-red-800"
              >
                <MessageCircle size={14} />
                Prévias
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full text-xs md:text-sm font-medium hover:scale-105 transition-all shadow-lg hover:shadow-red-800/30 border border-red-600 hover:bg-red-900"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2.011c-5.506 0-9.974 4.468-9.974 9.974 0 1.76.46 3.416 1.257 4.851L2.04 21.99l5.154-1.26a9.956 9.956 0 004.823 1.257c5.506 0 9.974-4.468 9.974-9.974s-4.468-9.974-9.974-9.974zm0 18.187a8.235 8.235 0 01-4.197-1.154l-.301-.179-3.128.765.788-3.128-.197-.32a8.235 8.235 0 01-1.174-4.197c0-4.556 3.708-8.264 8.264-8.264s8.264 3.708 8.264 8.264-3.708 8.264-8.264 8.264z"/>
                  <path d="M16.735 13.492c-.301-.151-1.781-.879-2.057-.979-.276-.1-.477-.151-.678.151-.201.301-.779.979-.956 1.18-.176.201-.352.226-.653.075-.301-.151-1.271-.469-2.42-1.494-.894-.799-1.497-1.786-1.673-2.087-.176-.301-.019-.463.132-.614.135-.135.301-.352.452-.528.151-.176.201-.301.301-.502.1-.201.05-.377-.025-.528-.075-.151-.678-1.634-.929-2.238-.246-.593-.497-.513-.678-.522-.176-.009-.377-.011-.578-.011s-.528.075-.804.377c-.276.301-1.055 1.031-1.055 2.515s1.08 2.918 1.231 3.12c.151.201 2.132 3.256 5.166 4.568.722.312 1.286.498 1.725.638.725.231 1.385.198 1.908.12.582-.087 1.781-.729 2.032-1.432.251-.703.251-1.306.176-1.432-.075-.126-.276-.201-.578-.352z"/>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Main Description com design melhorado */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="bg-black rounded-xl p-4 md:p-6 shadow-xl relative overflow-hidden border border-red-600">
            {/* Decorative elements inside card */}
            <div className="absolute top-2 right-2 text-red-600/20">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <div className="absolute bottom-2 left-2 text-red-600/10">
              <Star className="w-6 h-6 fill-current" />
            </div>
            
            <h2 className="text-lg md:text-xl font-bold text-red-600 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              PUTA CHEFE NÉ BEBÊ? A 01 🥇
            </h2>
            
            <div className="space-y-2 text-card-foreground text-sm md:text-base relative z-10">
              <p className="leading-relaxed">
                Os vídeos contêm sexo explícito mostrando tudo, vídeo mamando, se masturbando e tudo mais que você pode imaginar! Aqui tem de tudo!!!
              </p>
              
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 my-3">
                <p className="text-red-400 font-semibold text-center">
                  NOVINHA DO BUCETÃO 😍😋<br/>
                  BUCETINHA TÃO GOSTOSA E NOVINHA QUE NEM PARECE QUE JÁ FOI USADA!! 🔥😋 🔥
                </p>
              </div>
              
              <p className="leading-relaxed">
                AQUI TAMBÉM TEM MUITO CHAT PRIVADO COM FOTOS E VÍDEOS EXCLUSIVOS QUE MANDO PRA VOCÊ, COMO VOCÊ PEDIR 🍷😈📞
              </p>
              
              <p className="leading-relaxed">
                Conteúdo pesado MESMO, gosto de conversar no chat, aqui você vai ver de tudo e vai se apaixonar!
              </p>
              
              <div className="bg-black/40 border border-red-600/40 rounded-lg p-3 my-3">
                <p className="text-red-300 font-semibold text-center">
                  ME MANDA FOTO DO PAU QUE EU GOSTO MUITO 😈🍆📞
                </p>
              </div>
              
              <p className="leading-relaxed font-medium text-red-200">
                EU POSTO CONTEÚDO TODOS OS DIAS E FALO COM VOCÊ NO CHAT!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
