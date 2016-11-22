<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('login/Login_model');
        $this->load->model('General');
    }

    public function index() {

        if (!$this->session->userdata('usuario') || ($this->session->userdata('registrado') != "registrado")) {

            $this->load->view('Login/Login');
            
        } else {

            redirect('/app', 'refresh');
        }
    }

    public function Validar() {

        if (!$this->session->userdata('usuario') || ($this->session->userdata('registrado') != "registrado")) {

            $usuario = isset($_POST['usuario']);
            $password = isset($_POST['password']);

            if (($password) && ($usuario)) {



                $_POST['usuario'] = addslashes(htmlspecialchars(trim($_POST['usuario'])));
                $_POST['password'] = addslashes(htmlspecialchars(trim($_POST['password'])));

                $result = $this->Login_model->ValidarUsuario_ldap($_POST['usuario'], $_POST['password']);


                if ($result) {

                    $_SESSION['registrado'] = TRUE;
                    $result2['cedula'] = $result['ldap']['numcedula'];
                    $result2["usuario"] = $_POST['usuario'];
                    $result2["nombre"] = $result['ldap']["nombre"];
                    $result2["oficina"] = $result['ldap']["oficina"];
                    $result2["id_usuario"] = $result['sistem']['id'];
                    $result2["id_perfil"] = $result['sistem']['id_perfil'];

                    $result2["nombre_perfil"] = $result['sistem']['descripcion'];

                    $result2["correo"] = $_POST['usuario'] . "@mppeuct.gob.ve";

                   // error_log(print_r($result2, true));


                    $this->session->set_userdata($result2);
                    redirect('/app', 'refresh');
                } else {

                    redirect('/login', 'refresh');
                }
                
            } else {

                redirect('/login', 'refresh');
                error_log('Revento usuario y clave');

                exit;
            }
        } else {
//            
            redirect('/login', 'refresh');
            error_log('Revento usuario y clave');
        }
    }

    public function Cerrar() {
        $this->Login_model->CerrarSession();
        redirect('/login', 'refresh');
    }

}
