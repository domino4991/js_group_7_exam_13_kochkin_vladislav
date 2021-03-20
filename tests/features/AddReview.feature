#language: ru
  Функция: Добавление отзыва
    Сценарий: Успешное добавление отзыва
      Допустим я нахожусь на странице входа
      Если я ввожу "admin" в поле "username"
      И я ввожу "testpass" в поле "password"
      И я нажимаю на кнопку "log-reg-btn"
      То я перехожу на главную страницу и вижу текст "Test"
      И я нажимаю на ссылку "link-0"
      И я ввожу "Test" в поле "comment-input"
      И я нажимаю на "foodRating-5"
      И я нажимаю на "serviceRating-5"
      И я нажимаю на "interiorRating-5"
      То я вижу элемент "Toastify__toast-body"