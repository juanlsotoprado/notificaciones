<br>
<!-- /.row -->
<div class="row animated fadeIn col-lg-12 ">

    <form id="solicitante_form" method="post" name="Form_usuario"
          class="form-horizontal inicio"> 

        <h3><em style="color: #666">Administrar Funcionarios<hr></em></h3>

        <div class="panel panel-success">

            <div class="panel-heading">

                <h4>Registrar/Modificar Funcionarios</h4>

            </div>
            <div class="panel-body">
                <div class="form-group">
                    <label class="control-label control-label col-lg-3 col-md-3 col-xs-12">Buscar funcionario:</label>
                    <div class="control-label col-lg-9 col-md-9 col-xs-12">
                        <div class="input-group">

                            <input ng-change="formData = {};" placeholder="Usuario ej: jsoto" type="text"
                                   class="form-control  " ng-model="usuario" required> <span
                                   class="input-group-btn " name="usuario">
                                <button  ng-click="buscarUsusario(usuario)" 
                                         class="btn btn-info buscar_numerocedula" type="button">
                                    <i class="fa fa-search"></i>&nbsp; Buscar
                                </button>
                            </span>
                        </div>
                        <span class="label-red" ng-if="Form_usuario.$dirty && Form_usuario.usuario.$error.required">Campo Requerido</span>

                    </div>
                </div>

                <div class="form-group animated fadeIn" ng-if="formData.nombreApellido">
                    <label class="control-label control-label col-lg-3 col-md-3 col-xs-12">Nombre y Apellido:</label>

                    <label   id="nombre_usuario" class="control-label col-lg-9 col-md-9 col-xs-12"
                             style="text-align: left; color: #777;">{{formData.nombreApellido}}</label>

                </div>
                <div class="form-group" ng-show ="formData.nombreApellido">
                    <label class="control-label control-label col-lg-3 col-md-3 col-xs-12">Perfil:</label>
                    <div class="control-label col-lg-9 col-md-9 col-xs-12">

                        <select    ng-options="data as data.descripcion for data in datos_registro.perfiles track by data.id" ng-model="formData.perfil" class="form-control" id=""  name="perfil" required>
                            <option value=""><-- Seleccione una opción --></option>

                        </select>   
                        <span class="label-red" ng-if="Form_usuario.$dirty && Form_usuario.perfil.$error.required">Campo Requerido</span>

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


                        <button  ng-click="Form_usuario.$valid != false 

                                    ? registrar() : ''" 

                                 ng-class="Form_usuario.$valid != false

                                                 ? '' : 'disabled'" type="button" class="submit btn  btn-primary  "> {{modificar != true?'Registrar':'Modificar'}} </button>

                    </div>

                </div>
            </div>
        </div>
    </form>      

    <div class="panel panel-primary">

        <div class="panel-heading">

            <h4>Funcionarios registrados</h4>
        </div>
        <div class="panel-body">

            <fieldset style="text-align: left;"  >

                <div class="table-responsive">          
                    <table datatable="ng" dt-options="dtOptions"table class="display  cell-border hover order-column stripe tabla_consulta"  cellspacing="0" width="100%">
                        <col style="width: 2%">

                        <thead>
                            <tr>
                                <th >#</th>
                                <th>Cédula</th>
                                <th >Nobre y apellido</th>
                                <th >Perfil</th>
                                <th >Estatus</th>
                                <th >Acción</th>

                            </tr>
                        </thead>

                        <tbody class="table_bandeja_apro_tbody">
                            <tr ng-repeat="(y,x) in usuarios" >
                                <td style="color:#337ab7; font-weight: bold">{{$index + 1}}</td>
                                <td> {{x.cedula}}</td>
                                <td> {{x.nombre_apellido}}</td>
                                <td> {{x.nombre_perfil}}</td>

                                <td ng-class="x.estatus != 't' ? 'text-danger' : 'text-success'"><b> {{x.estatus != 't'?'Inactivo':'Activo'}}</b></td>
                                <td style="text-align: left;">
                                    <button  ng-click="cambiar_estatus(x.cedula, x.estatus == 't' ? 'false' : 'true', x.estatus == 't' ? 'inactivar' : 'activar')" href="javascript:void(0)"   ng-class="x.estatus == 't' ? 'btn-danger' : 'btn-success'" class="btn  btn-xs ">{{x.estatus == 't'?'Inactivar':'Activar'}}<div class="ripple-container"></div></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </fieldset>

        </div>


    </div>


    <!-- /.col-lg-12 -->

