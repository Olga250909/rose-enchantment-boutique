const DeliveryPage = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground text-center mb-10">Доставка и оплата</h1>
    <div className="prose font-body text-muted-foreground space-y-8">
      <section>
        <h2 className="font-heading text-2xl text-foreground mb-3">Доставка по Москве</h2>
        <p>Бесплатная доставка при заказе от 5 000 ₽. Стоимость доставки при заказе до 5 000 ₽ — 500 ₽.</p>
        <p>Среднее время доставки — 2-3 часа с момента оформления заказа. Доставка осуществляется ежедневно с 8:00 до 22:00.</p>
      </section>
      <section>
        <h2 className="font-heading text-2xl text-foreground mb-3">Доставка по Московской области</h2>
        <p>Стоимость доставки за МКАД — от 500 ₽ в зависимости от расстояния. Точная стоимость рассчитывается при оформлении заказа.</p>
      </section>
      <section>
        <h2 className="font-heading text-2xl text-foreground mb-3">Способы оплаты</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Банковской картой онлайн</li>
          <li>Наличными курьеру</li>
          <li>Переводом на карту</li>
        </ul>
      </section>
      <section>
        <h2 className="font-heading text-2xl text-foreground mb-3">Гарантия свежести</h2>
        <p>Мы гарантируем свежесть каждого букета. Если вы не довольны качеством цветов, мы заменим букет бесплатно в день доставки.</p>
      </section>
    </div>
  </div>
);

export default DeliveryPage;
