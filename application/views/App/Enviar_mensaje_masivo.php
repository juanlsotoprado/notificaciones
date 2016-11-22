<br>
<!-- /.row -->
<div class="row animated fadeIn col-lg-12 ">
    <form id="solicitante_form" method="post" name="Form_sms"
          class="form-horizontal inicio">
        <h3><em style="color: #666"> Enviar sms masivo <hr></em></h3>
        <div class="panel panel-info">

            <div class="panel-heading">

                <h4>Cargar números Telefonicos</h4>
            </div>
            <div class="panel-body">
                <a target="_blank" href="<?php echo base_url('publico/docs/dataSms.xls'); ?>" style="text-decoration: underline;color: #056FAD">Descargar ejemplo del documento a subir</a>   
                <hr>

                <div class="form-group">
                    <label class="control-label control-label col-lg-5 col-md-5 col-xs-12">Subir hoja de calculo <b style="color: #981717">.xls:</b></label>
                    <div class="control-label col-lg-7 col-md-7 col-xs-12">
                        <h5><em style="color: #888"> formato sms Ej. (4260000000) </em></h5>

                        <input id="calc2" data-show-preview="false"
                               name="calc2" type="file" class="file" ng-model="sms" 
                               multiple>
                        <span class="label-red" ng-if=" !sms || sms == 'false' || sms.length < 1">Debe subir un archivo .xls</span>
                        <hr>
                    </div>
                </div>

                <br>
                <fieldset style="text-align: left;"  ng-if="sms && sms != 'false' && sms.length > 0">

                    <div class="table-responsive">          
                        <table datatable="ng" dt-options="dtOptions"table class="display  cell-border hover order-column stripe tabla_consulta"  cellspacing="0" width="100%">
                            <col style="width: 2%">
                            <col style="width: 83%">
                            <col style="width: 15%">
                            <thead>
                                <tr>
                                    <th >#</th>
                                    <th>Teléfono</th>
                                    <th >Acción</th>

                                </tr>
                            </thead>

                            <tbody class="table_bandeja_apro_tbody">
                                <tr ng-repeat="(y,x) in sms" >
                                    <td style="color:#337ab7; font-weight: bold">{{$index + 1}}</td>
                                    <td>{{x}}</td>
                                    <td style="text-align: left;">
                                        <button  ng-click=" sms.splice($index, 1)"  class="btn btn-xs btn-danger "><i class="fa fa-close  fa-1x" aria-hidden="true"></i>eliminar<div class="ripple-container"></div></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </fieldset>
            </div>
        </div>

        <div class="panel panel-primary">

            <div class="panel-heading">

                <h4>Cargar datos del mensaje</h4>
            </div>
            <div class="panel-body">

                <div class="form-group">
                    <label class="control-label control-label col-lg-3 col-md-3 col-xs-12">Fecha de envio:</label>
                    <div class="control-label col-lg-4 col-md-4 col-xs-12">

                        <div class="input-group"  id="fecha_inicio_sms">
                            <input readonly="" data-date-format="YYYY/MM/DD" ng-model="formData.fecha_inicio" type="text" class="form-control"
                                   name="fecha_inicio"
                                   placeholder="Escribir la fecha de inicio del envios de sms"  required>
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-calendar"></span>
                            </span>
                        </div>

                        <span class="label-red" ng-if="Form_sms.$dirty && Form_sms.fecha_inicio.$error.required">Campo Requerido</span>

                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label control-label col-lg-3 col-md-3 col-xs-12">Mensaje:</label>
                    <div class="control-label col-lg-9 col-md-9 col-xs-12">
                        <textarea  ng-model="formData.sms_mensaje" name="nombre_cedente" id="nombre_cedente" ng-maxlength="150" maxlength="150" rows="4" class="form-control" name="nombre_cedente" placeholder="Escribir el mensaje..."   required></textarea>
                        <h5><em style="color: #888" >Número de caracteres restantes:<b style="color: #4cae4c;">{{formData.sms_mensaje ?150 - formData.sms_mensaje.length: '150' }}</b> </em></h5>

                        <span class="label-red" ng-if="Form_sms.$dirty && Form_sms.nombre_cedente.$error.maxlength">Caracteres máximos (100)</span>
                        <span class="label-red" ng-if="Form_sms.$dirty && Form_sms.nombre_cedente.$error.required">Campo Requerido</span>

                    </div>
                </div>


            </div>

            <div class="panel-footer">

                <div class="form-group">
                    <div id="botoms" class=" col-xs-12  " style="text-align: center;">

                        <button   ng-click="formData = {}"  type="button" class="submit btn 

                                  btn-success

                                  ">
                            Limpiar   

                        </button>


                        <button  ng-click="Form_sms.$valid != false
                                    && sms && sms != 'false' && sms.length > 0
                                    ? registrar_sms() : ''" 

                                 ng-class="Form_sms.$valid != false
                                                 && sms && sms != 'false' && sms.length > 0

                                                 ? '' : 'disabled'" type="button" class="submit btn  btn-primary  "> Enviar </button>

                    </div>

                    <!--                                    <button  ng-click="Form_sms.$valid != false
                                                                    ? registrar(formData) : ''" 
                    
                                                                 ng-class="Form_sms.$valid != false 
                                                      ? '' : 'disabled'" type="button" class="submit btn  btn-primary  "> Registrar </button>
                    -->

                </div>
            </div>
        </div>
    </form>
</div>


<!-- /.col-lg-12 -->

