<?php
// Google Tag Manager integration

// Get Google Tag Manager data from passed $COMPONENT
$gtm = ( $COMPONENT ? $COMPONENT : array('active'=>false) );
if( true === $gtm['active'] ):
  $id = $gtm['id'];
?>
  <link rel="preconnect" href="https://www.googletagmanager.com/" crossorigin>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','<?php echo $id; ?>');</script>
<?php
endif;