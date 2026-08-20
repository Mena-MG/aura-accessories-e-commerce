import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageSquare, X, Send, Sparkles, Bot, User, ArrowRight, ExternalLink } from 'lucide-react';
import { formatPrice } from '../data/mockData';

export const KitchenAIChatbot = () => {
  const { chatbotOpen, setChatbotOpen, language, t, products, navigateTo, addToCart } = useShop();
  const isAr = language === 'ar';

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: isAr
        ? 'أهلاً بك في أورا للمطابخ! 🏠✨ أنا مساعدك الذكي المتخصص في خامات المطابخ والجرانيت والكوارتز والدواليب. اسألني عن أي مقارنة بين الخامات، مقاومة الحرارة، أو التكلفة المناسبة لمساحة مطبخك!'
        : 'Welcome to Aura Kitchen Market! 🏠✨ I am your dedicated AI Kitchen Material Guide. Ask me anything about granite vs quartz, thermal resistance, cabinet durability, or budget planning!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Intelligent Material Recommendation & Knowledge Engine
  const generateAIResponse = (userText) => {
    const q = userText.toLowerCase();

    // 1. Granite vs Quartz
    if (q.includes('جرانيت') && q.includes('كوارتز') || (q.includes('granite') && q.includes('quartz'))) {
      return {
        text: isAr
          ? 'المقارنة بين الجرانيت والكوارتز للمطابخ:\n\n🪨 **الجرانيت الطبيعي (مثل بلاك جالاكسي):**\n• ممتاز جداً للمطابخ النشطة ذات الطهي المكثف.\n• مقاومة قصوى للحرارة حتى ٣٥٠ درجة مئوية (يمكنك وضع الأواني الساخنة مباشرة على الرخامة).\n• مقاوم للخدوش بشكل مذهل.\n\n✨ **الكوارتز المعالج (مثل كلاكتا جولد):**\n• يتميز بمسامية صفرية، مما يجعله مانعاً للبقع بنسبة ١٠٠٪ (الليمون، الخل، والقهوة لا تترك أثراً).\n• تصاميم عروق رخامية راقية وموحدة.\n• يُنصح باستخدام قواعد حماية للأواني الساخنة جداً (+١٥٠ م).'
          : 'Granite vs. Quartz for Modern Kitchens:\n\n🪨 **Natural Granite (e.g. Black Galaxy):**\n• 100% heat proof up to 350°C (hot pans straight from stove).\n• Extreme scratch resistance for heavy-duty cooking.\n\n✨ **Engineered Quartz (e.g. Calacatta Gold):**\n• 0% Porosity: Completely impervious to lemon acid, vinegar, and coffee stains.\n• Flawless Italian marble-look veining without sealing needs.\n• Heat resistant up to 150°C (trivets recommended).',
        recommendedProduct: products.find(p => p.id === 'prod-1' || p.id === 'prod-2')
      };
    }

    // 2. Heat resistance
    if (q.includes('حرارة') || q.includes('سخن') || q.includes('heat') || q.includes('hot')) {
      return {
        text: isAr
          ? '🔥 **أفضل خامة لمقاومة الحرارة العالية:**\n\nالجرانيت الطبيعي (Black Galaxy أو Imperial White) هو البطل بلا منازع! يتميز بسماكة ٣ سم صلبة تمتص وتتحمل الصدمات الحرارية دون أي تشقق أو تغير باللون.'
          : '🔥 **Top Heat-Resistant Material:**\n\nNatural Granite is undefeated. It easily withstands thermal shocks up to 350°C without discoloring or cracking.',
        recommendedProduct: products.find(p => p.id === 'prod-1')
      };
    }

    // 3. Cabinets (PVC vs Acrylic vs HPL)
    if (q.includes('دولاب') || q.includes('دواليب') || q.includes('pvc') || q.includes('أكريليك') || q.includes('cabinet')) {
      return {
        text: isAr
          ? '🗄️ **مقارنة خامات دواليب المطبخ:**\n\n١. **دواليب الـ PVC:** مقاومة ١٠٠٪ للماء والأبخرة وبسعر اقتصادي ممتاز.\n٢. **الأكريليك النمساوي:** قمة الفخامة، ملمس مطفي مانع للبصمات مع شريط ليزري خفي.\n٣. **الـ HPL الخشبي:** مظهر خشب طبيعي دافئ فائق التحمل ضد الخدوش.'
          : '🗄️ **Kitchen Cabinetry Breakdown:**\n\n1. **Thermal PVC:** 100% waterproof, easy wipe-down, great value.\n2. **Austrian Acrylic:** Ultra-luxury matte finish, zero fingerprints, laser-sealed joints.\n3. **Textured HPL:** Organic warm woodgrain with extreme scratch resistance.',
        recommendedProduct: products.find(p => p.id === 'prod-4' || p.id === 'prod-5')
      };
    }

    // 4. Corian
    if (q.includes('كوريان') || q.includes('corian')) {
      return {
        text: isAr
          ? '✨ **الكوريان (Solid Surface):**\nخامة أكريليك مذهلة تتيح تصنيع سطح المطبخ مع الحوض المدمج والوزرة كقطعة واحدة ملساء بدون أي فواصل مرئية. قابلة للتلميع والتجديد في مكانها لتعود كالجديدة تماماً!'
          : '✨ **Corian Solid Surface:**\n100% seamless thermoformed acrylic. Sinks and backsplashes can be molded with zero joints. Easily renewable and repolished on-site!',
        recommendedProduct: products.find(p => p.id === 'prod-3')
      };
    }

    // 5. Budget Allocation
    if (q.includes('ميزانية') || q.includes('تكلفة') || q.includes('سعر') || q.includes('budget') || q.includes('cost')) {
      return {
        text: isAr
          ? '📊 **التوزيع المثالي لميزانية المطبخ:**\n\n• ٤٥٪ لدواليب ووحدات المطبخ (PVC أو أكريليك مع مفصلات بلوم هيدروليك)\n• ٢٥٪ لأسطح الرخام أو الجرانيت أو الكوارتز\n• ١٥٪ للأجهزة البلت إن والأحواض الألمانية\n• ١٥٪ لمصنعية التركيب والتشطيب الدقيق\n\n💡 جرب استخدام "حاسبة الأسعار الذكية" في الموقع لحساب التكلفة الدقيقة لمطبخك الآن!'
          : '📊 **Ideal Kitchen Budget Allocation:**\n\n• 45% Cabinetry units & German soft-close hardware\n• 25% Countertop stone slabs (Granite or Quartz)\n• 15% Sinks, faucets & built-in appliances\n• 15% Expert site installation & management\n\n💡 Try our Smart Price Calculator on the navbar to get a live itemized estimate!',
      };
    }

    // Default Friendly Kitchen Expert Reply
    return {
      text: isAr
        ? `يسعدني إفادتك! في أورا نوفر تشكيلة من أفضل خامات الجرانيت، الكوارتز الأسباني، الكوريان، ودواليب الـ PVC والأكريليك. يمكنك تصفح الكتالوج بالكامل أو استخدام حاسبة الأسعار أو تجربة خاماتك مباشرة في استوديو 3D!`
        : `Happy to help! At Aura, we engineer certified natural granites, engineered quartz, seamless Corian, and German-grade cabinetry. Browse our full catalog, try the 3D visualizer, or calculate your exact kitchen cost with our smart estimator!`,
      recommendedProduct: products[0]
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(query);
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        recommendedProduct: response.recommendedProduct,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setChatbotOpen(prev => !prev)}
        className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-40 p-3.5 rounded-2xl bg-accent-gold text-noir-950 shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 font-bold text-xs group border-2 border-brand-50"
      >
        <div className="relative">
          <Bot size={20} className="animate-pulse-subtle" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-noir-950" />
        </div>
        <span className="hidden sm:inline font-sans">{t('aiGuide')}</span>
      </button>

      {/* Chat Drawer / Modal */}
      {chatbotOpen && (
        <div className="fixed bottom-20 left-6 rtl:left-auto rtl:right-6 z-50 w-full max-w-sm sm:max-w-md bg-brand-50 text-noir-900 border border-brand-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px] animate-slide-up">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-brand-100 border-b border-brand-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-accent-gold/25 text-accent-gold flex items-center justify-center font-bold">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm text-noir-900 flex items-center gap-1.5">
                  {t('aiTitle')}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </h3>
                <p className="text-[11px] text-noir-600 font-sans">{t('aiSubtitle')}</p>
              </div>
            </div>

            <button
              onClick={() => setChatbotOpen(false)}
              className="p-1.5 rounded-xl hover:bg-brand-200 text-noir-500 hover:text-noir-900 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-accent-gold/20 text-accent-gold flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={15} />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-noir-900 text-brand-50 rounded-br-none rtl:rounded-br-2xl rtl:rounded-bl-none'
                        : 'bg-brand-100 text-noir-900 border border-brand-200 rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Recommended Product Card Inline */}
                  {m.recommendedProduct && (
                    <div className="p-2.5 rounded-xl bg-brand-100/90 border border-brand-300 shadow-sm flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={m.recommendedProduct.image}
                          alt={m.recommendedProduct.name}
                          className="w-10 h-10 rounded-lg object-cover border border-brand-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[11px] text-noir-900 line-clamp-1">
                            {isAr ? (m.recommendedProduct.nameAr || m.recommendedProduct.name) : m.recommendedProduct.name}
                          </p>
                          <span className="font-mono font-bold text-accent-gold text-[10px]">
                            {formatPrice(m.recommendedProduct.price, language)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigateTo('product-detail', m.recommendedProduct.id);
                          setChatbotOpen(false);
                        }}
                        className="p-1.5 rounded-lg bg-accent-gold text-noir-950 hover:opacity-90 transition-opacity"
                        title="View Material"
                      >
                        <ArrowRight size={14} className="rtl:rotate-180" />
                      </button>
                    </div>
                  )}

                  <span className="text-[10px] text-noir-400 block px-1">
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-noir-800 text-brand-50 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={15} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-noir-500 text-xs italic">
                <div className="w-2 h-2 rounded-full bg-accent-gold animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-accent-gold animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-accent-gold animate-bounce [animation-delay:0.4s]" />
                <span>{t('aiThinking')}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 bg-brand-100/40 border-t border-brand-200/60 overflow-x-auto flex gap-1.5 text-[11px] whitespace-nowrap">
            {[
              t('aiChip1'),
              t('aiChip2'),
              t('aiChip3'),
              t('aiChip4')
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 hover:border-accent-gold text-noir-700 hover:text-noir-900 transition-colors text-[11px]"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-brand-100 border-t border-brand-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t('aiPlaceholder')}
              className="flex-1 px-4 py-2 rounded-xl border border-brand-300 bg-brand-50 text-xs focus:ring-2 focus:ring-accent-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded-xl bg-accent-gold text-noir-950 font-bold hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              <Send size={16} className="rtl:rotate-180" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
