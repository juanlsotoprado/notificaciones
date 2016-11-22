// Creación del módulo
var msn_exito = 'Se ha procesado  exitosamente, ingrese a su correo y valide su cuenta.';
var msn_error = 'Ha ocurrido un error al procesar';
var mppeuct_sistemas = angular.module('mppeuct_sistemas', ['ngRoute', 'ngSanitize', 'ngProgressLite', 'datatables']);

// Configuración de las rutas

mppeuct_sistemas.controller('app', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', function ($scope, $window, $rootScope, ngProgressLite, $timeout) {
        $rootScope.base_url = base_url;
        $rootScope.base_url_doc = base_url + 'privado/docs/';

        $rootScope.vista = base_url + 'index.php/UHIHGGNI432432UII5456fuyftbHTFBfyft2356545dsf4sf5s4dFGDTfYGujgyyugYU/vista';

    }]);

mppeuct_sistemas.controller('validar_inscripcion', ["$scope", "$window", "$rootScope", 'ngProgressLite', '$timeout', 'DTOptionsBuilder', '$http', '$location', function ($scope, $window, $rootScope, ngProgressLite, $timeout, DTOptionsBuilder, $http, $location) {
        ngProgressLite.start();
        $rootScope.title = $location.path();
        $rootScope.liActive = $location.path();
        $scope.formData = {};
        $scope.datos_registro = {};
        $rootScope.ph_numbr = /0[1-9]{3}[0-9]{7}$/;
        $scope.formData.campo_existente = false;

//7894565
        $scope.cedula_validada = true;

        $scope.$watch('formData.campo_existente', function () {

            if ($scope.formData.campo_existente) {

                $scope.formData.primer_nombre = '';
                $scope.formData.segundo_nombre = '';
                $scope.formData.primer_apellido = '';
                $scope.formData.segundo_apellido = '';
                $scope.formData.genero = '';
                $scope.formData.nacionalidad = '';
            }

        });


        $http.post(base_url + "index.php/App_servicios/get_discapacidades/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $scope.datos_registro.discapacidades = respuesta.casos;
                        
                        $scope.formData.discapacidad =  {"id_discapacidad":"1","descripcion":"No poseo ninguna discapacidad"};
                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/get_etnias/');
        });

        $http.post(base_url + "index.php/App_servicios/get_etnias/")
                .success(function (respuesta) {

                    //console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {

                        $scope.datos_registro.etnias = respuesta.casos;
                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/get_etnias/');
        });

        $http.post(base_url + "index.php/App_servicios/get_estados/")
                .success(function (respuesta) {

                    // console.log(respuesta.casos);

                    if (String(respuesta.casos).trim() != 'false') {
                        
                        $scope.datos_registro.estado = respuesta.casos;
                        
                    }

                }).error(function () {

            console.log('error: index.php/App_servicios/get_estados/');
        });




        $scope.municipio = function (data) {

            $scope.datos_registro.municipio = {};
            $scope.datos_registro.parroquia = {};
            $http.post(base_url + "index.php/App_servicios/get_municipios/", data)
                    .success(function (respuesta) {

                        //     console.log(respuesta.casos);


                        if (String(respuesta.casos).trim() != 'false') {


                            $scope.datos_registro.municipio = respuesta.casos;

                        }

                    }

                    ).error(function () {

                console.log('error');
            });

        }

        $scope.parroquia = function (data) {
            $scope.datos_registro.parroquia = {};
            $http.post(base_url + "index.php/App_servicios/get_parroquias/", data)
                    .success(function (respuesta) {

                        // console.log(respuesta.casos);


                        if (String(respuesta.casos).trim() != 'false') {


                            $scope.datos_registro.parroquia = respuesta.casos;

                        }

                    }

                    ).error(function () {

                console.log('error');
            });

        }

        $scope.verificar_correo = function (correo,cedula) {
            $http.post(base_url + "index.php/App_servicios/verificar_correo_estudiante/", {correo: correo,cedula:cedula})
                    .success(function (respuesta) {
                        $scope.formData.correo_validado = false;

                        // console.log(respuesta);


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

                    //  console.log(respuesta.casos);

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


        $scope.cambio_cedula = function () {

            $scope.cedula_validada = false;
        };

        $scope.get_usuarios_ieu();
        
        
        $scope.buscar_cedula = function (cedula) {

            $scope.cedula_busqueda = true;
            $scope.cedula_validada = true;

            $scope.borrar_datos_estudiante = function () {

                $scope.formData.primer_nombre = '';
                $scope.formData.segundo_nombre = '';
                $scope.formData.primer_apellido = '';
                $scope.formData.segundo_apellido = '';
                $scope.formData.genero = '';
                $scope.formData.nacionalidad = '';

            };


            $http.post(base_url + "index.php/App_servicios/get_estudiante_validado/", {cedula: cedula})
                    .success(function (respuesta) {
                        $scope.formData.estudiante_no_existente_saime = false;
                        $scope.formData.estudiante_no_existente_sistema = false;
                        $scope.formData.estudiante_existente_validado = false;

                        // console.log(respuesta.casos);


                        if (String(respuesta.casos).trim() == 'undefined') {

                            $scope.borrar_datos_estudiante();

                        } else if (String(respuesta.casos).trim() == '1') {

                            $scope.formData.estudiante_no_existente_saime = true;
                            $scope.borrar_datos_estudiante();

                        } else if (String(respuesta.casos).trim() == '2') {

                            $scope.formData.estudiante_no_existente_sistema = true;
                            $scope.borrar_datos_estudiante();

                        } else if (String(respuesta.casos).trim() == '3') {

                            $scope.formData.estudiante_existente_validado = true;
                            $scope.borrar_datos_estudiante();

                        } else {

                            $scope.formData.primer_nombre = respuesta.casos.primernombre;
                            $scope.formData.segundo_nombre = respuesta.casos.segundonombre;
                            $scope.formData.primer_apellido = respuesta.casos.primerapellido;
                            $scope.formData.segundo_apellido = respuesta.casos.segundoapellido;
                            $scope.formData.genero = respuesta.casos.sexo;
                             $scope.formData.nacionalidad = respuesta.casos.nacionalidad;
                        }

                        $scope.cedula_busqueda = false;

                    }
                    ).error(function () {

                $scope.cedula_busqueda = false;

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
                'confirmQuestion': '¿Esta seguro que desea validar sus datos?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post(base_url + "index.php/App_servicios/actualizar_estudiante/", $scope.formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta.casos);
                                if (String(respuesta.casos).trim() != 'false') {

                                    $scope.get_usuarios_ieu();
                                    $.jAlert({
                                        'title': '¡Éxito!',
                                        'content': msn_exito,
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}
                                    });
                                    $scope.formData = {};
                                } else {
                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': msn_error,
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
                            'content': 'Error al registrar los datos.',
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
