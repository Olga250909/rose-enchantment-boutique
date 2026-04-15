import productBlushBouquet from "@/assets/product-blush-bouquet.jpg";

const BrandStorySection = () => (
  <section className="py-24 md:py-32">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        {/* Image */}
        <div className="relative">
          <img
            src={productBlushBouquet}
            alt="Мастер-флорист за работой"
            className="w-full aspect-[4/5] object-cover rounded-sm"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-sm" />
        </div>

        {/* Text */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-body">
            О нас
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-4 mb-8 font-light">
            Искусство, рождённое
            <br />
            <span className="italic text-primary">из любви к розам</span>
          </h2>
          <div className="w-12 h-px bg-gold/40 mb-8" />
          <div className="space-y-5 font-body text-muted-foreground text-sm leading-relaxed">
            <p>
              Магия Роз — это авторская мастерская флористики, где каждый букет создаётся 
              вручную с вниманием к каждому лепестку. Мы работаем только с премиальными 
              сортами роз от лучших плантаций Эквадора и Кении.
            </p>
            <p>
              Наши флористы — выпускники школ французской флористики, владеющие техникой 
              спиральной сборки и создания авторских композиций в европейском стиле.
            </p>
            <p>
              Каждый заказ сопровождается фотоотчётом перед доставкой, чтобы вы были 
              уверены: получатель будет восхищён.
            </p>
          </div>
          <div className="flex gap-12 mt-10">
            <div>
              <p className="font-heading text-3xl text-foreground">5+</p>
              <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">Лет опыта</p>
            </div>
            <div>
              <p className="font-heading text-3xl text-foreground">2000+</p>
              <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">Букетов</p>
            </div>
            <div>
              <p className="font-heading text-3xl text-foreground">98%</p>
              <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">Довольных</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BrandStorySection;
