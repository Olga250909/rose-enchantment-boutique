import { useStore } from "@/context/StoreContext";

const DeliveryPage = () => {
  const { deliverySettings: s } = useStore();

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground text-center mb-10">Доставка и оплата</h1>
      <div className="prose font-body text-muted-foreground space-y-8">
        <section>
          <h2 className="font-heading text-2xl text-foreground mb-3">Доставка по Москве</h2>
          <p>Бесплатная доставка при заказе от {s.freeDeliveryFrom.toLocaleString("ru-RU")} ₽. Стоимость доставки при заказе до {s.freeDeliveryFrom.toLocaleString("ru-RU")} ₽ — {s.deliveryCost} ₽.</p>
          <p>Среднее время доставки — {s.deliveryTime} с момента оформления заказа. Доставка осуществляется ежедневно с {s.deliveryHours}.</p>
        </section>
        <section>
          <h2 className="font-heading text-2xl text-foreground mb-3">Доставка по Московской области</h2>
          <p>Стоимость доставки за МКАД — {s.outsideMkadCost} в зависимости от расстояния. Точная стоимость рассчитывается при оформлении заказа.</p>
        </section>
        <section>
          <h2 className="font-heading text-2xl text-foreground mb-3">Способы оплаты</h2>
          <ul className="list-disc list-inside space-y-1">
            {s.paymentMethods.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="font-heading text-2xl text-foreground mb-3">Гарантия свежести</h2>
          <p>{s.freshnessGuarantee}</p>
        </section>
      </div>
    </div>
  );
};

export default DeliveryPage;
