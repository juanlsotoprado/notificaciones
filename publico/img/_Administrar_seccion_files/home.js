// Creación del módulo
var mppeuct = angular.module('mppeuct', ['ngRoute', 'ngSanitize', 'ngProgressLite', 'datatables']);

// Configuración de las rutas
mppeuct.config(['$routeProvider', 'ngProgressLiteProvider', function ($routeProvider, ngProgressLiteProvider) {

        // alert(base_url+'index.php/app/Inicio');

        // alert(id_perfil);

        if (id_perfil == 1 || id_perfil == 2) {

            if (id_perfil == 1) {

                $routeProvider
                        .when('/Funcionario_mppeuct', {
                            templateUrl: base_url + 'index.php/app/Registrar_usuario_mppeuct',
                            controller: 'Funcionario_mppeuct'
                        });
            }

            $routeProvider.when('/Registar_responsable', {
                templateUrl: base_url + 'index.php/app/Inicio',
                controller: 'Registar_responsable'

            });

            $routeProvider.when('/Gestionar_responsable', {
                templateUrl: base_url + 'index.php/app/Gestionar_ieu',
                controller: 'Gestionar_responsable'
            });

            $routeProvider.otherwise({
                redirectTo: '/Gestionar_responsable'
            });

        } else if (id_perfil == 3) {

            $routeProvider
                    .when('/Descarga_de_archivo', {
                        templateUrl: base_url + 'index.php/app/En_construccion',
                        controller: 'Descarga_de_archivo'
                    });


            $routeProvider
                    .when('/Agregar_profesor', {
                        templateUrl: base_url + 'index.php/app/Agregar_profesor',
                        controller: 'Agregar_profesor'
                    });

            $routeProvider
                    .when('/Administrar_profesores', {
                        templateUrl: base_url + 'index.php/app/Gestionar_profesor',
                        controller: 'Administrar_profesores'
                    });

            $routeProvider
                    .when('/materia_profesor', {
                        templateUrl: base_url + 'index.php/app/En_construccion',
                        controller: 'materia_profesor'
                    });

            $routeProvider
                    .when('/Agregar_estudiante', {
                        templateUrl: base_url + 'index.php/app/Agregar_estudiante',
                        controller: 'Agregar_estudiante'
                    });


            $routeProvider
                    .when('/Administrar_estudiantes', {
                        templateUrl: base_url + 'index.php/app/Gestionar_estudiante',
                        controller: 'Administrar_estudiantes'
                    });



            $routeProvider
                    .when('/Administrar_seccion', {
                        templateUrl: base_url + 'index.php/app/Agregar_seccion',
                        controller: 'Agregar_seccion'
                    });



            $routeProvider
                    .when('/Agregar_materia', {
                        templateUrl: base_url + 'index.php/app/Agregar_materia',
                        controller: 'Agregar_materia'
                    });

            $routeProvider
                    .when('/Administrar_materias', {
                        templateUrl: base_url + 'index.php/app/En_construccion',
                        controller: 'Administrar_materias'
                    });


            $routeProvider.otherwise({
                redirectTo: '/Descarga_de_archivo'
            });

        } else if (id_perfil == 4) {

            $routeProvider
                    .when('/Postulacion', {
                        templateUrl: base_url + 'index.php/app/Postulacion',
                        controller: 'Postulacion'
                    });

            $routeProvider.otherwise({
                redirectTo: '/Postulacion'
            });

        }



    }]);


mppeuct.controller('app', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', function ($scope, $window, $rootScope, ngProgressLite, $timeout) {
        $rootScope.base_url = base_url;
        $rootScope.base_url_doc = base_url + 'privado/docs/';

    }]);

mppeuct.controller('Funcionario_mppeuct', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.title = "Funcionario_mppeuct";
        ngProgressLite.start();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};



        $scope.buscar_cedula = function (cedula) {
            $http.post(base_url + "index.php/App_servicios/get_datos_mppeuct_saime/", {cedula: cedula})
                    .success(function (respuesta) {

                        // console.log(respuesta);

                        if (String(respuesta.casos).trim() != 'false') {
                            if (String(respuesta.casos).trim() != 'undefined') {

                                $scope.formData.primer_nombre = respuesta.casos.primernombre;
                                $scope.formData.segundo_nombre = respuesta.casos.segundonombre;
                                $scope.formData.primer_apellido = respuesta.casos.primerapellido;
                                $scope.formData.segundo_apellido = respuesta.casos.segundoapellido;
                                $scope.formData.genero = respuesta.casos.sexo;
                                $scope.formData.nacionalidad = respuesta.casos.letra;

                            } else {


                                $scope.formData.primer_nombre = '';
                                $scope.formData.segundo_nombre = '';
                                $scope.formData.primer_apellido = '';
                                $scope.formData.segundo_apellido = '';
                                $scope.formData.genero = '';
                                $scope.formData.nacionalidad = '';
                            }

                        } else {


                            $scope.formData.primer_nombre = '';
                            $scope.formData.segundo_nombre = '';
                            $scope.formData.primer_apellido = '';
                            $scope.formData.segundo_apellido = '';
                            $scope.formData.genero = '';
                            $scope.formData.nacionalidad = '';
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;

            });

        };

        // DataTables configurable options
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withLanguage({
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
                });

        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);

    }]);





mppeuct.controller('Registar_responsable', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};
        $rootScope.ph_numbr = /0[1-9]{3}[0-9]{7}$/;
        $scope.formData.campo_existente = false;



        $scope.verificar_correo = function (correo) {
            $scope.formData.correo_validado = false;


            $http.post(base_url + "index.php/App_servicios/verificar_correo/", {correo: correo})
                    .success(function (respuesta) {



                        if (String(respuesta.casos).trim() != 'false') {

                            if (String(respuesta.casos).trim() != 'undefined') {

                                $scope.formData.correo_validado = true;


                            }

                        }

                        console.log('respuesta :' + $scope.formData.correo_validado);

                    }

                    ).error(function () {

                console.log('error');

            });


        };


        $http.post(base_url + "index.php/App_servicios/get_universidades/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $scope.datos_registro.universidades = respuesta.casos;

                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/registrar_usuario_ieu/');
        });

        $scope.get_usuarios_ieu = function () {




            $http.post(base_url + "index.php/App_servicios/get_usuarios_ieu/")
                    .success(function (respuesta) {

                        //  console.log(respuesta.casos);

                        if (String(respuesta.casos).trim() != 'false') {

                            $scope.busqueda = {usuarios_ieu: respuesta.casos};

                        }

                    }).error(function () {

                console.log('error: index.php/App_servicios/get_usuarios_ieu/');
            });

        };
        $scope.get_usuarios_ieu();

        $scope.buscar_cedula = function (cedula) {

            $http.post(base_url + "index.php/App_servicios/get_datos_saime/", {cedula: cedula})
                    .success(function (respuesta) {
                        $scope.formData.campo_existente = false;

                        if (String(respuesta.casos).trim() != 'false') {


                            if (String(respuesta.casos).trim() != 'undefined') {

                                // console.log(respuesta.casos);

                                if (String(respuesta.casos.usuario_exitente).trim() == 'false') {

                                    $scope.formData.primer_nombre = respuesta.casos.primernombre;
                                    $scope.formData.segundo_nombre = respuesta.casos.segundonombre;
                                    $scope.formData.primer_apellido = respuesta.casos.primerapellido;
                                    $scope.formData.segundo_apellido = respuesta.casos.segundoapellido;
                                    $scope.formData.genero = respuesta.casos.sexo;
                                    $scope.formData.nacionalidad = respuesta.casos.letra;
                                } else {

                                    $scope.formData.campo_existente = true;
                                }
                            } else {


                                $scope.formData.primer_nombre = '';
                                $scope.formData.segundo_nombre = '';
                                $scope.formData.primer_apellido = '';
                                $scope.formData.segundo_apellido = '';
                                $scope.formData.genero = '';
                                $scope.formData.nacionalidad = '';
                            }

                        } else {


                            $scope.formData.primer_nombre = '';
                            $scope.formData.segundo_nombre = '';
                            $scope.formData.primer_apellido = '';
                            $scope.formData.segundo_apellido = '';
                            $scope.formData.genero = '';
                            $scope.formData.nacionalidad = '';
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;

            });

        };

        $scope.registrar = function () {


            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas registrar a elresponsable IEU?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/registrar_usuario_ieu/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_usuarios_ieu();

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha registrado al responsable IEU.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });



                                    $scope.formData = {};
                                    $window.location = "#Registar_responsable/";
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha registrado a el responsable IEU.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha registrado a el responsable IEU.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };


        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);

    }]);

mppeuct.controller('Gestionar_responsable', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {

        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();

        $scope.busqueda = {};
        $rootScope.ph_numbr = /0[1-9]{3}[0-9]{7}$/;

        $rootScope.modificar = function () {


            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas modificar a elresponsable IEU?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/modificar_usuario_ieu/", $scope.formData)
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_usuarios_ieu();

                                    $("#mymodal").modal('hide');

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha modificado al responsable IEU.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $rootScope.formData = {};
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha modificado a el responsable IEU.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha modificado a el responsable IEU.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };


        $scope.cambiar_estatus = function (cedula, estatus, estatus_clave) {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas ' + estatus_clave + ' a este responsable IEU?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {
                    $http.post(base_url + "index.php/App_servicios/set_estatus_ieu/", {cedula: cedula, estatus: estatus})
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_usuarios_ieu();


                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha ' + estatus_clave + ' al responsable IEU.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $rootScope.formData = {};
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha ' + estatus_clave + ' a el responsable IEU.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha ' + estatus_clave + ' a el responsable IEU.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };



        $scope.ver = function (data) {

            ngProgressLite.start();
            ngProgressLite.set(0.2);

            $http.post(base_url + "index.php/App_servicios/get_ver_usuario_ieu/", {cedula: data})
                    .success(function (respuesta) {
                        $rootScope.formData = {};


                        if (String(respuesta.casos).trim() != "false") {

                            // console.log(respuesta.casos[data]);

                            $rootScope.formData = respuesta.casos[data];

                            $rootScope.modal = {header_menu: true};
                            $rootScope.modal = {
                                caso: data,
                                header: 'Responsable IEU',
                                body: 'body',
                                footer: "",
                                data: 'data',
                                id: 'id',
                                tipo: 'tipo',
                                tiempo: true,
                                template: base_url + 'index.php/app/Ver_caso'
                            };

                            $("#mymodal").modal();
                            ngProgressLite.done();

                        } else {

                            $rootScope.data_caso = false;
                            ngProgressLite.done();


                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;
            });

        };

        $scope.editar = function (data) {

            ngProgressLite.start();
            ngProgressLite.set(0.2);

            $rootScope.formData = {};

            $http.post(base_url + "index.php/App_servicios/get_ver_usuario_ieu/", {cedula: data})
                    .success(function (respuesta) {

                        if (String(respuesta.casos).trim() != "false") {

                            // console.log(respuesta.casos[data]);

                            $rootScope.formData2 = respuesta.casos[data];


                            if ($rootScope.formData2.telefono_celular < 1) {

                                $rootScope.formData2.telefono_celular = "";

                            }


                            if ($rootScope.formData2.telefono_hab < 1) {

                                $rootScope.formData2.telefono_hab = "";

                            }


                            $rootScope.formData = $rootScope.formData2;
                            $rootScope.formData.correo2 = $rootScope.formData.correo_ppal;



                            $rootScope.formData.universidad = {id_ieu: $rootScope.formData.id_ieu, nombre_ieu: $rootScope.formData.nombre_ieu};


                            $rootScope.modal = {header_menu: true};
                            $rootScope.modal = {
                                caso: data,
                                header: 'Responsable IEU',
                                body: 'body',
                                footer: "",
                                data: 'data',
                                id: 'id',
                                tipo: 'tipo',
                                tiempo: true,
                                template: base_url + 'index.php/app/Edtar_ieu'
                            };

                            $("#mymodal").modal();
                            ngProgressLite.done();

                        } else {

                            $rootScope.data_caso = false;
                            ngProgressLite.done();
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;
            });

        };


        $http.post(base_url + "index.php/App_servicios/get_universidades/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $rootScope.datos_registro = {universidades: respuesta.casos};

                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/registrar_usuario_ieu/');
        });




        $scope.get_usuarios_ieu = function () {

            $http.post(base_url + "index.php/App_servicios/get_usuarios_ieu/")
                    .success(function (respuesta) {

                        console.log(respuesta.casos);

                        if (String(respuesta.casos).trim() != 'false') {

                            $scope.busqueda = {usuarios_ieu: respuesta.casos};

                        }

                    }).error(function () {

                console.log('error: index.php/App_servicios/get_usuarios_ieu/');
            });

        };
        $scope.get_usuarios_ieu();


        // DataTables configurable options
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withLanguage({
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
                });


        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);

mppeuct.controller('Descarga_de_archivo', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};

        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);
    }]);


mppeuct.controller('Agregar_profesor', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};
        $rootScope.ph_numbr = /0[1-9]{3}[0-9]{7}$/;
        $scope.formData.campo_existente = false;



        $scope.verificar_correo = function (correo) {
            $scope.formData.correo_validado = false;


            $http.post(base_url + "index.php/App_servicios/verificar_correo/", {correo: correo})
                    .success(function (respuesta) {



                        if (String(respuesta.casos).trim() != 'false') {

                            if (String(respuesta.casos).trim() != 'undefined') {

                                $scope.formData.correo_validado = true;


                            }

                        }

                        console.log('respuesta :' + $scope.formData.correo_validado);

                    }

                    ).error(function () {

                console.log('error');

            });


        };

        $scope.buscar_cedula = function (cedula) {

            $http.post(base_url + "index.php/App_servicios/get_datos_saime/", {cedula: cedula})
                    .success(function (respuesta) {
                        $scope.formData.campo_existente = false;

                        if (String(respuesta.casos).trim() != 'false') {


                            if (String(respuesta.casos).trim() != 'undefined') {

                                // console.log(respuesta.casos);

                                if (String(respuesta.casos.usuario_exitente).trim() == 'false') {

                                    $scope.formData.primer_nombre = respuesta.casos.primernombre;
                                    $scope.formData.segundo_nombre = respuesta.casos.segundonombre;
                                    $scope.formData.primer_apellido = respuesta.casos.primerapellido;
                                    $scope.formData.segundo_apellido = respuesta.casos.segundoapellido;
                                    $scope.formData.genero = respuesta.casos.sexo;
                                    $scope.formData.nacionalidad = respuesta.casos.letra;
                                } else {

                                    $scope.formData.campo_existente = true;
                                }
                            } else {


                                $scope.formData.primer_nombre = '';
                                $scope.formData.segundo_nombre = '';
                                $scope.formData.primer_apellido = '';
                                $scope.formData.segundo_apellido = '';
                                $scope.formData.genero = '';
                                $scope.formData.nacionalidad = '';
                            }

                        } else {


                            $scope.formData.primer_nombre = '';
                            $scope.formData.segundo_nombre = '';
                            $scope.formData.primer_apellido = '';
                            $scope.formData.segundo_apellido = '';
                            $scope.formData.genero = '';
                            $scope.formData.nacionalidad = '';
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;

            });
        };

        $scope.registrar = function () {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas registrar a este(a) profesor(a)?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/registrar_profesor/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'profesor(a) registrado(a).',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });



                                    $scope.formData = {};
                                    $window.location = "#Agregar_profesor/";
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'Profesor(a) no registrado(a).',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'Profesor(a) no registrado(a).',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };

        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);

    }]);

mppeuct.controller('Administrar_profesores', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();

        $scope.busqueda = {};
        $rootScope.ph_numbr = /0[1-9]{3}[0-9]{7}$/;

        $rootScope.modificar = function () {


            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas modificar el profesor(a)',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/modificar_profesor/", $scope.formData)
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_profesores();

                                    $("#mymodal").modal('hide');

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha modificado el profesor(a).',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $rootScope.formData = {};
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha modificado el profesor(a).',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha modificado el profesor(a).',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };


        $scope.cambiar_estatus = function (cedula, estatus, estatus_clave) {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas ' + estatus_clave + ' a este(a) profesor(a)?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {
                    $http.post(base_url + "index.php/App_servicios/set_estatus_profesor/", {cedula: cedula, estatus: estatus})
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_profesores();

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha ' + estatus_clave + ' al profesor.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $rootScope.formData = {};

                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha ' + estatus_clave + ' al profesor.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha ' + estatus_clave + ' al profesor.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };



        $scope.ver = function (data) {

            ngProgressLite.start();
            ngProgressLite.set(0.2);

            $http.post(base_url + "index.php/App_servicios/get_ver_profesor/", {cedula: data})
                    .success(function (respuesta) {
                        $rootScope.formData = {};

                        if (String(respuesta.casos).trim() != "false") {

                            // console.log(respuesta.casos[data]);

                            $rootScope.formData = respuesta.casos[data];

                            $rootScope.modal = {header_menu: true};
                            $rootScope.modal = {
                                caso: data,
                                header: 'Profesor(a)',
                                body: 'body',
                                footer: "",
                                data: 'data',
                                id: 'id',
                                tipo: 'tipo',
                                tiempo: true,
                                template: base_url + 'index.php/app/Ver_profesor'
                            };

                            $("#mymodal").modal();
                            ngProgressLite.done();

                        } else {

                            $rootScope.data_caso = false;
                            ngProgressLite.done();


                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;
            });

        };

        $scope.editar = function (data) {

            ngProgressLite.start();
            ngProgressLite.set(0.2);

            $rootScope.formData = {};




            $http.post(base_url + "index.php/App_servicios/get_ver_profesor/", {cedula: data})
                    .success(function (respuesta) {
                        console.log(respuesta);

                        if (String(respuesta.casos).trim() != "false") {

                            console.log(respuesta.casos[data]);

                            $rootScope.formData2 = respuesta.casos[data];


                            if ($rootScope.formData2.telefono_celular < 1) {

                                $rootScope.formData2.telefono_celular = "";

                            }


                            if ($rootScope.formData2.telefono_hab < 1) {

                                $rootScope.formData2.telefono_hab = "";

                            }

                            $rootScope.formData = $rootScope.formData2;
                            $rootScope.formData.correo2 = $rootScope.formData.correo_ppal;


                            $rootScope.modal = {header_menu: true};
                            $rootScope.modal = {
                                caso: data,
                                header: 'Responsable IEU',
                                body: 'body',
                                footer: "",
                                data: 'data',
                                id: 'id',
                                tipo: 'tipo',
                                tiempo: true,
                                template: base_url + 'index.php/app/Edtar_profesor'
                            };

                            $("#mymodal").modal();
                            ngProgressLite.done();

                        } else {

                            $rootScope.data_caso = false;
                            ngProgressLite.done();
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;
            });

        };


        $http.post(base_url + "index.php/App_servicios/get_universidades/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $rootScope.datos_registro = {universidades: respuesta.casos};

                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/registrar_usuario_ieu/');
        });


        $scope.get_profesores = function () {

            $http.post(base_url + "index.php/App_servicios/get_profesores/")
                    .success(function (respuesta) {

                        //    console.log(respuesta.casos);

                        if (String(respuesta.casos).trim() != 'false') {

                            $scope.busqueda = {usuarios_ieu: respuesta.casos};

                        }

                    }).error(function () {

                console.log('error: index.php/App_servicios/get_profesores/');
            });
        };


        $scope.get_profesores();

        // DataTables configurable options
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withLanguage({
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
                });


        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);

mppeuct.controller('materia_profesor', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};




        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);

mppeuct.controller('Agregar_estudiante', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};
        $rootScope.ph_numbr = '^\+?\d\d\d\d\d\d\d\d\d\d\d\d\d$/';
        $scope.formData.campo_existente = false;



        $scope.verificar_correo = function (correo) {
            $scope.formData.correo_validado = false;


            $http.post(base_url + "index.php/App_servicios/verificar_correo/", {correo: correo})
                    .success(function (respuesta) {



                        if (String(respuesta.casos).trim() != 'false') {

                            if (String(respuesta.casos).trim() != 'undefined') {

                                $scope.formData.correo_validado = true;


                            }

                        }

                        console.log('respuesta :' + $scope.formData.correo_validado);

                    }

                    ).error(function () {

                console.log('error');

            });


        };

        $scope.buscar_cedula = function (cedula) {

            $http.post(base_url + "index.php/App_servicios/get_datos_saime/", {cedula: cedula})
                    .success(function (respuesta) {
                        $scope.formData.campo_existente = false;

                        if (String(respuesta.casos).trim() != 'false') {


                            if (String(respuesta.casos).trim() != 'undefined') {

                                // console.log(respuesta.casos);

                                if (String(respuesta.casos.usuario_exitente).trim() == 'false') {

                                    $scope.formData.primer_nombre = respuesta.casos.primernombre;
                                    $scope.formData.segundo_nombre = respuesta.casos.segundonombre;
                                    $scope.formData.primer_apellido = respuesta.casos.primerapellido;
                                    $scope.formData.segundo_apellido = respuesta.casos.segundoapellido;
                                    $scope.formData.genero = respuesta.casos.sexo;
                                    $scope.formData.nacionalidad = respuesta.casos.letra;
                                } else {

                                    $scope.formData.campo_existente = true;
                                }
                            } else {


                                $scope.formData.primer_nombre = '';
                                $scope.formData.segundo_nombre = '';
                                $scope.formData.primer_apellido = '';
                                $scope.formData.segundo_apellido = '';
                                $scope.formData.genero = '';
                                $scope.formData.nacionalidad = '';
                            }

                        } else {


                            $scope.formData.primer_nombre = '';
                            $scope.formData.segundo_nombre = '';
                            $scope.formData.primer_apellido = '';
                            $scope.formData.segundo_apellido = '';
                            $scope.formData.genero = '';
                            $scope.formData.nacionalidad = '';
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;

            });
        };

        $scope.registrar = function () {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas registrar a el estudiante?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/registrar_estudiante/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha registrado al estudiante.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });



                                    $scope.formData = {};
                                    $window.location = "#Agregar_estudiante/";
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha registrado a el estudiante.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha registrado a el estudiante.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };


        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);
    }]);

mppeuct.controller('Descarga_de_archivo', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};




        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);

mppeuct.controller('Administrar_estudiantes', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();

        $scope.busqueda = {};
        $rootScope.ph_numbr = '/^\+?\d\d\d\d\d\d\d\d\d\d\d$/';

        $rootScope.modificar = function () {


            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas modificar el estudiante',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/modificar_estudiante/", $scope.formData)
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_estudiantes();

                                    $("#mymodal").modal('hide');

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha modificado el estudiante.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $rootScope.formData = {};
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha modificado el estudiante.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha modificado el estudiante.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };
        $scope.cambiar_estatus = function (cedula, estatus, estatus_clave) {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas ' + estatus_clave + ' a este estudiante?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {
                    $http.post(base_url + "index.php/App_servicios/set_estatus_estudiante/", {cedula: cedula, estatus: estatus})
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_estudiantes();

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha ' + estatus_clave + ' al estudiante.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $rootScope.formData = {};

                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha ' + estatus_clave + ' al estudiante.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha ' + estatus_clave + ' al estudiante.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };



        $scope.ver = function (data) {

            ngProgressLite.start();
            ngProgressLite.set(0.2);

            $http.post(base_url + "index.php/App_servicios/get_ver_estudiante/", {cedula: data})
                    .success(function (respuesta) {
                        $rootScope.formData = {};

                        if (String(respuesta.casos).trim() != "false") {

                            // console.log(respuesta.casos[data]);

                            $rootScope.formData = respuesta.casos[data];

                            $rootScope.modal = {header_menu: true};
                            $rootScope.modal = {
                                caso: data,
                                header: 'Estudiante',
                                body: 'body',
                                footer: "",
                                data: 'data',
                                id: 'id',
                                tipo: 'tipo',
                                tiempo: true,
                                template: base_url + 'index.php/app/Ver_estudiante'
                            };

                            $("#mymodal").modal();
                            ngProgressLite.done();

                        } else {

                            $rootScope.data_caso = false;
                            ngProgressLite.done();


                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;
            });

        };

        $scope.editar = function (data) {

            ngProgressLite.start();
            ngProgressLite.set(0.2);

            $rootScope.formData = {};

            $http.post(base_url + "index.php/App_servicios/get_ver_estudiante/", {cedula: data})
                    .success(function (respuesta) {
                        console.log(respuesta);

                        if (String(respuesta.casos).trim() != "false") {

                            console.log(respuesta.casos[data]);

                            $rootScope.formData2 = respuesta.casos[data];

                            $rootScope.formData2.telefono_celular = parseInt($rootScope.formData2.telefono_celular);
                            $rootScope.formData2.telefono_hab = parseInt($rootScope.formData2.telefono_hab);

                            $rootScope.formData = $rootScope.formData2;
                            $rootScope.formData.correo2 = $rootScope.formData.correo_ppal;


                            $rootScope.modal = {header_menu: true};
                            $rootScope.modal = {
                                caso: data,
                                header: 'Responsable IEU',
                                body: 'body',
                                footer: "",
                                data: 'data',
                                id: 'id',
                                tipo: 'tipo',
                                tiempo: true,
                                template: base_url + 'index.php/app/Edtar_estudiante'
                            };

                            $("#mymodal").modal();
                            ngProgressLite.done();

                        } else {

                            $rootScope.data_caso = false;
                            ngProgressLite.done();
                        }
                    }
                    ).error(function () {

                console.log('error');
                $scope.funcionario_encontrado = false;
            });

        };


        $http.post(base_url + "index.php/App_servicios/get_universidades/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $rootScope.datos_registro = {universidades: respuesta.casos};

                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/registrar_usuario_ieu/');
        });


        $scope.get_estudiantes = function () {

            $http.post(base_url + "index.php/App_servicios/get_estudiantes/")
                    .success(function (respuesta) {

                        //    console.log(respuesta.casos);

                        if (String(respuesta.casos).trim() != 'false') {

                            $scope.busqueda = {usuarios_ieu: respuesta.casos};

                        }

                    }).error(function () {

                console.log('error: index.php/App_servicios/get_estudiantes/');
            });
        };


        $scope.get_estudiantes();

        // DataTables configurable options
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withLanguage({
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
                });


        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);

mppeuct.controller('Agregar_materia', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};




        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);



mppeuct.controller('Administrar_materias', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};




        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);



    }]);

mppeuct.controller('Postulacion', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};



        $http.post(base_url + "index.php/App_servicios/get_universidades/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $scope.datos_registro.universidades = respuesta.casos;

                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/registrar_usuario_ieu/');
        });


        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);

    }]);



mppeuct.controller('Agregar_seccion', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {

        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};


        $scope.get_secciones = function () {

            $http.post(base_url + "index.php/App_servicios/get_secciones/")
                    .success(function (respuesta) {

                        // console.log(respuesta);

                        if (String(respuesta.casos).trim() != 'false') {

                            $scope.busqueda = {secciones: respuesta.casos};

                        }

                    }).error(function () {

                console.log('error: index.php/App_servicios/get_secciones/');
            });
        };

        $scope.cambiar_estatus = function (id_seccion, estatus, estatus_clave) {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas ' + estatus_clave + ' esta sección ?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {
                    $http.post(base_url + "index.php/App_servicios/Set_estatus_seccion/", {id_seccion: id_seccion, estatus: estatus})
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {


                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha ' + estatus_clave + ' la sección.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                  //  $scope.get_secciones();

                                    $rootScope.formData = {};

                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha ' + estatus_clave + ' la sección.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha ' + estatus_clave + ' la sección.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };



        $scope.registrar = function () {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas registrar la sección ?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/registrar_seccion/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha registrado la sección.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });



                                    $scope.formData = {};

                                    $scope.get_secciones();
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha registrado a la sección.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha registrado a la sección.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };


        $scope.get_secciones();

        // DataTables configurable options
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withLanguage({
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
                });



        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);

    }]);



mppeuct.controller('Vincular_seccion', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {

        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};



        $http.post(base_url + "index.php/App_servicios/get_carreras_ieu/")
                .success(function (respuesta) {

                    //  console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $scope.datos_registro.carreras = respuesta.casos;

                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/registrar_usuario_ieu/');
        });



        $scope.registrar = function () {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas registrar la sección ?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/registrar_estudiante/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha registrado la sección.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });



                                    $scope.formData = {};
                                    $window.location = "#Agregar_estudiante/";
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha registrado a la sección.',
                                        'theme': 'red',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'red'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se ha registrado a la sección.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}
                        });
                        console.log('error');
                    });
                }, 'onDeny': function () {
                }
            });

        };



        $timeout(function () {
            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;

        }, 200);

    }]);



