
<br>
<div class="panel panel-default">

    <div class="panel-heading">
        <ul class="pager" style="margin: 0;padding: 0;">

            <li style="display: inline; float: left">            
                <i class="glyphicon glyphicon-edit panel-title"></i>&nbsp;<em>Estatus documentos</em></h4>
            </li>

        </ul>
    </div> 
    <div class="panel-body" style="text-align: center;min-height: 240px;">
        <br>
      <?php if ($user_sesion['perfil_seleccionado'] == 3 || $user_sesion['perfil_seleccionado'] == 4 ) { ?>

        <div ng-click="redirecionar('#/Casos_por_enviar_doc')"   class="col-lg-5 col-md-6  col-lg-offset-1" >
            <div class="estadistico_count panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-send-o fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div style="font-size: 20px;"class="huge">15</div>
                            <div>Casos por enviar documentos!</div>
                        </div>
                    </div>
                </div>
                <a   href="#/Casos_devueltos" >
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div ng-click="redirecionar('#/Casos_devueltos')" class="col-lg-5 col-md-6 " >       
            <div class="estadistico_count panel panel-yellow">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-reply fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div style="font-size: 20px;" class="huge">654</div>
                            <div>Casos Devueltos!</div>
                        </div>
                    </div>
                </div>
                <a  href="#/Casos_devueltos"  >
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
      <?php }?>
        
        
       <?php if ($user_sesion['perfil_seleccionado'] == 5 ) { ?>

        <div ng-click="redirecionar('#/Casos_por_enviar_doc')" class="col-lg-4 col-md-6" >
            <div class="estadistico_count panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-send-o fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div style="font-size: 20px;"class="huge">15</div>
                            <div>Casos por enviar documentos!</div>
                        </div>
                    </div>
                </div>
                <a href="#/Casos_por_enviar_doc">
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div ng-click="redirecionar('#/Casos_devueltos')" class="col-lg-4 col-md-6 " >       
            <div class="estadistico_count panel panel-yellow">
                <div class="panel-heading" >
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-reply fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div style="font-size: 20px;" class="huge">654</div>
                            <div>Casos Devueltos!</div>
                        </div>
                    </div>
                </div>
                <a  href="#/Casos_devueltos">
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div ng-click="redirecionar('#/Nuevos_casos_por_revisar')" class="col-lg-4 col-md-6 " >       
            <div class="estadistico_count panel panel-success">
                <div class="panel-heading" >
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-archive fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div style="font-size: 20px;" class="huge">45</div>
                            <div>Nuevos casos por revisar!</div>
                        </div>
                    </div>
                </div>
                <a href="#/Nuevos_casos_por_revisar" >
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-archive"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
      <?php }?>
        <br>
    </div>
</div>