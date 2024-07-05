<?php
include_once("./api/model.php");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

$request_uri = $_SERVER['REQUEST_URI'];
$request = explode('/', trim($request_uri, '/'));

switch ($method) {
    case 'GET':
        handleGet($request);
        break;
    case 'POST':
        handlePost($request);
        break;
    case 'PUT':
        handlePut($request);
        break;
    case 'DELETE':
        handleDelete($request);
        break;
    default:
        echo json_encode(["message" => "Méthode non supportée"]);
        break;
}

function handleGet($url)
{
    include_once("./api/get/get.php");
}

function handlePost($url)
{
    include_once("./api/post/post.php");
}

function handlePut($request)
{

    echo json_encode(["message" => "Requête PUT"]);
}

function handleDelete($request)
{

    echo json_encode(["message" => "Requête DELETE"]);
}
