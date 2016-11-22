<?php

class Login_model extends CI_Model {

    //Semilla utilizada en crypt para mejorar la seguridad de las claves, es importante NO modificar el String
    public static $SEMILLA = '&$.m1&$.n1st3r&$.10d3c1&$.3nc14&$.yt3cn&$.0l0g14$$SistemaGPID./10$$2015.encrypt$$c12ve';

    function __construct() {
        parent::__construct();
    }

    public function ValidarUsuario_ldap($usuario = NULL, $password = NULL) {
        echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
        ini_set("soap.wsdl_cache_enabled", "0");
        try {
            $params = array('usuario' => $usuario, 'clave' => $password);
            $client = new SoapClient("http://webservices.mppeuct.gob.ve/ldap/ldap.wsdl", array());
            $soapstruct = new SoapVar($params, SOAP_ENC_OBJECT, "params", "http://webservices.mppeuct.gob.ve/ldap/schema.xsd");
            $objeto = $client->consultarLdap(new SoapParam($soapstruct, "message"));

            if ($objeto != 0) {


                $result = $this->ValidarUsuario_existente($objeto['numcedula']);


               //  error_log(print_r($result, true));

                if ($result) {

                    $params['ldap'] = $objeto;
                    $params['sistem'] = $result;

                    return $params;
                } else {
                    error_log("clave o usuario invalido / usuario inactivo sistema");
                    $_SESSION['error'] = true;
                    return FALSE;
                }
            } else {
                error_log("clave o usuario invalido / usuario inactivo ldap");
                $_SESSION['error'] = true;
                return FALSE;
            }
        } catch (SoapFault $exp) {
            error_log(print_r($exp->getMessage()));
        }
        return TRUE;
    }

    public function ValidarUsuario_existente($cedula) {

        $query = "select 
           u.*,
           p.id as id_perfil,
           p.descripcion
           
           from 
           usuario u
           inner join perfil p on (u.id_perfil = p.id)

                where  
                u.cedula = " . $cedula . " AND
                u.estatus = true
                ";


        $result = $this->db->query($query);

        if ($result->num_rows() > 0) {
            foreach ($result->result_array() as $row) {


                return $row;
            }
        } else {

            return false;
        }
    }

    public function CerrarSession() {

        $this->session->sess_destroy();
    }

}

?>