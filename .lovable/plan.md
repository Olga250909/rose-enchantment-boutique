
Заменить изображение товара «Нежность Прованса» на загруженное пользователем фото букета.

### Изменения

1. Скопировать `user-uploads://ChatGPT_Image_Apr_16_2026_10_43_55_PM.png` в `src/assets/product-provence-tenderness.jpg`
2. В `src/data/products.ts`:
   - Заменить импорт `productBlushBouquet` на новый `productProvenceTenderness` для товара id "1"
   - Старый импорт оставить для других товаров, которые его используют (id "8")
