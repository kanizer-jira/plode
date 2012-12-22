<?php 

require_once('../config.php');
require_once('../utils/loggers/LoggerUtil.php');

/*
echo $_SERVER['HTTP_HOST'];
echo '<br />'; 
*/

$sql    = 'SELECT * FROM project_types';
$result = mysql_query($sql);

if (!$result) {
    echo "DB Error, could not query the database";
	echo '<br />'; 
    echo 'MySQL Error: ' . mysql_error();
	echo '<br />'; 
    exit;
}

/*
 * PRINT DB ITEMS
while ($row = mysql_fetch_assoc($result)) {
    echo $row['label'];
	echo '<br />'; 
}
*/

mysql_free_result($result);
/*
*/

LoggerUtil::trace('phplog - testing mobile');


?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<title>Plode mobile localhost</title>
		<link rel="stylesheet/less" type="text/css" href="../css/plode-styles.less>
		<style type="text/css" media="screen, print" rel></style>
	</head>

	<body>
		<div id="wrapper">
			
			<h3>H3 Header</h3>
			
			<p class="font-test">Stub content here buddy. This is the mobile version of the site.  as;dklfjasld;kjfa;lsdj</p>

		</div>

		<script type="text/javascript" src="../js/less-1.3.0.min.js"></script>
	</body>

</html>