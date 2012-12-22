<?php

// GIT TEST

// Connection's Parameters
$db_host="127.0.0.1";
$db_name="plode";
$username="root";
$password="root";

// Connection
$db_con=mysql_connect($db_host,$username,$password);
if(!$db_con)
{
	die('Could not connect: ' . mysql_error());
}



$db_selected=mysql_select_db($db_name);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}

/*
echo 'Connected successfully';
echo '<br />'; 
*/

?>