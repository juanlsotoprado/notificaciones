<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

    function __construct() {
        parent::__construct();

        if ($this->uri->segment(2) != 'Validar_Inscripcion') {

            if ((!$this->session->userdata('usuario')) and ( !$this->session->userdata('registrado'))) {

                redirect('/login', 'refresh');
            }
        }

        $this->load->model('General');
    }

    public function index() {

        // $result = $this->session->all_userdata();
        //  error_log(print_r($this->session->all_userdata(), true));

        $data['user_sesion'] = $this->session->all_userdata();



        $this->load->view('Header', $data);
        $this->load->view('Menu', $data);
        $this->load->view('Home');
        $this->load->view('Footer', $data);
    }

    // ------------------------------------------------ nuevo reportes ------------------->

    
    public function Inicio() {
    
    	$data['user_sesion'] = $this->session->all_userdata();
    	$this->load->view('App/Inicio', $data);
    
    }

     public function En_curso() {

        $data['user_sesion'] = $this->session->all_userdata();
        $this->load->view('App/En_curso', $data);
        
    }
    
    public function Enviar_correo_masivo() {

        $data['user_sesion'] = $this->session->all_userdata();

        $this->load->view('App/Enviar_correo_masivo', $data);
    }

    public function Enviar_mensaje_masivo() {

        $data['user_sesion'] = $this->session->all_userdata();

        $this->load->view('App/Enviar_mensaje_masivo', $data);
    }
    
    public function Administracion_usuario() {

        $data['user_sesion'] = $this->session->all_userdata();

        $this->load->view('App/Administracion_usuario', $data);
    }

}
