
<!-- Navigation -->
<nav class="navbar navbar-default navbar-static-top barra-top " style="border-bottom: #bce8f1 1px solid;-webkit-box-shadow: -1px 29px 22px -23px rgba(0,0,0,0.43);
-moz-box-shadow: -1px 29px 22px -23px rgba(0,0,0,0.43);
box-shadow: -1px 29px 22px -23px rgba(0,0,0,0.43);">

    <div class="navbar-header" >
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Sistema de notificaciones</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <em class="navbar-brand" > <b style="color: #a3303d;font-size: 20px" class=" fa fa-institution"></b><span style="font-size: 16px">&nbsp;Sistema de notificaciones &nbsp;</span>


        </em><br>
    </div>
    <!-- /.navbar-header -->

    <ul  class="nav navbar-top-links navbar-right animated zoomIn">

        <!-- /.dropdown -->
        <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown"  >
                <i class="fa fa-user fa-fw top-barra"></i><i class="fa fa-caret-down"></i> &nbsp; <?php echo $user_sesion['nombre']; ?><em>&nbsp;<b>( <?php echo $user_sesion['nombre_perfil']; ?> )</em> </b>

            </a>


            <ul  style="width: 100%" class="dropdown-menu dropdown-user">
                <li><a href="<?php echo base_url('index.php/Login/Cerrar'); ?>" style="text-decoration:underline;"><b><i class="fa fa-sign-out fa-fw" ></i>Cerrar sesión</b></a>
                </li>
            </ul>



            <!-- /.dropdown-user -->
        </li>

        <!-- /.dropdown -->
    </ul>

    <!-- /.navbar-top-links -->
    <br>

    <div  style="background-color: white" class="navbar-default sidebar " role="navigation">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav " id="side-menu">

<!--                    <li>
                        <a href="#/Inicio" class='{{ liActive == "/Inicio"? "active":"" }}'><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp;Inicio</a>
                    </li>-->

                <?php if ($user_sesion['id_perfil'] == 1) { ?>
                    <li >
                        <a href="#/Administracion" class='{{ liActive == "/Administracion"? "active":"" }}'><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp;Administrar Funcionarios</a>
                    </li>

                <?php } if ($user_sesion['id_perfil'] == 1 || $user_sesion['id_perfil'] == 2 || $user_sesion['id_perfil'] == 4) { ?>
                    <li >
                        <a href="#/Enviar_correo_masivo" class='{{ liActive == "/Enviar_correo_masivo"? "active":"" }}'><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp;Enviar correo masivo</a>
                    </li>
                <?php } if ($user_sesion['id_perfil'] == 1 || $user_sesion['id_perfil'] == 3 || $user_sesion['id_perfil'] == 4) { ?>

                    <li >
                        <a href="#/Enviar_mensaje_masivo" class='{{ liActive == "/Enviar_mensaje_masivo"? "active":"" }}'><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp;Enviar sms masivo</a>

                    </li>
                <?php } if ($user_sesion['id_perfil'] == 1 || $user_sesion['id_perfil'] == 2 || $user_sesion['id_perfil'] == 3 || $user_sesion['id_perfil'] == 4 ) { ?>

                    <li >
                        <a href="#/En_curso" class='{{ liActive == "/En_curso"? "active":"" }}'><i class="fa fa-caret-right" aria-hidden="true"></i> &nbsp;Notificaciones</a>
                    </li>

                <?php } ?>

                </li>
            </ul>
        </div>
        <!-- /.sidebar-collapse -->
    </div>
    <!-- /.navbar-static-side -->
</nav>

<div  id="page-wrapper" >

