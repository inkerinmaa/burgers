<?php

    $name = $_POST['user-name'];
    $phone = $_POST['phone-number'];
    $street = $_POST['street'];
    $building = $_POST['building'];
    $block = $_POST['block'];
    $apartment = $_POST['apartment'];
    $floor = $_POST['floor'];
    $comment = $_POST['comment'];
    $pay = $_POST['pay-option'];
    $dontcall = isset($_POST['dontcall']) ? 'НЕТ' : 'ДА'; //1 или null

    $data = [];

    if(empty($name)
      || empty($phone)
      || empty($street)
      || empty($building)
    ) {
        $data['status'] = "NO";
        $data['mes'] = "Вы не заполнили обязательные поля";
        echo json_encode($data);
        exit(1);
    }

    $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя:' . $name . '</li>
                <li>Телефон:' . $phone . '</li>
                <li>Улица:' . $street . '</li>
                <li>Дом:' . $building . '</li>
                <li>Корпус:' . $block . '</li>
                <li>Квартира:' . $apartment . '</li>
                <li>Этаж:' . $floor . '</li>
                <li>Комментарий к заказу:' . $comment . '</li>
                <li>Способ оплаты:' . $pay . '</li>
                <li>Нужно ли перезванивать клиенту:' . $dontcall . '</li>
            </ul>
        </body>
    </html>';



    $headers = "From: Администратор сайта <techniker357@@gmail.com>\r\n".
               "MIME-Version: 1.0" . "\r\n" .
               "Content-type: text/html; charset=UTF-8" . "\r\n";

$mail = mail('inkeri-maa@yandex.ru', 'Заказ', $mail_message, $headers);

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Сообщение отправлено";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка";
    }

echo json_encode($data);

?>