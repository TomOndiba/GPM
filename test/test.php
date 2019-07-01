<?php


/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/Paris');
if (PHP_SAPI == 'cli')
die('This example should only be run from a Web Browser');

/** Include \PhpOffice\PhpSpreadsheet\Spreadsheet */
require '../vendor/autoload.php';


use PhpOffice\PhpSpreadsheet\IOFactory;

// Create new \PhpOffice\PhpSpreadsheet\Spreadsheet object
$objPHPExcel = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
$objReader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
$objReader->setReadDataOnly(true);




$inputFileName = 'C:/Users/pgo/Metcut Research, Inc/MRSAS - Metcut France - Ressources Humaines/Planning Techniciens 2019-2020.xlsx';

/**  Advise the Reader of which WorkSheets we want to load  **/
//$objReader->setLoadSheetsOnly('DataGPM');
/**  Load $inputFileName to a Spreadsheet Object  **/
$spreadsheet = $objReader->load($inputFileName);




$worksheet = $spreadsheet->getSheetByName('DataGPM');
$highestRow = $worksheet->getHighestRow(); // e.g. 10
$highestColumn = $worksheet->getHighestColumn(); // e.g 'F'
$highestColumnIndex = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::columnIndexFromString($highestColumn); // e.g. 5


for ($col = 1; $col <= $highestColumnIndex; ++$col) {
  $tbldate[$col]=date("Y-m-d", mktime(0,0,0,1, $worksheet->getCellByColumnAndRow($col, 4)->getCalculatedValue()-1, 1900));
}

$firstdayweek=date("Y-m-d", strtotime('monday this week'));
$colMonday = array_search($firstdayweek, $tbldate);


    for ($col = $colMonday; $col <= $colMonday+14; ++$col) {
        $tblplanning[4][$col]=date("Y-m-d", mktime(0,0,0,1, $worksheet->getCellByColumnAndRow($col, 4)->getCalculatedValue()-1, 1900));
    }

for ($row = 5; $row <= 11; ++$row) {
    $tblplanning[$row][0]=$worksheet->getCellByColumnAndRow(1, $row)->getCalculatedValue();
    for ($col = $colMonday; $col <= $colMonday+14; ++$col) {
        $tblplanning[$row][$col]=$worksheet->getCellByColumnAndRow($col, $row)->getCalculatedValue();
    }
}

var_dump($tblplanning);


?>
