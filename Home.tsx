import { useCallback, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Leaf,
  Mail,
  Menu,
  Phone,
  Quote,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  assets,
  budgetRanges,
  challenges,
  comparisonRows,
  navigationItems,
  painPoints,
  propertyTypes,
  serviceSteps,
  technologyItems,
} from "./wetopContent";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
};

const logoSrc = "/images/WETOP-LOGO-紅.png";

function SectionHeading({ eyebrow, title, description, light = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <span className="section-kicker">{eyebrow}</span>
      <h2>{title}</h2>
      <span className="section-divider" aria-hidden="true" />
      <p>{description}</p>
    </div>
  );
}

function useCopyToClipboard() {
  return useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`已複製${label}話術`, {
        description: "可直接貼上至您的提案簡報或通訊軟體",
        duration: 2400,
      });
    } catch {
      toast.error("複製失敗，請手動選取文字複製");
    }
  }, []);
}

function BrandMark() {
  return (
    <span className="brand-symbol" aria-hidden="true">
      <img src={logoSrc} alt="" className="brand-symbol-image" />
    </span>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPains, setSelectedPains] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const copyToClipboard = useCopyToClipboard();
  const encodeForm = (payload: Record<string, string>) => new URLSearchParams(payload).toString();

  const togglePain = (name: string) => {
    setSelectedPains((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const painArray = Array.from(selectedPains);

    if (import.meta.env.DEV) {
      toast.success("本機預覽模式已模擬送出", {
        description: "部署到 Netlify 後，表單資料會進入後台 submissions",
        duration: 4000,
      });
      formRef.current?.reset();
      setSelectedPains(new Set());
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeForm({
          "form-name": "consultation",
          name: String(formData.get("name") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          propertyType: String(formData.get("propertyType") || ""),
          budget: String(formData.get("budget") || ""),
          painPoints: painArray.join(", "),
          message: String(formData.get("message") || ""),
        }),
      });

      if (!response.ok) {
        throw new Error("submit-failed");
      }

      toast.success("預約諮詢已送出！", {
        description: "我們將儘快與您聯繫，安排健康設計諮詢",
        duration: 4000,
      });
      formRef.current?.reset();
      setSelectedPains(new Set());
    } catch {
      toast.error("送出失敗", {
        description: "請確認網站已部署到 Netlify，或稍後再試",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wetop-site">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="#top" aria-label="WETOP 設計師健康方案首頁">
            <BrandMark />
            <span><strong>WETOP</strong> 設計師健康方案</span>
          </a>

          <nav className="desktop-navigation" aria-label="主要導覽">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <button
            className="mobile-menu-trigger"
            type="button"
            aria-label="開啟導覽選單"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="行動版導覽選單" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <a className="site-brand mobile-menu-brand" href="#top" onClick={() => setMobileMenuOpen(false)}>
                <BrandMark />
                <span><strong>WETOP</strong> 設計師健康方案</span>
              </a>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="關閉選單"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={22} />
            </button>
            </div>
            <p className="mobile-menu-eyebrow">設計師健康方案中心</p>
            <nav className="mobile-navigation" aria-label="行動版導覽">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main>
        <section id="top" className="hero-section" style={{ backgroundImage: `url(${assets.hero})` }}>
          <div className="hero-veil" />
          <div className="hero-content page-container">
            <div className="hero-kicker">設計師價值升級計畫</div>
            <h1><span>價格的紅海</span><em>vs.</em><strong>信任的藍海</strong></h1>
            <p className="hero-lead">
              當設計師不再只是討論「風格」與「材質」，而是能指出客戶「從來沒想過可以解決」的生活痛點，並提出具體的設計對策時，設計師的價值就不再需要「證明」——客戶會自己感受到。
            </p>
            <div className="hero-actions">
              <a href="#pain-points" className="button button-primary">探索五大生活痛點 <ArrowRight size={17} /></a>
              <a href="#contact" className="button button-ghost">預約健康設計諮詢 <ChevronRight size={17} /></a>
            </div>
            <div className="sea-cards" aria-label="價格競爭與信任競爭的對比">
              <article className="sea-card sea-card-red">
                <span className="sea-card-label">價格的紅海</span>
                <p>低價搶單、事後追加預算。設計和服務看起來都差不多時，客戶自然只能比價格。設計師的專業能力難以在前期溝通中被量化感知。</p>
              </article>
              <article className="sea-card sea-card-blue">
                <span className="sea-card-label">信任的藍海</span>
                <p>用「健康」建立無法被複製的差異化。讓設計「有感」，透過具體設計元素讓客戶看見你幫他解決了多少生活痛點。從「空間設計師」升級為「健康生活顧問」。</p>
              </article>
            </div>
          </div>
        </section>

        <section id="challenges" className="content-section challenges-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="設計師三大難題"
              title="設計師的三大難題，WETOP 如何破解？"
              description="價格戰與同質化、難以體現的價值、客戶的隱性焦慮——這三個結構性難題，WETOP 用「健康」逐一破解，讓設計師從紅海競爭中突圍。"
            />

            <div className="challenges-stack">
              {challenges.map((challenge, index) => (
                <article className={`challenge-card ${index % 2 === 1 ? "challenge-card-reversed" : ""}`} key={challenge.number}>
                  <div className="challenge-image-wrap">
                    <img src={challenge.image} alt={challenge.imageAlt} className="challenge-image" />
                    <span className="challenge-index">{challenge.number}</span>
                  </div>
                  <div className="challenge-content">
                    <p className="challenge-eyebrow">{challenge.number}</p>
                    <h3>{challenge.title}</h3>
                    <p className="challenge-lead">{challenge.lead}</p>
                    <div className="challenge-copy">
                      <div>
                        <h4>問題背景</h4>
                        <p>{challenge.background}</p>
                      </div>
                      <div>
                        <h4>WETOP 如何破解</h4>
                        <p>{challenge.solution}</p>
                      </div>
                    </div>
                    <ul className="challenge-highlights">
                      {challenge.highlights.map((highlight) => (
                        <li key={highlight}><CheckCircle2 size={16} /> <span>{highlight}</span></li>
                      ))}
                    </ul>
                    <div className="script-callout">
                      <div className="script-callout-head">
                        <span>{challenge.scriptTitle}</span>
                        <button
                          type="button"
                          className="copy-button"
                          aria-label={`複製${challenge.scriptTitle}`}
                          onClick={() => copyToClipboard(challenge.script, challenge.scriptTitle)}
                        >
                          <Copy size={15} /> 一鍵複製
                        </button>
                      </div>
                      <blockquote>{challenge.script}</blockquote>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pain-points" className="content-section pain-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="痛點診斷"
              title="五大生活痛點與設計對策"
              description="客戶已經被這些問題困擾很久，但不知道有解決方案，更不知道可以透過「設計」來預防。以下五個痛點，是設計師展現專業價值的最佳切入點。"
            />
            <div className="pain-grid">
              {painPoints.map((pain) => {
                const Icon = pain.icon;
                return (
                  <article className="pain-card" key={pain.name}>
                    <div className="pain-image-wrap">
                      <img src={pain.image} alt={pain.imageAlt} className="pain-image" />
                      <span className="pain-icon"><Icon size={17} /></span>
                    </div>
                    <div className="pain-card-body">
                      <h3>{pain.name}</h3>
                      <p className="pain-tagline">{pain.tagline}</p>
                      <div className="pain-detail">
                        <h4>客戶的困擾</h4>
                        <p>{pain.concern}</p>
                      </div>
                      <div className="pain-detail">
                        <h4>設計師的解決方案</h4>
                        <p>{pain.designSolution}</p>
                      </div>
                      <div className="pain-detail pain-value">
                        <h4>WETOP 的價值</h4>
                        <p>{pain.value}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="scripts" className="content-section scripts-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="提案工具箱"
              title="設計師提案話術工具箱"
              description="每段話術都對應一個具體的生活痛點場景，幫助您在與客戶溝通時，自然展現「健康生活顧問」的專業形象。點選複製圖示即可一鍵複製使用。"
              light
            />
            <div className="scripts-grid">
              {painPoints.map((pain) => {
                const Icon = pain.icon;
                return (
                  <article className="proposal-card" key={pain.name}>
                    <div className="proposal-image-wrap">
                      <img src={pain.image} alt={pain.imageAlt} className="proposal-image" />
                      <span className="proposal-icon"><Icon size={16} /></span>
                    </div>
                    <div className="proposal-content">
                      <div className="proposal-heading">
                        <h3>{pain.name}</h3>
                        <button
                          type="button"
                          className="icon-copy-button"
                          aria-label={`複製${pain.name}話術`}
                          onClick={() => copyToClipboard(pain.script, pain.name)}
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                      <Quote className="quote-mark" size={22} />
                      <blockquote>{pain.script}</blockquote>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="technology" className="content-section technology-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="核心技術"
              title="WETOP 環境淨化系統"
              description="WETOP 不是被動過濾灰塵的傳統空氣清淨機，而是一套「主動在室內重建大自然自潔機制的環境淨化系統」。"
            />
            <div className="technology-hero">
              <img src={assets.technology} alt="WETOP PICT 仿生態光離子催化技術" />
              <div className="technology-hero-overlay">
                <span>主動在室內重建大自然自潔機制</span>
                <strong>淨化因子持續分解空氣與表面的有害物質，24 小時不間斷</strong>
              </div>
            </div>
            <div className="technology-grid">
              {technologyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="technology-card" key={item.title}>
                    <span className="technology-icon"><Icon size={24} /></span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                );
              })}
            </div>
            <div className="not-product-row">
              <span>WETOP 絕不是以下產品——</span>
              <div>
                <em>非傳統 HEPA 濾網空氣清淨機</em>
                <em>非單純臭氧機／負離子機</em>
                <em>非香氛蓋味產品</em>
              </div>
            </div>
          </div>
        </section>

        <section id="service" className="content-section service-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="服務流程"
              title="設計師三階段健康服務流程"
              description="將 WETOP 納入標準服務流程，讓客戶感受到你不只設計空間，更設計了一種健康的生活方式。"
            />
            <div className="service-visual">
              <img src={assets.serviceFlow} alt="設計師三階段服務流程" />
            </div>
            <div className="service-steps">
              {serviceSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article className="service-step" key={step.number}>
                    {index < serviceSteps.length - 1 && <span className="service-connector" aria-hidden="true" />}
                    <span className="service-number">{step.number}</span>
                    <span className="service-icon"><Icon size={23} /></span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="comparison" className="content-section comparison-section">
          <div className="page-container">
            <SectionHeading
              eyebrow="價值對比"
              title="一般設計師 vs. 健康設計師"
              description="當設計師將視角從「風格競爭」轉向「解決生活痛點」，就能看見一條全新的價值路徑。"
              light
            />
            <div className="comparison-visual">
              <img src={assets.comparison} alt="一般設計師與健康設計師的價值對比" />
            </div>
            <div className="comparison-table" role="table" aria-label="一般設計師與健康設計師的比較">
              <div className="comparison-table-row comparison-table-head" role="row">
                <div role="columnheader">比較面向</div>
                <div role="columnheader">一般設計師</div>
                <div role="columnheader">健康設計師</div>
              </div>
              {comparisonRows.map(([label, traditional, health]) => (
                <div className="comparison-table-row" role="row" key={label}>
                  <div className="comparison-label" role="cell">{label}</div>
                  <div className="comparison-old" role="cell">{traditional}</div>
                  <div className="comparison-new" role="cell">{health}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="page-container contact-grid">
            <div className="contact-intro">
              <span className="section-kicker">獲客入口</span>
              <h2>預約健康設計諮詢</h2>
              <span className="section-divider" aria-hidden="true" />
              <p>填寫以下資訊，讓我們了解您的需求。我們將為您媒合最適合的健康設計師，打造一個真正守護全家人的生活空間。</p>
              <div className="contact-promise">
                <Leaf size={20} />
                <span>從設計源頭，開始規劃更健康的日常。</span>
              </div>
            </div>
            <form
              className="consultation-form"
              name="consultation"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="company"
              ref={formRef}
              onSubmit={handleFormSubmit}
            >
              <input type="hidden" name="form-name" value="consultation" />
              <input type="hidden" name="company" />
              <div className="form-two-columns">
                <label>姓名 <b>*</b><input id="name" name="name" type="text" placeholder="您的稱呼" required /></label>
                <label>聯絡電話 <b>*</b><input id="phone" name="phone" type="tel" placeholder="09XX-XXX-XXX" required /></label>
                <label>電子郵件 <span>（選填）</span><input id="email" name="email" type="email" placeholder="your@email.com" /></label>
                <label>房屋類型
                  <select id="propertyType" name="propertyType" defaultValue="">
                    <option value="" disabled>請選擇</option>
                    {propertyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>
                <label>預算範圍
                  <select id="budget" name="budget" defaultValue="">
                    <option value="" disabled>請選擇</option>
                    {budgetRanges.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                  </select>
                </label>
              </div>
              <fieldset>
                <legend>您最困擾的生活痛點 <span>（可複選）</span></legend>
                <div className="pain-choice-row">
                  {painPoints.map((pain) => (
                    <button
                      type="button"
                      className={`pain-choice ${selectedPains.has(pain.name) ? "pain-choice-active" : ""}`}
                      key={pain.name}
                      onClick={() => togglePain(pain.name)}
                    >
                      {pain.name}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="message-field">其他需求說明 <span>（選填）</span><textarea id="message" name="message" rows={4} placeholder="例如：坪數、預計入住時間、特別關注的健康需求等" /></label>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? "送出中..." : <>送出預約諮詢 <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-grid">
          <div className="footer-brand-block">
            <a className="site-brand footer-brand" href="#top">
              <BrandMark />
              <span><strong>WETOP</strong> 設計師健康方案</span>
            </a>
          </div>
          <div className="footer-contact" aria-label="聯絡資訊">
            <span><Phone size={16} /> 諮詢專線</span>
            <span><Mail size={16} /> 聯繫信箱</span>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="page-container">
            <p className="footer-certification">WETOP 環境淨化器 · 100% MIT 台灣研發與製造 · SNQ 國家品質標章防疫產品認證</p>
            <p className="footer-quote">「當設計師不再只是討論『風格』與『材質』，而是能指出客戶從來沒想過可以解決的生活痛點——客戶會自己感受到。」</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
