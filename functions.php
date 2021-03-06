<?php
/**
 * This file calls the vendor files and init.php file.
 *
 * All the fun stuff is in the init.php file and its imports. This is just here
 * because WordPress requires a functions.php file.
 *
 * You can add code below, but the structure of this project allows for better
 * placement of files outside of the root directory. If you're unfamiliar with
 * where something should go, poke around!
 */

/**
 * Defines the theme version for the purpose of file loading
 * ! Do not delete.
 */
$THEME_VERSION = "2.2.2";

// Composer files
require_once __DIR__ . '/vendor/autoload.php';

// FWD Boilerplate init file
require_once __DIR__ . '/app/init.php';

// Creates a FWD_Setup object
$THEME = new FWD_Setup;


/**
 * THEME SETUP
 */

// Remove unnecessary admin menus (by default, this includes comments and links)
$THEME->remove_admin_menus();

// Adds nav menus
$menus = array(
  // Location         Label                 text-domain
  'primary_nav' => __('Primary Navigation', 'fwd')
);
$THEME->set_theme_menus($menus);

// Show active page template in the admin
$THEME->show_active_template();

// Disable WordPress' emojis
$THEME->disable_emojis();

// Clean up the_excerpt()
$THEME->set_the_excerpt();

// Registers page templates for the theme
$THEME->templates = array(
  '404',
  'homepage'
);

// Sets image sizes for the theme, in pixel widths
$image_sizes = array(
  120,
  240,
  360,
  480,
  640,
  720,
  960,
  1280,
  1920,
  2560,
  3840
);
$THEME->set_image_sizes( $image_sizes );
