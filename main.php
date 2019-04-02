<?php 
	$name = $_POST['fname'];
	$phone = $_POST['secname'];
	$street = $_POST['street'];
	$building = $_POST['build'];
	$block = $_POST['nblock'];
	$flat = $_POST['flat'];
	$floor = $_POST['floor'];
	$comment = $_POST['comment'];
	$paymethod = $_POST['paymethod'];
	$callback = $_POST['dontcall'];
	$callback = isset($callback) ? 'НЕТ' : 'ДА';

	$mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $name . '</li>
                <li>Телефон: ' . $phone . '</li>
                <li>Улица: ' . $street . '</li>
                <li>Номер дома: ' . $building . '</li>
                <li>Корпус: ' . $block . '</li>
                <li>Квартира: ' . $flat . '</li>
                <li>Этаж: ' . $floor . '</li>
                <li>Комментарий к заказу: ' . $comment . '</li>
                <li>Способ оплаты: ' . $paymethod . '</li>
                <li>Нужно ли перезванивать клиенту: ' . $callback . '</li>
            </ul>
        </body>
    </html>    
    ';

	$headers = "From: Администратор сайта <techniker357@gmail.com>\r\n".
	    "MIME-Version: 1.0" . "\r\n" .
	    "Content-type: text/html; charset=UTF-8" . "\r\n";

	    $mail = mail('techniker357@gmail.com', 'Заказ', $mail_message, $headers);
	    $data;

	    if ($mail) {
	        $data['status'] = "ОК";
	        $data['mes'] = "Письмо отправлено";
	    } else {
	        $data['status'] = "NO";
	        $data['mes'] = "Ошибка";
	    }
	    echo json_encode($data);
 ?>