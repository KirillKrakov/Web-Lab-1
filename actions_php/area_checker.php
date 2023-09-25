<?php

error_reporting(-1);

$response = $x = $y = $r = $executed_at = $execution_time = $result = "";

$start_exec = microtime(1);

function check_x($x): bool
{
    return $x >= -3 and $x <= 5;
}

function check_y($y): bool
{
    return $y >= -3 and $y <= 5;
}

function check_r($r): bool
{
    return $r >= 2 and $r <= 5;
}

function check_hit($x, $y, $r): string
{
    // 1 четверть - прямоугольник
    if ($x >= 0 and $y >= 0 and $r >= $y and ($r / 2) >= $x) return "Попадает";
    // 2 четверть - четверть окружности
    else if ($x <= 0 and $y >= 0 and (($x * $x + $y * $y) <= ($r * $r) / 4))
        return "Попадает";
    // 3 четверть - равнобедренный треугольник
    else if ($x <= 0 and $y <= 0 and abs($x) + abs($y) <= $r) return "Попадает";
    // все остальные области
    else return "Мимо";
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $x = $_GET["x-select"];
    $y = $_GET["y-select"];
    $r = $_GET["r-select"];

    if (check_x($x) and check_y($y) and check_r($r)) {
        $result = check_hit($x, $y, $r);
    } else {
        $result = "Ошибка введенных данных";
    }
    date_default_timezone_set('Europe/Moscow');
    $executed_at = date('D, j M Y G:i:s', time());
    $execution_time = (microtime(1) - $start_exec) * 1000;

    $response .= $x .= ";";
    $response .= $y .= ";";
    $response .= $r .= ";";
    $response .= $result .= ";";
    $response .= $executed_at .= ";";
    $response .= number_format($execution_time, 12) . " ms";

    echo $response;
}
