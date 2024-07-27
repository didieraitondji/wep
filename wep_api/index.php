<?php
include_once("./api/model.php");
header("Content-Type: application/json");

function handleFileUpload()
{
    if (isset($_FILES['fichier'])) {
        if ($_FILES['fichier']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['fichier']['tmp_name'];
            $fileName = $_FILES['fichier']['name'];
            $fileSize = $_FILES['fichier']['size'];
            $fileType = $_FILES['fichier']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg', 'pdf', 'docx');

            $maxFileSize = 5 * 1024 * 1024; // 5MB en octets
            if ($fileSize > $maxFileSize) {
                return [
                    'status' => 'error',
                    'message' => 'File size exceeds the maximum allowed size of 5MB.'
                ];
            }

            if (in_array($fileExtension, $allowedfileExtensions)) {
                $uploadFileDir = './../public/uploaded_files/';
                if (!file_exists($uploadFileDir)) {
                    mkdir($uploadFileDir, 0777, true);
                }

                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $dest_path = $uploadFileDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    return [
                        'status' => 'success',
                        'filePath' => $dest_path,
                        'fileName' => $newFileName
                    ];
                } else {
                    return [
                        'status' => 'error',
                        'message' => 'Failed to move uploaded file.'
                    ];
                }
            } else {
                return [
                    'status' => 'error',
                    'message' => 'Invalid file extension. Allowed extensions: ' . implode(',', $allowedfileExtensions)
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'Upload error occurred. Error code: ' . $_FILES['fichier']['error']
            ];
        }
    } else {
        return [
            'status' => 'error',
            'message' => 'No file uploaded or upload error occurred.'
        ];
    }
}


$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$request = explode('/', trim($request_uri, '/'));

if ($method == 'POST') {
    $fileUploadResult = handleFileUpload();
    if ($fileUploadResult['status'] === 'success') {
        $_POST['filePath'] = "/uploaded_files/" . $fileUploadResult['fileName'];
    } else {
        $_POST['filePath'] = null;
    }
}

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

function handlePut($url)
{

    echo json_encode(["message" => "Requête PUT"]);
}

function handleDelete($url)
{
    include_once("./api/delete/delete.php");
}
