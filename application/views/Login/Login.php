<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <title>Notificaciones</title>
        <meta name="generator" content="Bootply" />
        <meta name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1">
        <!-- kaky123.*-->


        <link rel="stylesheet" href="<?php echo base_url('publico/plugins/bootstrap/dist/css/bootstrap.css'); ?>" rel="stylesheet">
        <!--[if lt IE 9]>
                                <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
                        <![endif]-->

        <style type="text/css">


            @media (max-width: 768px) {
                .normativa-right { display: none;}
            }


            body{
                background: url(<?php echo base_url('publico/img/fondonuevo.png'); ?>) ;
                background-repeat: repeat;

                background-attachment: fixed;
                overflow: auto;
                overflow-x: hidden;

            }

            .panel{

                margin-top: 100px;
                -webkit-box-shadow: 9px 28px 96px -18px rgba(0,0,0,0.67);
                -moz-box-shadow: 9px 28px 96px -18px rgba(0,0,0,0.67);
                box-shadow: 9px 28px 96px -18px rgba(0,0,0,0.67);


            </style>

        </head>
        <body>

            <div class=""style="margin: 0; height: 50px;background: #ffffff;
                 -webkit-box-shadow: 0px 12px 20px -15px  rgba(0,0,0,0.75);
                 -moz-box-shadow: 0px 12px 20px -15px  rgba(0,0,0,0.75);
                 box-shadow: 0px 12px 20px -15px rgba(0,0,0,0.75);
                 -webkit-border-bottom-right-radius: 10px;
                 -webkit-border-bottom-left-radius: 10px;
                 -moz-border-radius-bottomright: 10px;
                 -moz-border-radius-bottomleft: 10px;
                 border-bottom-right-radius: 10px;
                 border-bottom-left-radius: 10px;">
                <div  style="padding-left: 12px; ">
                    <img   style="height: 50px; float: left;  border-bottom: 1px solid #eee;" class="img-responsive" alt=""
                           src="http://apis.mppeuct.gob.ve/img/comun/normativa-izquierda-transparente.png">
                    <img class="normativa-right" style="height: 50px; width: 150px; float: right; border-bottom: 1px solid #eee;" class="img-responsive" alt=""
                         src="http://apis.mppeuct.gob.ve/img/comun/normativa-derecha.png">
                </div>

                <!--                <div class="row" >
                                    <img   style="height:  115px;  border-bottom: 1px solid #eee;width: 100%" class="img-responsive col-lg-12" alt=""
                                           src="<?php // echo base_url('publico/img/intensivos2015.png');  ?>">
                
                                    </div> 
                                </div>-->

                <div class=" col-lg-4 col-lg-offset-4">
                    <form class="form col-md-12 center-block" action="<?php echo base_url('index.php/Login/Validar'); ?>" method="post" >


                        <div  class="panel panel-primary">

                            <div class="panel-heading">

                                <h4>Iniciar sesión</h4>
                            </div>
                            <div class="panel-body">

                                <div class="form-group">
                                    <label for="usrname"><span class="glyphicon glyphicon-user"></span> Usuario:</label>
                                    <input  type="hidden"  name='ldap' id='ldap' value="false">      
                                    <input autocomplete="off"  type="text" class="form-control input-lg"
                                            placeholder="Usuario" name='usuario' id='usuario'>                        </div>
                                <div class="form-group">
                                    <label for="psw"><span class="glyphicon glyphicon-eye-open"></span> Contraseña:</label>
                                    <input autocomplete="off" type="password" class="form-control input-lg"
                                           placeholder="Contraseña"  name='password' id='password'>   
                                </div>
                                <div class="cargando" style="display: none;color: #777;font-size: 14px;font-weight: bold;width:100%;text-align: right">Cargando...</div>
                                    <div class="error" style="display: none;color: #B22222;font-size: 14px;font-weight: bold;width:100%;text-align: right">Usuario o clave invalida ...</div>


                                </div>
                                <div class="panel-footer" style="text-align: center">

                                    <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-off"></span> Entrar</button>

                                </div>

                            </div> 
                        </form>

                    </div>



                    <script src="<?php echo base_url('publico/plugins/jquery/dist/jquery.min.js'); ?>"></script>
                    <script src="<?php echo base_url('publico/plugins/bootstrap/dist/js/bootstrap.min.js'); ?>"></script>

                    <script>

                        $().ready(function () {

                            $("#usuario").change(function (e) {
                                var username = $('#usuario').val();

                                if (valida_correo(username)) {

                                    $('#ldap').val('true');

                                    console.log(true);

                                } else {

                                    $('#ldap').val('false');

                                    console.log(false);

                                }
                            });


                            $('#usuario').bind("cut copy paste", function (e) {
                                e.preventDefault();
                            });

                        });

                        function valida_correo(username) {
                            regx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                            return regx.test(username);
                        }


                    </script>


                    <?php if (!empty($_SESSION['error'])) { ?>
                        <script>
                            $(document).ready(function () {

                                $('.error').fadeIn(600).delay(300).fadeOut(400).fadeIn(400).fadeOut(400).fadeIn(300).fadeOut(300);


                            });
                        </script>

                        <?php
                        unset($_SESSION['error']);
                    }
                    ?>
                    <script>



                        $(".btn").on("click", function () {

                            cargando();

                        });
                    </script>
            </body>
        </html>