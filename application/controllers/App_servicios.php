<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class App_servicios extends CI_Controller {

    function __construct() {
        parent::__construct();

// error_log(print_r($this->uri->segment(2), true));


        if ($this->uri->segment(2) != 'get_datos_saime' && $this->uri->segment(2) != 'verificar_correo_estudiante' && $this->uri->segment(2) != 'get_estudiante_validado' && $this->uri->segment(2) != 'get_estados' && $this->uri->segment(2) != 'get_etnias' && $this->uri->segment(2) != 'get_discapacidades' && $this->uri->segment(2) != 'get_municipios' && $this->uri->segment(2) != 'get_parroquias' && $this->uri->segment(2) != 'actualizar_estudiante' && file_get_contents('php://input') == false) {

            if (!$this->session->userdata('usuario') || ($this->session->userdata('registrado') != "registrado")) {

                redirect('/login', 'refresh');
            }
        }

        $this->load->model('General');
    }

    public function Get_trans() {


        $params = array();

        $params['casos'] = $this->General->Get_trans();

        $this->Respuesta_json($params);
    }

    public function set_estatus_trans() {


        $_POST = json_decode(file_get_contents('php://input'), true);

        $params = array();
        $params['casos'] = false;

        $params['casos'] = $this->General->set_estatus_trans($_POST);


        //   error_log(print_r($_POST, true));
        $this->Respuesta_json($params);
    }

    public function set_estatus() {


        $_POST = json_decode(file_get_contents('php://input'), true);

        $params = array();
        $params['casos'] = false;

        $params['casos'] = $this->General->set_estatus($_POST);


        //   error_log(print_r($_POST, true));
        $this->Respuesta_json($params);
    }

    public function registrar_modificar_funcionario() {


        $_POST = json_decode(file_get_contents('php://input'), true);

        $params = array();
        $params['casos'] = false;

        $params['casos'] = $this->General->registrar_modificar_funcionario($_POST);


        // error_log(print_r($_POST, true));
        $this->Respuesta_json($params);
    }

    public function procesar_correos() {



        if (!empty($_FILES)) {

            if (is_uploaded_file($_FILES['calc']['tmp_name'])) {
                $nombreDirectorio = "privado/docs/";
                $info = pathinfo($_FILES['calc']['name']);
                $ext = $info['extension'];
                $nombreFichero = "calc." . $ext;

                $nombreCompleto = $nombreDirectorio . $nombreFichero;
                if (is_file($nombreCompleto)) {
                    $nombreFichero = $nombreFichero;
                }

                if (!move_uploaded_file($_FILES['calc']['tmp_name'], $nombreDirectorio . $nombreFichero)) {

                    error_log($nombreDirectorio . $nombreFichero . "   error");
                };

                require_once 'application/libraries/Excel/reader.php';

                // ExcelFile($filename, $encoding);
                $data = new Spreadsheet_Excel_Reader();

                $data->setOutputEncoding('CP1251');
                $data->read($nombreDirectorio . $nombreFichero);

                // error_log(print_r($data->sheets[0]['cells'], true));
                $formato = false;
                // error_log(print_r($data->sheets[0]['cells'], true));
                foreach ($data->sheets[0]['cells'] as $key => $value) {

//                    if (!preg_match("/[1-9]{3}[0-9]{7}$/", $value[1])) {

                    if (!preg_match("/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/", $value[1])) {

                        $formato[$key]['valor'] = $value[1];
                        $formato[$key]['linea'] = $key;
                    }



                    $correos2[$value[1]] = $value[1];
                }


                //  error_log(print_r($correos, true));



                if (!unlink($nombreDirectorio . $nombreFichero)) {

                    echo "problema al eliminar archivo " . $nombreDirectorio . $nombreFichero . " en temporales";
                }
            } else {

                error_log("error2");
            }
        }



        if ($correos2) {


            if (!$formato) {

                foreach ($correos2 as $key => $value) {

                    $correos[] = $value;
                }

                $params['datos'] = $correos;
                $params['mensaje'] = 'exito';
                
            } else {

                $params['datos'] = $formato;
                $params['mensaje'] = 'error2';
            }
        } else {

            $params['mensaje'] = 'error';
        }


        $this->Respuesta_json($params);
    }

    public function procesar_sms() {
        $params = array();



        if (!empty($_FILES)) {

            if (is_uploaded_file($_FILES['calc2']['tmp_name'])) {
                $nombreDirectorio = "privado/docs/";
                $info = pathinfo($_FILES['calc2']['name']);
                $ext = $info['extension'];
                $nombreFichero = "calc2." . $ext;

                $nombreCompleto = $nombreDirectorio . $nombreFichero;
                if (is_file($nombreCompleto)) {
                    $nombreFichero = $nombreFichero;
                }

                if (!move_uploaded_file($_FILES['calc2']['tmp_name'], $nombreDirectorio . $nombreFichero)) {

                    error_log($nombreDirectorio . $nombreFichero . "   error");
                };

                require_once 'application/libraries/Excel/reader.php';

                // ExcelFile($filename, $encoding);
                $data = new Spreadsheet_Excel_Reader();

                $data->setOutputEncoding('CP1251');
                $data->read($nombreDirectorio . $nombreFichero);
                $formato = false;
                // error_log(print_r($data->sheets[0]['cells'], true));
                foreach ($data->sheets[0]['cells'] as $key => $value) {

                    if (!preg_match("/^[1-9]{3}[0-9]{7}$/", $value[1])) {


                        $formato[$key]['valor'] = $value[1];
                        $formato[$key]['linea'] = $key;
                    }



                    $sms2[$value[1]] = $value[1];
                }



                //error_log(print_r($formato,true));

                if (!unlink($nombreDirectorio . $nombreFichero)) {

                    echo "problema al eliminar archivo " . $nombreDirectorio . $nombreFichero . " en temporales";
                }
            } else {
                error_log("error2");
            }
        }

        if ($sms2) {


            if (!$formato) {

                foreach ($sms2 as $key => $value) {

                    $sms[] = $value;
                }

                $params['datos'] = $sms;
                $params['mensaje'] = 'exito';
            } else {

                $params['datos'] = $formato;
                $params['mensaje'] = 'error2';
            }
        } else {

            $params['mensaje'] = 'error';
        }


        $this->Respuesta_json($params);
    }

    public function Respuesta_json($json) {

        if ($json) {

            echo json_encode($json);
        } else {

            echo json_encode('false');
        }
    }

    public function Enviar_correos() {

        $_POST = json_decode(file_get_contents('php://input'), true);

        //  error_log(print_r($_POST, true));
        $params = array();

        $params['casos'] = $this->General->Enviar_correos($_POST);

        //error_log(print_r($_POST, true));

        $this->Respuesta_json($params);
    }

    public function Get_usuarios() {

        $params = array();

        $params['casos'] = $this->General->Get_usuarios();

        //  error_log(print_r($params, true));

        $this->Respuesta_json($params);
    }

    public function Get_perfiles() {

        $params = array();

        $params['casos'] = $this->General->Get_perfiles();

        //  error_log(print_r($params, true));

        $this->Respuesta_json($params);
    }

    public function Buscar_usuario() {


        $_POST = json_decode(file_get_contents('php://input'), true);

        $params = array();

        $param_ldap = $this->General->Buscar_usuario_ldap($_POST);

        if ($param_ldap) {
            $params['casos']['data'] = $param_ldap;

            $param_sitem = $this->General->Buscar_usuario_sistem($param_ldap['numcedula']);

            if ($param_sitem) {

                $params['casos']['sistema'] = $param_sitem;
            } else {

                $params['casos']['sistema'] = 'false';
            }
        } else {

            $params['casos'] = 'ldap';
        }

        error_log(print_r($params, true));

        $this->Respuesta_json($params);
    }

    public function Enviar_sms() {

        $_POST = json_decode(file_get_contents('php://input'), true);

        // error_log(print_r($_POST, true));
        $params = array();

        $params['casos'] = $this->General->Enviar_sms($_POST);

        //error_log(print_r($_POST, true));

        $this->Respuesta_json($params);
    }

// ------------------------------------------------ nuevo reportes fin------------------->
}
