<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html  ng-app="mppeuct_sistemas" lang="en" >
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <title id="title"  >Validar Inscripción</title>
        <!-- Bootstrap Core CSS -->
        <link rel="stylesheet" href="<?php echo base_url('publico/plugins/bootstrap/dist/css/bootstrap.css'); ?>" rel="stylesheet">

        <link rel="stylesheet" href="<?php echo base_url('publico/plugins/jAlert-master/src/jAlert-v3.css'); ?>" />
        <link href="<?php echo base_url('publico/plugins/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">


        <!-- MetisMenu CSS -->
        <link href="<?php echo base_url('publico/plugins/metisMenu/dist/metisMenu.min.css'); ?>" rel="stylesheet">

        <!-- Timeline CSS -->
        <link href="<?php echo base_url('publico/styles/timeline.css'); ?>" rel="stylesheet" type="text/css">

        <link rel="stylesheet" type="text/css" href="<?php echo base_url('publico/styles/jquery.dataTables.min.css'); ?>">

        <!-- Custom CSS -->
        <link href="<?php echo base_url('publico/styles/sb-admin-2.css'); ?>" rel="stylesheet">


        <link href="<?php echo base_url('publico/plugins/morrisjs/morris.css'); ?>" rel="stylesheet">

        <link href="<?php echo base_url('publico/styles/hover-min.css'); ?>" rel="stylesheet" media="all">
        <link href="<?php echo base_url('publico/plugins/ngprogress-lite-master/ngprogress-lite.css'); ?>" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo base_url('publico/styles/fileinput.css'); ?>" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo base_url('publico/styles/bootstrap-datetimepicker.css'); ?>" rel="stylesheet">

        <link rel="stylesheet" href="<?php echo base_url('publico/styles/animate.css'); ?>" rel="stylesheet">

        <link href="<?php echo base_url('publico/styles/styles-app/style.css'); ?>" rel="stylesheet">



        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

    </head>



    <body  ng-controller="app">

        <br><br>
        <div id="wrapper"  >

            <div class="col-lg-8 col-lg-offset-2" style="background-color: white;
                 box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;margin-bottom: 15px;">

                <div class="col-lg-12" style="background-color: white">
                    <img    class="img-responsive normativa-left" alt=""
                            src="http://apis.mppeuct.gob.ve/img/comun/normativa-izquierda-transparente.png">
                    <img   class="img-responsive normativa-right" alt=""
                           src="http://apis.mppeuct.gob.ve/img/comun/normativa-derecha.png">
                </div>
                <br><br>
                <div >
                    <img    style="background-color: white;
                            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;margin-bottom: 15px;margin-top: 15px" class="img-responsive banner"alt=""
                            src="<?php
                            echo base_url('publico/img/intensivos2015.png');
                            ?>">

                </div> 


                <div ng-controller="validar_inscripcion" id="page-wrapper" style=" position: inherit;padding: 0 30px;margin: 0;border-left:0; " >


                    <!-- /.row -->
                    <div ng-include="vista" </div>

                </div>

                <!-- /.col-lg-12 -->



            </div>

            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

        <div class="col-lg-12" style="padding-left: 0px;padding-right: 0px;">
            <section  class="footer" style="border-top: 1px solid #e7e7e7">

                <h4 class="footer-title-ministerio">
                    <br>Ministerio del Poder Popular
                    para Educación Universitaria, Ciencia y Tecnología&nbsp; <em style="font-size: 10px;">Copyleft © 2016 MPPEUCT - RIF: G-20011296-4</em></h4>
                <br>
            </section>

        </div>

    </div>
    <!-- /#wrapper -->





    <script src="<?php echo base_url('publico/plugins/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>


    <script src="<?php echo base_url('publico/plugins/jAlert-master/src/jAlert-v3.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/angular.min.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/angular-sanitize.min.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/ngprogress-lite-master/ngprogress-lite.min.js'); ?>"></script>


    <script src="<?php echo base_url('publico/plugins/angular-route.min.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/angular-locale_es-es.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/angular-animate.js'); ?>"></script>
    <script src="<?php echo base_url('publico/plugins/jquery.dropdown.js'); ?>"></script>


    <script type="text/javascript" charset="utf8" src="<?php echo base_url('publico/js/jquery.dataTables.js'); ?>"></script>

    <script data-require="angular-datatable.js@1.1.5" data-semver="1.1.5" src="<?php echo base_url('publico/js/angular-datatables.min.js'); ?>"></script>

    <script src="<?php echo base_url('publico/js/moment-with-locales.js'); ?>"type="text/javascript"></script>
    <script src="<?php echo base_url('publico/js/bootstrap-datetimepicker.js'); ?>"type="text/javascript"></script>

    <script src="<?php echo base_url('publico/js/fileinput.js'); ?>"type="text/javascript"></script>
    <script src="<?php echo base_url('publico/js/fileinput_locale_es.js'); ?>"type="text/javascript"></script>

    <script src="<?php echo base_url('publico/plugins/metisMenu/dist/metisMenu.min.js'); ?>"></script>
    <script src="<?php echo base_url('publico/js/sb-admin-2.js'); ?>"></script>

    <script>
        var base_url = "<?php echo base_url(); ?>";</script>

    <script src="<?php echo base_url('publico/js/validar.js'); ?>"></script>

</body>

</html>


<div  class=" modal" id="mymodal" role="dialog">
    <div class="modal-dialog modal-lg animated zoomIn">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"  > <em style="color:#3c8dbc"> {{modal.header}} </em> /  <span style="color: #999"> N° Cédula :</span> <b>{{modal.caso}}</b></h4>               
            </div>
            <div class=" modal-body">
                <div ng-include src="modal.template"></div>

            </div>
            <div class="modal-footer">
                <div ng-bind="modal.footer"></div>
                <br>
                <button  type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>

    </div>
</div>
