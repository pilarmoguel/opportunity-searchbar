
<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/**
 * Plugin Name: Opportunity Searchbar
 * Plugin URI: 
 * Description: This plugin adds a searchbar that directs people to the Opprotunity Portal
 * Version: 1.0.0
 * Author: GST Development Team
 * Author URI:
 * License:© AIESEC 2016 AIESEC is a non-governmental not-for-profit organisation in consultative status with the United Nations Economic
and Social Council (ECOSOC), affiliated with the UN DPI, member of ICMYO, and is recognized by UNESCO.
AIESEC International is registered as a Foundation (Stichting), RSIN #807103895 in Rotterdam, The Netherlands.
 */
?>

<?
plugins_url( '/build/opportunity-searchbar.js', __FILE__ );
load_plugin_textdomain('opportunity-searchbar', false, basename( dirname( __FILE__ ) ) . '/languages' );
?>
