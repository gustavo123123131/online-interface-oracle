
import React, { useState, useEffect } from 'react';
import { Package } from '../types';
import { createPixPayment, checkPaymentStatus } from '../api/pushingpay';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  package: Package;
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ package: pkg, isOpen, onClose }) => {
  const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'processing' | 'completed' | 'error'>('waiting');
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [pixKey, setPixKey] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      initializePayment();
    }
  }, [isOpen]);

  const initializePayment = async () => {
    try {
      setPaymentStatus('processing');
      
      // Integração real com PushingPay
      const payment = await createPixPayment({
        amount: pkg.price,
        description: `${pkg.name} - ${pkg.description}`,
        customer_email: 'cliente@exemplo.com'
      });
      
      console.log('✅ PIX COPIA E COLA:', payment.qr_code);
      console.log('🖼️ QR CODE BASE64:', payment.qr_code_base64);
      
      // Verificar se o qr_code_base64 já contém o prefixo data:image
      const qrCodeBase64 = payment.qr_code_base64;
      if (qrCodeBase64.startsWith('data:image')) {
        setQrCodeImage(qrCodeBase64);
      } else {
        setQrCodeImage(`data:image/png;base64,${qrCodeBase64}`);
      }
      
      setPixKey(payment.qr_code);
      setPaymentId(payment.id);
      setPaymentStatus('waiting');
      
      // Iniciar polling para verificar pagamento
      const interval = setInterval(async () => {
        try {
          const statusResponse = await checkPaymentStatus(payment.id);
          
          if (statusResponse.status === 'paid') {
            setPaymentStatus('completed');
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Erro ao verificar status:', error);
        }
      }, 3000);
      
      // Limpar interval após 10 minutos
      setTimeout(() => clearInterval(interval), 600000);
      
    } catch (error) {
      console.error('Erro ao inicializar pagamento:', error);
      setPaymentStatus('error');
    }
  };

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast({
        title: "PIX Copiado!",
        description: "A chave PIX foi copiada para a área de transferência.",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback para browsers mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = pixKey;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast({
        title: "PIX Copiado!",
        description: "A chave PIX foi copiada para a área de transferência.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="card-gradient rounded-2xl w-full max-w-sm mx-auto max-h-[95vh] overflow-y-auto border border-gray-800 animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="font-playfair text-lg font-bold text-gradient">
            Finalizar Compra
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Package Summary */}
          <div className="border border-gray-700 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{pkg.emoji}</span>
              <span className="text-lg font-bold text-gradient">
                R$ {pkg.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <h4 className="font-playfair text-base font-semibold text-white mb-2">
              {pkg.name}
            </h4>
            <p className="text-rose-baby text-sm mb-2">
              {pkg.description}
            </p>
            <ul className="space-y-1">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="text-gray-300 text-xs flex items-start">
                  <span className="text-rose-baby mr-2 mt-0.5">•</span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Section */}
          <div className="text-center">
            {paymentStatus === 'processing' && (
              <div className="py-6">
                <div className="animate-spin w-6 h-6 border-2 border-rose-baby border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-gray-300 text-sm">Gerando pagamento Pix...</p>
              </div>
            )}

            {paymentStatus === 'waiting' && (
              <div className="space-y-4">
                {qrCodeImage && (
                  <div>
                    <img 
                      src={qrCodeImage}
                      alt="QR Code PIX" 
                      className="w-40 h-40 mx-auto bg-white rounded-xl p-3"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <p className="text-rose-baby font-semibold text-sm">
                    Escaneie o QR Code para pagar
                  </p>
                  <p className="text-gray-400 text-xs">
                    Pagamento via Pix • Aprovação instantânea
                  </p>
                </div>
                
                {pixKey && (
                  <div className="bg-gray-800 rounded-lg p-3 space-y-3">
                    <p className="text-xs text-gray-400">Chave Pix:</p>
                    <div className="bg-gray-900 p-2 rounded text-xs text-white font-mono break-all">
                      {pixKey}
                    </div>
                    
                    <button
                      onClick={copyPixKey}
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        copied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar chave Pix
                        </>
                      )}
                    </button>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 px-2">
                  Após o pagamento, você será redirecionado para o WhatsApp da modelo em até 5 minutos
                </p>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="py-6 text-center space-y-3">
                <div className="text-green-500 text-4xl">✅</div>
                <h4 className="text-lg font-bold text-green-500">
                  Pagamento Confirmado!
                </h4>
                <p className="text-gray-300 text-sm">
                  Você será redirecionado para o WhatsApp da modelo!
                </p>
                <button
                  onClick={onClose}
                  className="btn-primary text-black font-semibold px-6 py-3 rounded-xl text-sm"
                >
                  Fechar
                </button>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="py-6 text-center space-y-3">
                <div className="text-red-500 text-4xl">❌</div>
                <h4 className="text-lg font-bold text-red-500">
                  Erro no Pagamento
                </h4>
                <p className="text-gray-300 text-sm">
                  Ocorreu um erro. Tente novamente.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={initializePayment}
                    className="btn-primary text-black font-semibold px-4 py-2 rounded-xl text-sm flex-1"
                  >
                    Tentar Novamente
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white px-4 py-2 text-sm flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            🔒 Pagamento seguro via PushingPay • Seus dados estão protegidos
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
