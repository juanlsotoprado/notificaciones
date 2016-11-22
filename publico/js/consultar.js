
mppeuct.controller('Consultar_bien', ['$scope', '$location', '$rootScope', 'redimencionar', '$http', '$timeout', '$sce', function ($scope, $location, $rootScope, redimencionar, $http, $timeout, $sce) {
        $rootScope.iniciar = true;
        $rootScope.menuActive = $location.path();
        $rootScope.title = "Consultar";
        $scope.pageClass2 = 'hidden';

        $http.post("index.php?lugar=doc&accion=GetBienesNacionales", $scope.temp)
                .success(function (respuesta) {

                    if (String(respuesta).trim() != "false") {

                        $scope.bienesNacionales = respuesta;

                      //  console.log($scope.bienesNacionales);

                    }

                }).error(function () {

            console.log('error');

        });


        $timeout(function () {

            $('.tabla_consulta').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv'
                ],
                "language": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            });


            // alert($rootScope.height+" / "+ $(".content").height());
            $scope.pageClass2 = 'animated slideInDown';
            $timeout(function () {
                $rootScope.iniciar = !$rootScope.iniciar;

                $(".left-side").height($(".content").height());


            }, 100, true);


        }, 120, true);


        redimencionar.redimencionar();

        $scope.ver = function (data) {
            var header = "Ver bien nacional";
            var body = "<div>codigo: " + data + "</div>";
            $rootScope.modal = {
                header: header,
                body: body,
                footer: ""
            };
            $("#mymodal").modal();
        };

        $scope.editar = function (id,data) {

            var header = "Editar bien nacional";
            var body = '';

            $rootScope.modaltitle = true;

            $rootScope.modal = {
                template: ""

            };

            $rootScope.modal = {
                header: header,
                body: body,
                footer: "",
                data: data,
                id: id,
                tiempo: true,
                template: "index.php?lugar=home&accion=Registrar"

            };
            $('#mymodal').on('show.bs.modal', function () {
                $('html').css('overflow', 'hidden');
                
            });
            
             $('#mymodal').on('hidden.bs.modal', function () {
                $('html').css('overflow', 'auto');
                
            });
            

            $("#mymodal").modal();
        };

    }]);