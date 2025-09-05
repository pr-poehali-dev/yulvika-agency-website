import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface TariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariffName: string;
  tariffPrice: string;
}

export default function TariffModal({ isOpen, onClose, tariffName, tariffPrice }: TariffModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Отправляем данные на PHP API
      const response = await fetch('/api/save-tariff.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          tariffName: tariffName
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        
        // Закрыть модальное окно через 2 секунды после успешной отправки
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", phone: "" });
          onClose();
        }, 2000);
      } else {
        throw new Error(result.message || 'Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Error submitting tariff form:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">Заявка на тариф</CardTitle>
            <p className="text-sm text-muted-foreground">{tariffName} - {tariffPrice}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Check" size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Заявка отправлена!</h3>
              <p className="text-muted-foreground">
                Мы свяжемся с вами в течение 30 минут
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Имя *</label>
                <Input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Введите ваше имя" 
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Номер телефона *</label>
                <Input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+7 (___) ___-__-__" 
                  className="mt-1" 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Icon name="Send" size={18} className="ml-2" />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                * Обязательные поля. Мы свяжемся с вами в течение 30 минут.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}