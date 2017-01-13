<br>
<!-- /.row -->
<div class="row animated fadeIn col-lg-12 ">
    <h3><em style="color: #666">Notificaciones<hr></em></h3>

    <div class="panel panel-primary">

        <div class="panel-heading">

            <h4>Notificaciones en proceso</h4>
        </div>
        <div class="panel-body">

            <fieldset style="text-align: left;" >

                <div class="table-responsive">          
                    <table datatable="ng" dt-options="dtOptions"table class="display  cell-border hover order-column stripe tabla_consulta"  cellspacing="0" width="100%">
                        <col style="width: 2%">

                        <thead>
                            <tr>
                                <th >#</th>
                                <th>Tipo notificación</th>
                                <th >Asunto/Mensaje</th>
                                <th >Fecha creación</th>
                                <th >Fecha de envio</th>
                                <th >Funcionario</th>
                                <th style="width: 150px">Progreso de envio</th>
                                <th >Acción</th>


                            </tr>
                        </thead>

                        <tbody class="table_bandeja_apro_tbody">
                            <tr ng-repeat="(y,x) in enCurso" >
                                <td style="color:#337ab7; font-weight: bold">{{$index + 1}}</td>
                                <td> {{x.tipo == 'C'?'CORREO':'SMS'}}</td>
                                <td> {{x.mensaje}}</td>
                                <td> {{x.fecha_creacion}}</td>
                                <td> {{x.fecha_envio}}</td>
                                <td> {{x.nombre_apellido}}</td>
                                <td><uib-progressbar class="progress-striped active" max="x.total" value="x.progreso" type="info"><i>{{x.progreso +" / "+ x.total}}</i></uib-progressbar></div></td>
                                <td style="text-align: left;">
                                    <button  ng-click="cambiar_estatus(x.id_mensaje, x.tipo)" href="javascript:void(0)"  class="btn  btn-xs btn-warning">Cancelar<div class="ripple-container"></div></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </fieldset>

        </div>
        
       
        

    </div>


    <!-- /.col-lg-12 -->

