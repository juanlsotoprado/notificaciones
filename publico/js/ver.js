mppeuct.controller('Registrar_solicitud', ['$scope', '$location', '$rootScope', 'redimencionar', '$http', '$timeout', '$sce', function ($scope, $location, $rootScope, redimencionar, $http, $timeout, $sce) {

// $location.path( "/Consultar_bien" );
        $rootScope.iniciar = true;
        $rootScope.menuActive = $location.path();
        $scope.template = "index.php?lugar=home&accion=tabs&t=tab1";
        $scope.pageClass2 = 'animated slideInDown';
        $scope.formData = {};
        $scope.datos_registro = {};
        $scope.iniVista = 0;


        $rootScope.title = "Registrar Bien Nacional";
        $scope.titlepagina = ' Registrar Bien Nacional';
        $scope.nombre_opcion = 'Enviar Formulario';

        //  alert($rootScope.modal.data);

        $scope.finishLoading = function () {
            $(document).scrollTop(0);
            if ($scope.iniVista > 0) {
                if ($scope.iniVista == 1) {
                    $scope.pageClass2 = 'animated fadeOutLeft';
                    $timeout(function () {
                        $scope.pageClass2 = 'animated fadeInRight';
                    }, 250);
                } else {
                    $scope.pageClass2 = 'animated fadeOutRight';
                    $timeout(function () {
                        $scope.pageClass2 = 'animated fadeInLeft';
                    }, 250);
                }
            }
        }

        $http.post("index.php?lugar=doc&accion=Datos_registro")
                .success(function (respuesta) {

                    $scope.datos_registro = respuesta;
                    var temp = ' <option style="text-align: left; color: #777;" value=""><-- Seleccionar una opción --> </option>';
                    angular.forEach($scope.datos_registro.catalogo, function (value, key) {

                        temp += "<option value='" + value.codigo_catalogo + "' style='color:#2E2E2E'>" + value.codigo_catalogo + ' - ' + value.descripcion + " </option>";
                        angular.forEach(value.hijo, function (value2, key2) {

                            temp += "<option value='" + value2.codigo_catalogo + "' style='color:#045FB4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + value2.codigo_catalogo + ' - ' + value2.descripcion + " </option>";
                            angular.forEach(value2.hijo, function (value3, key3) {

                                temp += "<option value='" + value3.codigo_catalogo + "' style='color:#777'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + value3.codigo_catalogo + ' - ' + value3.descripcion + " </option>";
                            });
                        });
                    });
                    $scope.temp_catalogo = $sce.trustAsHtml(temp + '<option style="text-align: left; color: #2E2E2E;" value="99">99 - XXX </option>');
                    // console.log($scope.datos_registro.forma_adquisicion);

                    $timeout(function () {

                        $rootScope.iniciar = !$rootScope.iniciar;
                        redimencionar.redimencionar();
                    }, 200);
                }).error(function () {

            console.log('error');
        });
        $scope.ubcacion = {
            municipio: function () {

                if ($scope.formData.ubicacion_admin_fisica_responsable.descr_estado) {

                    $scope.datos_registro.municipio = {};
                    $http.post("index.php?lugar=doc&accion=Datos_municipio", $scope.formData.ubicacion_admin_fisica_responsable.descr_estado)
                            .success(function (respuesta) {

                                if (String(respuesta).trim() != "false") {

                                    $scope.datos_registro.municipio = respuesta;
                                }

                                //  console.log(respuesta);

                            }).error(function () {

                        console.log('error');
                    });
                } else {

                    $scope.datos_registro.municipio = {};
                }



            },
            parroquia: function () {


                if ($scope.formData.ubicacion_admin_fisica_responsable.descr_municipio) {

                    $scope.datos_registro.parroquia = {};
                    $http.post("index.php?lugar=doc&accion=Datos_parroquia", $scope.formData.ubicacion_admin_fisica_responsable.descr_municipio)
                            .success(function (respuesta) {

                                if (String(respuesta).trim() != "false") {

                                    $scope.datos_registro.parroquia = respuesta;
                                }

                                // console.log(respuesta);

                            }).error(function () {

                        console.log('error');
                    });
                } else {

                    $scope.datos_registro.parroquia = {};
                }


            },
            centrosPoblados: function () {

                if ($scope.formData.ubicacion_admin_fisica_responsable.descr_parroquia) {

                    $scope.datos_registro.descr_localidad = {};
                    $http.post("index.php?lugar=doc&accion=Datos_centrosPoblados", $scope.formData.ubicacion_admin_fisica_responsable.descr_parroquia)
                            .success(function (respuesta) {


                                if (String(respuesta).trim() != "false") {

                                    $scope.datos_registro.descr_localidad = respuesta;
                                }

                            }).error(function () {

                        console.log('error');
                    });
                } else {

                    $scope.datos_registro.descr_localidad = {};
                }
            }

        };
        $scope.submitForm = function (formData, tab) {

            $scope.template = "index.php?lugar=home&accion=tabs&t=" + tab;
            $scope.iniVista = 1;
        };
        $scope.submitForm2 = function (formData, tab) {

            $scope.template = "index.php?lugar=home&accion=tabs&t=" + tab;
            $scope.iniVista = 2;
        };
        $scope.submitFormFin = function (formData) {


            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas registrar el bien publico?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post("index.php?lugar=doc&accion=Registrar_accion", formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta);

                                if (!respuesta) {

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha registrado el bien publico.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}

                                    });
                                } else {

                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha registrado el bien publico.',
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
                            'content': 'No se ha registrado el bien publico.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}

                        });


                        //console.log('error');
                    });
                    // alert(JSON.stringify(formData));


                }, 'onDeny': function () {



                }

            });

        };

        $scope.submitFormFinEditar = function (formData) {

            $.jAlert({'type': 'confirm',
                'title': '¡Responder!',
                'size': 'md',
                'theme': 'black',
                'backgroundColor': 'white',
                'confirmQuestion': '¿Estas seguro que deseas modificar el bien publico?',
                'confirmBtnText': 'Si', 'denyBtnText': 'No',
                'showAnimation': 'flipInX',
                'hideAnimation': 'flipOutX',
                'onConfirm': function () {

                    $http.post("index.php?lugar=doc&accion=Editar_accion", formData)
                            .success(function (respuesta) {

                                //  console.log(respuesta);

                                if (!respuesta) {

                                    $.jAlert({
                                        'title': '¡Exito!',
                                        'content': 'Se ha modificado el bien publico.',
                                        'theme': 'green',
                                        'size': 'md',
                                        'showAnimation': 'bounceInDown',
                                        'hideAnimation': 'bounceOutDown',
                                        'btns': {'text': 'Aceptar', 'theme': 'green'}

                                    });
                                } else {

                                    $.jAlert({
                                        'title': '¡Error!.',
                                        'content': 'No se ha modificado el bien publico.',
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
                            'content': 'No se ha modificado el bien publico.',
                            'theme': 'red',
                            'size': 'md',
                            'showAnimation': 'bounceInDown',
                            'hideAnimation': 'bounceOutDown',
                            'btns': {'text': 'Aceptar', 'theme': 'red'}

                        });


                        //console.log('error');
                    });
                    // alert(JSON.stringify(formData));


                }, 'onDeny': function () {



                }

            });

        };

        $scope.$watch('modal.data', function () {

            if ($rootScope.modal) {
                if ($rootScope.modal.tiempo) {


                    $rootScope.modal.header = 'Editar Bien Nacional Nro: ' + $rootScope.modal.data;
                    $rootScope.title = 'Editar Bien Nacional';
                    $scope.nombre_opcion = 'Editar Bien Nacional';
                    $scope.editar = true;
                    // alert("este es el valor de la variable:" + params);

                    $scope.temp = {'id_bien': $rootScope.modal.id};
                    $http.post("index.php?lugar=doc&accion=GetBienNacional", $scope.temp)
                            .success(function (respuesta) {

                                //  console.log($scope.modal.data);


                                if (String(respuesta).trim() != "false") {

                                    $scope.formData = respuesta;
                                    $scope.ubcacion.municipio();
                                    $scope.ubcacion.parroquia();
                                    $scope.ubcacion.centrosPoblados();
                                    //console.log(respuesta);

                                }

                            }).error(function () {

                        console.log('error');
                    });
                }
                $rootScope.modal.tiempo = !$rootScope.modal.tiempo;
            }

        });


    }]);
  