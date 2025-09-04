import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import TariffModal from "@/components/TariffModal";

export default function Index() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    tariffName: string;
    tariffPrice: string;
  }>({ isOpen: false, tariffName: "", tariffPrice: "" });

  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const scrollToContactForm = () => {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openModal = (tariffName: string, tariffPrice: string) => {
    setModalState({ isOpen: true, tariffName, tariffPrice });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, tariffName: "", tariffPrice: "" });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);

    const emailData = {
      to: "zayavki@xn--80aegecargbg8bk.xn--p1ai", // zayavki@юлвика.рф в punycode
      subject: encodeURIComponent("Новая заявка с сайта ЮЛВИКА"),
      body: encodeURIComponent(`
Новая заявка с формы обратной связи:

Имя: ${contactForm.name}
Компания: ${contactForm.company}
Email: ${contactForm.email}
Телефон: ${contactForm.phone}
Сообщение: ${contactForm.message}

Дата заявки: ${new Date().toLocaleString('ru-RU')}
      `)
    };

    console.log('Отправка контактной формы:', emailData);
    
    setTimeout(() => {
      setIsContactSubmitting(false);
      setIsContactSubmitted(true);
      setContactForm({ name: "", company: "", email: "", phone: "", message: "" });
      
      setTimeout(() => {
        setIsContactSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Ю</span>
            </div>
            <span className="text-xl font-bold text-primary">ЮЛВИКА</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a>
            <a href="#tariffs" className="text-muted-foreground hover:text-primary transition-colors">Тарифы</a>
            <a href="#advantages" className="text-muted-foreground hover:text-primary transition-colors">Преимущества</a>
            <a href="#contacts" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="hidden md:inline-flex" onClick={scrollToContactForm}>Получить консультацию</Button>
          <Button variant="outline" size="sm" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">Кадровое агентство полного цикла</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Найдём лучших<br />
            <span className="text-destructive">специалистов</span><br />
            для вашего бизнеса
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Специализируемся на подборе персонала для банков, IT-платформ и крупных корпораций. 
            Гарантируем результат в кратчайшие сроки.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={scrollToContactForm}>
              Подобрать персонал
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* About Company */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">О компании</Badge>
              <h2 className="text-3xl font-bold text-primary mb-6">ЮЛВИКА — ваш надёжный партнёр в подборе персонала</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Мы специализируемся на поиске и подборе высококвалифицированных специалистов 
                для крупных организаций. Наша экспертиза охватывает банковскую сферу, 
                IT-индустрию и корпоративный сектор.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Закрытых вакансий</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">120+</div>
                  <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/85e207bf-7096-413d-aed7-2aaba1e3cf17.jpg" 
                alt="Офисная среда" 
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tariff Plans */}
      <section id="tariffs" className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Тарифные планы</Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">Выберите подходящий тариф</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Гибкие условия сотрудничества для компаний любого масштаба
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Лайт */}
            <Card className="relative border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-2xl">Лайт</CardTitle>
                <div className="text-3xl font-bold text-primary">от 50 000₽</div>
                <div className="text-sm text-muted-foreground">за закрытую вакансию</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Подбор специалистов среднего звена</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Гарантия замены 3 месяца</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Срок закрытия до 30 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Email поддержка</span>
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => openModal("Лайт", "от 50 000₽")}>Выбрать план</Button>
              </CardContent>
            </Card>

            {/* Стандарт */}
            <Card className="relative border-2 border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-destructive text-destructive-foreground">Популярный</Badge>
              </div>
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Star" size={24} className="text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Стандарт</CardTitle>
                <div className="text-3xl font-bold text-primary">от 80 000₽</div>
                <div className="text-sm text-muted-foreground">за закрытую вакансию</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Подбор руководящих позиций</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Гарантия замены 6 месяцев</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Срок закрытия до 20 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Персональный менеджер</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Психологическое тестирование</span>
                </div>
                <Button className="w-full mt-6" onClick={() => openModal("Стандарт", "от 80 000₽")}>Выбрать план</Button>
              </CardContent>
            </Card>

            {/* Профи */}
            <Card className="relative border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Crown" size={24} className="text-destructive-foreground" />
                </div>
                <CardTitle className="text-2xl">Профи</CardTitle>
                <div className="text-3xl font-bold text-primary">от 150 000₽</div>
                <div className="text-sm text-muted-foreground">за закрытую вакансию</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Подбор топ-менеджеров</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Гарантия замены 12 месяцев</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Срок закрытия до 14 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Dedicated команда</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm">Executive поиск</span>
                </div>
                <Button className="w-full mt-6" variant="outline" onClick={() => openModal("Профи", "от 150 000₽")}>Выбрать план</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Наши преимущества</Badge>
            <h2 className="text-3xl font-bold text-primary mb-4">Почему с нами выгодно работать</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Многолетний опыт и проверенные методики подбора персонала
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Быстрый результат</h3>
                <p className="text-muted-foreground">
                  Средний срок закрытия вакансии — 20 дней. Экспресс-подбор за 7 дней для критичных позиций.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Shield" size={32} className="text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-4">100% гарантия</h3>
                <p className="text-muted-foreground">
                  Бесплатная замена кандидата в течение гарантийного периода. Возврат средств при неуспехе.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Users" size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Экспертиза</h3>
                <p className="text-muted-foreground">
                  Глубокие знания банковской сферы и IT-индустрии. Проверенная база из 50 000+ специалистов.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts & Contact Form */}
      <section id="contacts" className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <Badge variant="outline" className="mb-4">Контакты</Badge>
              <h2 className="text-3xl font-bold text-primary mb-6">Свяжитесь с нами</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Готовы обсудить ваши потребности в персонале и предложить оптимальное решение.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Телефон</div>
                    <div className="text-muted-foreground">+7 919 903 9250</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">info@юлвика.рф</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Адрес</div>
                    <div className="text-muted-foreground">Москва, ул. Деловая, 15, офис 301</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Время работы</div>
                    <div className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Форма обратной связи</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isContactSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Check" size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Сообщение отправлено!</h3>
                    <p className="text-muted-foreground">
                      Мы свяжемся с вами в ближайшее время
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Имя *</label>
                      <Input 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Введите ваше имя" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Компания *</label>
                      <Input 
                        required
                        value={contactForm.company}
                        onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                        placeholder="Название компании" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email *</label>
                      <Input 
                        required
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your@email.com" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Телефон</label>
                      <Input 
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        placeholder="+7 (___) ___-__-__" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Сообщение</label>
                      <Textarea 
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Опишите ваши потребности в персонале..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isContactSubmitting}>
                      {isContactSubmitting ? (
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
                      * Обязательные поля. Мы свяжемся с вами в течение 2 часов в рабочее время.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">Ю</span>
                </div>
                <span className="text-xl font-bold">ЮЛВИКА</span>
              </div>
              <p className="text-primary-foreground/70 text-sm">
                Кадровое агентство полного цикла для крупного бизнеса
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/70">Подбор персонала</div>
                <div className="text-primary-foreground/70">Executive Search</div>
                <div className="text-primary-foreground/70">Массовый рекрутинг</div>
                <div className="text-primary-foreground/70">Аутстаффинг</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Отрасли</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/70">Банки и финансы</div>
                <div className="text-primary-foreground/70">IT и интернет</div>
                <div className="text-primary-foreground/70">Производство</div>
                <div className="text-primary-foreground/70">Розничная торговля</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm">
                <div className="text-primary-foreground/70">+7 919 903 9250</div>
                <div className="text-primary-foreground/70">info@юлвика.рф</div>
                <div className="text-primary-foreground/70">Москва, ул. Деловая, 15</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-primary-foreground/70">
              © 2024 ЮЛВИКА. Все права защищены.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">Политика конфиденциальности</a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
      
      <TariffModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        tariffName={modalState.tariffName}
        tariffPrice={modalState.tariffPrice}
      />
    </div>
  );
}