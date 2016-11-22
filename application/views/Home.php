<div id="bucle" ng-view class="page {{ pageClass}}" style="" ></div>
<div  class=" modal" id="mymodal" role="dialog">
    <div class="modal-dialog modal-lg animated zoomIn">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <span ng-show="modal.caso">    <h4 class="modal-title"  > <em style="color:#3c8dbc"> {{modal.header}} </em><span ng-show="modal.caso"> /  <span style="color: #999"> N° Cédula :</span> <b>{{modal.caso}}</b></h4>     </span>          

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
