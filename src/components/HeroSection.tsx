
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
        setCidade('São Paulo');
      });
  }, []);

  const handleInstagramClick = () => {
    window.open('https://instagram.com/isabella', '_blank');
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/isabella_previas', '_blank');
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.link/gv2qop`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col bg-black">
      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-8 right-8">
        <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-70"></div>
      </div>
      <div className="absolute bottom-20 left-8">
        <div className="w-2 h-2 dark-red bg-red-900 rounded-full"></div>
      </div>

      {/* Cover Image elegante */}
      <div className="relative h-32 md:h-36 overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=400" 
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
      </div>

      {/* Profile Section */}
      <div className="relative -mt-12 px-4 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 max-w-5xl mx-auto">
          
          {/* Profile Image elegante */}
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-red-900 bg-gray-900 elegant-shadow">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=200&h=200&face" 
                alt="Isabella"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status indicator elegante */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-900 rounded-full border-3 border-black">
              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1.5"></div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                ISABELA
              </h1>
              <Star className="w-5 h-5 text-amber-400 fill-current" />
            </div>
            
            <p className="mature-text text-base md:text-lg mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-red-900 rounded-full"></span>
              21 anos • <span className="dark-red font-medium">{cidade}</span>
            </p>

            {/* Social Media Buttons elegantes */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={handleInstagramClick}
                className="flex items-center gap-2 bg-red-900 text-white px-4 py-3 rounded-lg text-sm font-medium elegant-hover border border-gray-700"
              >
                <Instagram size={16} />
                Instagram
              </button>
              
              <button
                onClick={handleTelegramClick}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg text-sm font-medium elegant-hover border border-red-900"
              >
                <MessageCircle size={16} />
                Prévias
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-lg text-sm font-medium elegant-hover border border-gray-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 2.011c-5.506 0-9.974 4.468-9.974 9.974 0 1.76.46 3.416 1.257 4.851L2.04 21.99l5.154-1.26a9.956 9.956 0 004.823 1.257c5.506 0 9.974-4.468 9.974-9.974s-4.468-9.974-9.974-9.974zm0 18.187a8.235 8.235 0 01-4.197-1.154l-.301-.179-3.128.765.788-3.128-.197-.32a8.235 8.235 0 01-1.174-4.197c0-4.556 3.708-8.264 8.264-8.264s8.264 3.708 8.264 8.264-3.708 8.264-8.264 8.264z"/>
                  <path d="M16.735 13.492c-.301-.151-1.781-.879-2.057-.979-.276-.1-.477-.151-.678.151-.201.301-.779.979-.956 1.18-.176.201-.352.226-.653.075-.301-.151-1.271-.469-2.42-1.494-.894-.799-1.497-1.786-1.673-2.087-.176-.301-.019-.463.132-.614.135-.135.301-.352.452-.528.151-.176.201-.301.301-.502.1-.201.05-.377-.025-.528-.075-.151-.678-1.634-.929-2.238-.246-.593-.497-.513-.678-.522-.176-.009-.377-.011-.578-.011s-.528.075-.804.377c-.276.301-1.055 1.031-1.055 2.515s1.08 2.918 1.231 3.12c.151.201 2.132 3.256 5.166 4.568.722.312 1.286.498 1.725.638.725.231 1.385.198 1.908.12.582-.087 1.781-.729 2.032-1.432.251-.703.251-1.306.176-1.432-.075-.126-.276-.201-.578-.352z"/>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Main Description elegante */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="elegant-bg rounded-xl p-6 md:p-8 elegant-shadow dark-red-border relative">
            {/* Elemento decorativo sutil */}
            <div className="absolute top-4 right-4 text-red-900/20">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold dark-red mb-4 font-playfair">
              Conteúdo Exclusivo Premium
            </h2>
            
            <div className="space-y-4 mature-text text-sm md:text-base leading-relaxed">
              <p>
                Acesso a conteúdo adulto exclusivo e de alta qualidade, com vídeos sensuais completos e material íntimo personalizado.
              </p>
              
              <div className="bg-red-900 text-white rounded-lg p-4 my-4">
                <p className="font-semibold text-center font-playfair">
                  Experiência Premium • Conteúdo Exclusivo • Atendimento VIP
                </p>
              </div>
              
              <p>
                Chat privado personalizado com fotos e vídeos sob demanda, criados especialmente para você com total discrição.
              </p>
              
              <p>
                Material adulto autêntico e de qualidade superior, com atualizações diárias e interação direta no chat privado.
              </p>
              
              <div className="bg-gray-900 text-white rounded-lg p-4 my-4 border border-gray-700">
                <p className="font-medium text-center">
                  Atendimento Personalizado • Conteúdo Diário • Máxima Discrição
                </p>
              </div>
              
              <p className="font-medium dark-red">
                NOVO CONTEÚDO TODOS OS DIAS COM INTERAÇÃO DIRETA NO CHAT PRIVADO
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
