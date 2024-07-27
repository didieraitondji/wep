<?php
include_once("./api/model.php");
header("Content-Type: application/json");

/*function handleFileUpload()
{
    if (isset($_FILES['fichier'])) {
        if ($_FILES['fichier']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['fichier']['tmp_name'];
            $fileName = $_FILES['fichier']['name'];
            $fileSize = $_FILES['fichier']['size'];
            $fileType = $_FILES['fichier']['type'];
            $fileNameCmps = explode(".", $fileName);
            $fileExtension = strtolower(end($fileNameCmps));

            $allowedfileExtensions = array('jpg', 'gif', 'png', 'jpeg', 'pdf', 'docx', 'zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso');

            $maxFileSize = 10 * 1024 * 1024; // 10MB en octets
            if ($fileSize > $maxFileSize) {
                return [
                    'status' => 'error',
                    'message' => 'File size exceeds the maximum allowed size of 10MB.'
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
}*/

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

            $allowedfileExtensions = array(
                'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp',
                'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'rtf', 'txt', 'csv', 'md',
                'zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso',
                'mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a',
                'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', '3gp',
                'html', 'htm', 'css', 'js', 'json', 'xml', 'yml', 'yaml', 'php', 'py', 'rb', 'java', 'cpp', 'c', 'h', 'cs', 'ts', 'tsx', 'jsx', 'sh', 'bat', 'cmd', 'go', 'rs', 'pl', 'swift', 'kt', 'lua', 'dart',
                'ttf', 'otf', 'woff', 'woff2', 'eot',
                'stl', 'obj', 'fbx', '3ds', 'dae', 'dwg', 'dxf',
                'ics', 'vcf'
            );

            $maxFileSize = 10 * 1024 * 1024; // 10MB en octets
            if ($fileSize > $maxFileSize) {
                return [
                    'status' => 'error',
                    'message' => 'File size exceeds the maximum allowed size of 10MB.'
                ];
            }

            if (in_array($fileExtension, $allowedfileExtensions)) {
                $uploadFileDir = './../public/uploaded_files/';
                if (!file_exists($uploadFileDir)) {
                    mkdir($uploadFileDir, 0777, true);
                }

                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $dest_path = $uploadFileDir . $newFileName;

                // Vérifiez les permissions du répertoire
                if (!is_writable($uploadFileDir)) {
                    return [
                        'status' => 'error',
                        'message' => 'Upload directory is not writable.'
                    ];
                }

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    // Ajoutez une vérification pour les fichiers .zip
                    if ($fileExtension === 'zip') {
                        $zip = new ZipArchive();
                        $res = $zip->open($dest_path);
                        if ($res === TRUE) {
                            $zip->close();
                        } else {
                            return [
                                'status' => 'error',
                                'message' => 'Uploaded .zip file is invalid.'
                            ];
                        }
                    }

                    return [
                        'status' => 'success',
                        'filePath' => $dest_path,
                        'fileName' => $newFileName
                    ];
                } else {
                    // Ajoutez un message de débogage
                    return [
                        'status' => 'error',
                        'message' => 'Failed to move uploaded file. Debug info: tmp_path=' . $fileTmpPath . ', dest_path=' . $dest_path
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

$retourfile = null;

if ($method == 'POST') {
    $fileUploadResult = handleFileUpload();
    if ($fileUploadResult['status'] === 'success') {
        $_POST['filePath'] = "/uploaded_files/" . $fileUploadResult['fileName'];
    } else {

        $_POST['filePath'] = null;

        //echo json_encode(["message" => $fileUploadResult]);
        //exit;
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
