<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $type = strip_tags(trim($_POST["type"] ?? 'Not specified'));
    $message = trim($_POST["message"] ?? '');

    // Destinatario
    $to = "claudio@aisosu.fi";
    $subject = "Nuevo mensaje de contacto de $name";

    // Cuerpo del mensaje
    $body = "Nombre: $name\n";
    $body .= "Email: $email\n";
    $body .= "Tipo de proyecto: $type\n\n";
    $body .= "Mensaje:\n$message";

    // Cabeceras
    $headers = "From: Web Contact <claudio@aisosu.fi>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Enviar
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Mensaje enviado correctamente.";
    } else {
        http_response_code(500);
        echo "Error al enviar el mensaje.";
    }
} else {
    http_response_code(403);
    echo "Acceso prohibido.";
}
?>