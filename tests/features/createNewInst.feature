#language: ru

  Функция: Создание нового заведения
    Сценарий: Успешное создание нового заведения
      Допустим я нахожусь на странице входа
      Если я ввожу "admin" в поле "username"
      И я ввожу "testpass" в поле "password"
      И я нажимаю на кнопку "log-reg-btn"
      То я перехожу на страницу создания "заведения" "/add-new-institution"
      И я ввожу "Testasd" в поле "title-inp"
      И я ввожу "Test Dessc" в поле "desc-inp"
      И я нажимаю на кнопку "checkbox"
      И я нажимаю на кнопку "send-btn"
      То я перехожу на главную страницу и вижу текст "Testasd"
