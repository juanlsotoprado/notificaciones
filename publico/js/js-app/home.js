// Creación del módulo
var msn_exito = 'Se ha procesado  exitosamente';
var msn_error = 'Ha ocurrido un error al procesar';
var mppeuct = angular.module('mppeuct', ['ngRoute', 'ngSanitize', 'ngProgressLite', 'datatables', 'textAngular']);

// Configuración de las rutas
mppeuct.config(['$routeProvider', 'ngProgressLiteProvider', function ($routeProvider, ngProgressLiteProvider) {

        // alert(base_url+'index.php/app/Inicio');

        // alert(id_perfil);

        $routeProvider.when('/Inicio', {
            templateUrl: base_url + 'index.php/app/Inicio',
            controller: 'Inicio'

        });

        if (id_perfil == 1) {
            $routeProvider.when('/Enviar_correo_masivo', {
                templateUrl: base_url + 'index.php/app/Enviar_correo_masivo',
                controller: 'Enviar_correo_masivo'

            });

            $routeProvider.when('/Enviar_mensaje_masivo', {
                templateUrl: base_url + 'index.php/app/Enviar_mensaje_masivo',
                controller: 'Enviar_mensaje_masivo'
            });

            $routeProvider.when('/Administracion', {
                templateUrl: base_url + 'index.php/app/Administracion_usuario',
                controller: 'Administracion'
            });

            $routeProvider.when('/En_curso', {
                templateUrl: base_url + 'index.php/app/En_curso',
                controller: 'En_curso'
            });


        }

        if (id_perfil == 2) {

            $routeProvider.when('/Enviar_correo_masivo', {
                templateUrl: base_url + 'index.php/app/Enviar_correo_masivo',
                controller: 'Enviar_correo_masivo'

            });

            $routeProvider.when('/En_curso', {
                templateUrl: base_url + 'index.php/app/En_curso',
                controller: 'En_curso'
            });



        }

        if (id_perfil == 3) {

            $routeProvider.when('/Enviar_mensaje_masivo', {
                templateUrl: base_url + 'index.php/app/Enviar_mensaje_masivo',
                controller: 'Enviar_mensaje_masivo'
            });

            $routeProvider.when('/En_curso', {
                templateUrl: base_url + 'index.php/app/En_curso',
                controller: 'En_curso'
            });



        }

        if (id_perfil == 4) {

            $routeProvider.when('/Enviar_correo_masivo', {
                templateUrl: base_url + 'index.php/app/Enviar_correo_masivo',
                controller: 'Enviar_correo_masivo'

            });

            $routeProvider.when('/Enviar_mensaje_masivo', {
                templateUrl: base_url + 'index.php/app/Enviar_mensaje_masivo',
                controller: 'Enviar_mensaje_masivo'
            });

            $routeProvider.when('/En_curso', {
                templateUrl: base_url + 'index.php/app/En_curso',
                controller: 'En_curso'
            });

        }


        $routeProvider.otherwise({
            redirectTo: '/Inicio'
        });


    }]);



mppeuct.controller('app', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', function ($scope, $window, $rootScope, ngProgressLite, $timeout) {
        $rootScope.base_url = base_url;
        $rootScope.base_url_doc = base_url + 'privado/docs/';
        $rootScope.mostrar_reg = false;

    }]);



mppeuct.controller('Inicio', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();

        $timeout(function () {

            ngProgressLite.done();
            $rootScope.show = 1;
            $rootScope.show2 = 1;
        }, 200);
    }]);

mppeuct.controller('En_curso', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', 'textAngularManager', '$interval', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location, textAngularManager, $interval) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};

        $interval(function () {
            $scope.en_curso();
        }, 100000);

        $scope.en_curso = function () {

            $http.post(base_url + "index.php/App_servicios/Get_trans/")
                    .success(function (respuesta) {

                        // console.log(respuesta.casos);

                        if (String(respuesta.casos).trim() != 'false') {

                            if (!angular.equals($rootScope.enCurso, respuesta.casos)) {

                                $rootScope.enCurso = respuesta.casos;

                            }

                        } else {

                            $rootScope.enCurso = {};

                        }

                        $timeout(function () {

                            ngProgressLite.done();
                            $rootScope.show = 1;
                            $rootScope.show2 = 1;

                        }, 0);

                    }).error(function () {

                $timeout(function () {

                    ngProgressLite.done();
                    $rootScope.show = 1;
                    $rootScope.show2 = 1;

                }, 0);

                console.log('error: index.php/App_servicios/Get_trans/');

            });

        };
        $scope.en_curso();


        $scope.cambiar_estatus = function (id, tipo) {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'auto',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Está seguro que desea cancelar esta transacción?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'zoomIn',
                'hideAnimation': 'fadeOutDown',
                'onConfirm': function () {


                    $http.post(base_url + "index.php/App_servicios/set_estatus_trans/", {id: id, tipo: tipo})
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Éxito!',
                                        'content': 'se  ha cancelado esta transacción',
                                        'theme': 'dark_blue',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                    $rootScope.enCurso = false;
                                    $scope.en_curso();

                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se pudo cancelar esta transacción',
                                        'theme': 'black',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se pudo cancelar esta transacción',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });
                        console.log('error');
                    });

                }, 'onDeny': function () {


                }
            });
        };


    }]);



mppeuct.controller('Administracion', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', 'textAngularManager', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location, textAngularManager) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};
        $scope.modificar = false;

        $scope.una = '10';
        extScope = $scope;


        $scope.buscarUsusario = function (usuario) {
            $scope.modificar = false;
            $scope.formData.modificar = true;
            $scope.formData.correo = false;

            $scope.formData = {};
            usuario != undefined ? usuario : usuario = '';
            if (usuario.trim() != '') {
                $http.post(base_url + "index.php/App_servicios/Buscar_usuario/", {funcionario: usuario})
                        .success(function (respuesta) {

                            //   console.log(respuesta);
                            if (String(respuesta.casos).trim() == 'ldap' || String(respuesta.casos).trim() == 'false') {

                                $.jAlert({
                                    'title': '¡Error!.',
                                    'content': 'El funcionario <b>' + usuario + '</b>, no fue encontrado..',
                                    'theme': 'black',
                                    'size': 'auto',
                                    'showAnimation': 'bounceInDown',
                                    'hideAnimation': 'bounceOutDown',
                                    'btns': {'text': 'Aceptar', 'theme': 'black'}
                                });

                            } else {

                                $scope.formData.numcedula = respuesta.casos.data.numcedula;
                                $scope.formData.correo = respuesta.casos.data.correo;
                                if (respuesta.casos.sistema != 'false') {

                                    //  console.log('entrosssss');

                                    $scope.modificar = true;
                                    $scope.formData.modificar = true;

                                    $scope.formData.perfil = {id: respuesta.casos.sistema.id_perfil, descripcion: respuesta.casos.sistema.nombre_perfil};

                                }


                                $scope.formData.nombreApellido = respuesta.casos.data.nombre;

                            }


                        }).error(function () {

                    $.jAlert({
                        'title': '¡Error!.',
                        'content': 'Problemas al buscar el funcionario.',
                        'theme': 'black',
                        'size': 'auto',
                        'showAnimation': 'bounceInDown',
                        'hideAnimation': 'bounceOutDown',
                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                    });
                    console.log('error');
                });

            } else {

                $.jAlert({
                    'title': '¡Error!.',
                    'content': 'El campo funcionario no debe estar vacio.',
                    'theme': 'black',
                    'size': 'auto',
                    'showAnimation': 'bounceInDown',
                    'hideAnimation': 'bounceOutDown',
                    'btns': {'text': 'Aceptar', 'theme': 'black'}
                });


            }

        }

        $http.post(base_url + "index.php/App_servicios/Get_usuarios/")
                .success(function (respuesta) {

                    // console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $rootScope.usuarios = respuesta.casos;

                    }

                    $timeout(function () {

                        ngProgressLite.done();
                        $rootScope.show = 1;
                        $rootScope.show2 = 1;

                    }, 0);

                }).error(function () {

            $timeout(function () {

                ngProgressLite.done();
                $rootScope.show = 1;
                $rootScope.show2 = 1;

            }, 0);

            console.log('error: index.php/App_servicios/get_usuarios/');
        });


        $http.post(base_url + "index.php/App_servicios/Get_perfiles/")
                .success(function (respuesta) {

                    if (String(respuesta.casos).trim() != 'false') {

                        $scope.datos_registro.perfiles = respuesta.casos;

                    }

                    $timeout(function () {

                        ngProgressLite.done();
                        $rootScope.show = 1;
                        $rootScope.show2 = 1;

                    }, 0);

                }).error(function () {

            $timeout(function () {

                ngProgressLite.done();
                $rootScope.show = 1;
                $rootScope.show2 = 1;

            }, 0);

            console.log('error: index.php/App_servicios/Get_perfiles/');
        });





        $scope.registrar = function () {
            var valor = $scope.modificar ? '<b>modificar</b>' : '<b>registrar</b>';
            var valor2 = $scope.modificar ? '<b>modificado</b>' : '<b>registrado</b>';

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'auto',
                'theme': 'dark_green',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Está seguro que desea ' + valor + '   este funcionario?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'zoomIn',
                'hideAnimation': 'fadeOutDown',
                'onConfirm': function () {

                    // console.log($scope.formData);

                    $http.post(base_url + "index.php/App_servicios/registrar_modificar_funcionario/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Éxito!',
                                        'content': 'Se ha ' + valor2 + ' este funcionario exitosamente.',
                                        'theme': 'dark_blue',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                    $scope.formData = {};
                                    //$rootScope.get_secciones2();
                                    $window.location = "#Administracion/";

                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'Problemas al ' + valor + ' este funcionario.',
                                        'theme': 'black',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'Problemas al ' + valor + ' este funcionario.',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
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
                'size': 'auto',
                'theme': 'dark_green',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Está seguro que desea ' + estatus_clave + ' al funcionario?',
                'confirmBtnText': 'Si',
                'denyBtnText': 'No',
                'showAnimation': 'zoomIn',
                'hideAnimation': 'fadeOutDown',
                'onConfirm': function () {


                    $http.post(base_url + "index.php/App_servicios/set_estatus/", {cedula: cedula, estatus: estatus})
                            .success(function (respuesta) {

                                // console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {
                                    $.jAlert({
                                        'title': '¡Éxito!',
                                        'content': 'se le ha cambiado el estatus al funcionario',
                                        'theme': 'dark_blue',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                    $window.location = "#Administracion/";
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se pudo cambiado el estatus al funcionario',
                                        'theme': 'brown',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'No se pudo cambiado el estatus al funcionario',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });
                        console.log('error');
                    });

                }, 'onDeny': function () {


                }
            });
        };


    }]);






mppeuct.controller('Enviar_correo_masivo', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', 'textAngularManager', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location, textAngularManager) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.una = '10';
        extScope = $scope;

        $scope.version = textAngularManager.getVersion();
        $scope.versionNumber = $scope.version.substring(1);

        $timeout(function () {
            var myDate = new Date();
            myDate.setDate(myDate.getDate() - 1);

            $('#fecha_inicio').datetimepicker({
                useCurrent: true,
                ignoreReadonly: true,
                locale: 'es',
                format: 'YYYY-MM-DD',
                minDate: moment()
            });


            $scope.formData.fecha_inicio = $('#fecha_inicio').find('input').val();


            $("#fecha_inicio").on("dp.change", function (e) {

                extScope.$apply(function () {

                    extScope.formData.fecha_inicio = $('#fecha_inicio').find('input').val();

                });

            });

            $('#calc').fileinput({
                language: 'es',
                uploadUrl: base_url + "index.php/App_servicios/procesar_correos", // server
                browseClass: 'btn btn-raised btn-primary  btn-sm',
                removeClass: 'btn btn-raised btn-danger  btn-sm',
                uploadClass: 'btn btn-raised btn-success  btn-sm',
                //dropZoneTitle: 'Arrastrar y soltar los archivos aquí &hellip;',
                // overwriteInitial: false,
                uploadAsync: false,
                previewFileType: "pdf",
                allowedFileExtensions: ['xls'],
                maxFileCount: 1,
                elErrorContainer: "#errorBlockcalc",
                uploadExtraData: function () {
                    return {
                        arch: "adjunto",
                        numero_ficha: 10,
                        codigo: "leoleo",
                    };
                },
                btnDefault: '<button type="{type}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</button>',
            });




            $('#calc').on('filecustomerror', function (event, files, extra) {
                $('#calc').fileinput('clear');
            });

            $('#calc').on('fileuploaded', function (event, files, extra) {
                $('#calc').fileinput('clear');
            });

            $('#calc').on('filebatchuploadcomplete', function (event, files, extra) {
                $('#calc').fileinput('clear');
            });

            $('#calc').on('filebatchuploadsuccess', function (event, data, previewId, index) {
                var form = data.form, files = data.files, extra = data.extra,
                        response = data.response, reader = data.reader;


                extScope.$apply(function () {

                    extScope.correos = response.datos;

                    if (response.mensaje == "exito") {

                        extScope.correos = response.datos;
                    } else if (response.mensaje == "error2") {


                        var msg = "<b style='color:black;font-size:16px'>Problemas al cargar el archivo, se consiguieron campos con formatos no válidos.</b><br><br><br>";

                        if (response.datos) {

                            angular.forEach(response.datos, function (value2, key2) {

                                msg += " * <b>linea: <em style='color :red;'>" + value2.linea + "</em></b> / <b>dato: <em style='color :red;'>" + value2.valor + "</em></b><hr></b>";

                            });

                        }

                        $.jAlert({
                            'title': '¡Error!.',
                            'content': msg,
                            'theme': 'gray',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });


                    } else {


                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'Problemas al cargar el archivo, intente de nuevo.',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });
                    }


                    //  console.log(response);


                })
                $('#calc').fileinput('clear');


            });



            $scope.formData.fecha_inicio = $('#fecha_inicio').find('input').val();

        }, 0);
        $scope.registrar = function () {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'auto',
                'theme': 'dark_green',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Está seguro que desea programar el envío de estos correos ?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'zoomIn',
                'hideAnimation': 'fadeOutDown',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/Enviar_correos/", {correos: $scope.correos, asunto: $scope.formData.asunto, mensaje: $scope.htmlContent, fecha_inicio: $scope.formData.fecha_inicio})
                            .success(function (respuesta) {

                                //console.log(respuesta);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Éxito!',
                                        'content': 'Se ha programado el envío de los correos exitosamente.',
                                        'theme': 'dark_blue',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                    $scope.formData = {};
                                    //$rootScope.get_secciones2();
                                    $window.location = "#Enviar_correo_masivo/";
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'Problemas al enviar correos.',
                                        'theme': 'black',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                }
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'Problemas al enviar correos.',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
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

mppeuct.controller('Enviar_mensaje_masivo', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.datos_registro = {};
        $scope.formData = {};
        extScope = $scope;


        $timeout(function () {

            var myDate = new Date();
            myDate.setDate(myDate.getDate() - 1);


            $('#fecha_inicio_sms').datetimepicker({
                useCurrent: true,
                ignoreReadonly: true,
                locale: 'es',
                format: 'YYYY-MM-DD',
                minDate: moment()
            });

            $scope.formData.fecha_inicio = $('#fecha_inicio_sms').find('input').val();

            $("#fecha_inicio_sms").on("dp.change", function (e) {

                extScope.$apply(function () {

                    extScope.formData.fecha_inicio = $('#fecha_inicio_sms').find('input').val();

                });

            });

            $('#calc2').fileinput({
                language: 'es',
                uploadUrl: base_url + "index.php/App_servicios/procesar_sms", // server
                browseClass: 'btn btn-raised btn-primary  btn-sm',
                removeClass: 'btn btn-raised btn-danger  btn-sm',
                uploadClass: 'btn btn-raised btn-success  btn-sm',
                //dropZoneTitle: 'Arrastrar y soltar los archivos aquí &hellip;',
                // overwriteInitial: false,
                uploadAsync: false,
                previewFileType: "pdf",
                allowedFileExtensions: ['xls'],
                maxFileCount: 1,
                elErrorContainer: "#errorBlockcalc",
                uploadExtraData: function () {
                    return {
                        arch: "adjunto",
                        numero_ficha: 10,
                        codigo: "leoleo",
                    };
                },
                btnDefault: '<button type="{type}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</button>',
            });


            $('#calc2').on('filecustomerror', function (event, files, extra) {
                $('#calc2').fileinput('clear');
            });

            $('#calc2').on('fileuploaded', function (event, files, extra) {
                $('#calc2').fileinput('clear');
            });

            $('#calc2').on('filebatchuploadcomplete', function (event, files, extra) {
                $('#calc2').fileinput('clear');
            });


            $('#calc2').on('filebatchuploadsuccess', function (event, data, previewId, index) {
                var form = data.form, files = data.files, extra = data.extra,
                        response = data.response, reader = data.reader;

                //   console.log(response);

                extScope.$apply(function () {

                    extScope.sms = response.datos;

                    if (response.mensaje == "exito") {

                        extScope.correos = response.datos;
                    } else if (response.mensaje == "error2") {

                        var msg = "<b style='color:black;font-size:16px'>Problemas al cargar el archivo, se consiguieron campos con formatos no válidos.</b><br><br><br>";

                        if (response.datos) {

                            angular.forEach(response.datos, function (value2, key2) {

                                msg += " * <b>linea: <em style='color :red;'>" + value2.linea + "</em></b> / <b>dato: <em style='color :red;'>" + value2.valor + "</em></b><hr></b>";

                            });

                        }

                        $.jAlert({
                            'title': '¡Error!.',
                            'content': msg,
                            'theme': 'gray',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });

                    } else {


                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'Problemas al cargar el archivo, intente de nuevo.',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });
                    }


                    //  console.log(response);

                })
                $('#calc2').fileinput('clear');


            });

            $scope.formData.fecha_inicio = $('#fecha_inicio_sms').find('input').val();

        }, 0);


        $scope.registrar_sms = function () {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'auto',
                'theme': 'dark_green',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Está seguro que desea programar el envío de estos sms ?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'zoomIn',
                'hideAnimation': 'fadeOutDown',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/Enviar_sms/", {sms: $scope.sms, mensaje: $scope.formData.sms_mensaje, fecha_inicio: $scope.formData.fecha_inicio})
                            .success(function (respuesta) {

                                // console.log(respuesta);

                                if (String(respuesta.casos).trim() != 'false') {

                                    $.jAlert({
                                        'title': '¡Éxito!',
                                        'content': 'Se ha programado el envío de los sms exitosamente.',
                                        'theme': 'dark_blue',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                    $scope.formData = {};

                                    $window.location = "#Enviar_mensaje_masivo/";

                                    //$rootScope.get_secciones2();
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'Problemas al enviar sms.',
                                        'theme': 'black',
                                        'size': 'auto',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'black'}
                                    });
                                }
//                               
                            }).error(function () {
                        $.jAlert({
                            'title': '¡Error!.',
                            'content': 'Problemas al enviar sms.',
                            'theme': 'black',
                            'size': 'auto',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'black'}
                        });
                        console.log('error');
                    });



                }, 'onDeny': function () {
                }
            });
        };
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

//14687213

//DREQUENA@MPPECT.GO.VE	