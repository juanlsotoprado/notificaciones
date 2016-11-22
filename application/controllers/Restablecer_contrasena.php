<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Validar_inscripcion extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index() {

        $this->load->view('Restablecer_clave');
    }

    public function vista() {

        $this->load->view('Validar_incripcion');
    }

}
