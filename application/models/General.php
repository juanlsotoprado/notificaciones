<?php

class General extends CI_Model {

//Semilla utilizada en crypt para mejorar la seguridad de las claves, es importante NO modificar el String
    public static $SEMILLA = '&$.m1&$.n1st3r&$.10d3c1&$.3nc14&$.yt3cn&$.0l0g14$$SistemaGPID./10$$2015.encrypt$$c12ve';
    public $global = false;

    function __construct() {
        parent::__construct();
    }

    public function strtoupper_intensivo($data) {

        return mb_strtoupper($data, "utf-8");
    }

    public function set_estatus_trans($data) {

        $this->db->trans_begin();

        try {

            $data_session = $this->session->all_userdata();


            $query = " UPDATE";

            if ($data['tipo'] == 'C') {
                $query .= " correos";
            } else {

                $query .= " sms";
            }


            $query .= " SET  estatus =  false
                  
                   where 
              
              id_mensaje  =  " . $data['id'] . "
                ";

            // error_log($query);


            $result2 = $this->db->simple_query($query);


            if (!$result2)
                throw new Exception("Error al $accion . query : " . $query);

            $this->db->trans_commit();
            return true;
        } catch (Exception $exc) {
            error_log($exc, 0);
            error_log(print_r($this->db->error(), true));
            $this->db->trans_rollback();

            return false;
        }
    }

    public function Get_trans() {
        $data_session = $this->session->all_userdata();

        $query = "SELECT *
FROM
  ( SELECT 'C' AS tipo,
           u.nombre_apellido,
           m.asunto AS mensaje,
           to_char(c.fecha_creacion, 'DD-MM-YYYY HH24:mm:ss') AS fecha_creacion,
           to_char(c.fecha_envio, 'DD-MM-YYYY HH24:mm:ss') AS fecha_envio,
           c.id_mensaje,
           count(c.id_mensaje) AS total,

     (SELECT count(id_mensaje)
      FROM correos
      WHERE id_mensaje = c.id_mensaje
        AND fecha_enviado IS NOT NULL
        AND estatus != FALSE ) AS progreso
   FROM usuario u
   INNER JOIN correos c on(u.id = c.id_usuario)
   INNER JOIN mensaje m on(m.id = c.id_mensaje)
   WHERE c.estatus != FALSE";

        if ($data_session['id_perfil'] != 1) {

            $query .= "
                   AND u.id = " . $data_session['id_usuario'];
        }



        $query .= " GROUP BY u.nombre_apellido,
            m.mensaje,
            m.asunto,
            c.fecha_creacion,
            c.fecha_envio,
            c.id_mensaje
   HAVING count(c.id_mensaje) !=
     (SELECT count(id_mensaje)
      FROM correos
      WHERE id_mensaje = c.id_mensaje
        AND fecha_enviado IS NOT NULL
        AND estatus != FALSE )
   UNION SELECT 'S' AS tipo,
                u.nombre_apellido,
                m.mensaje AS mensaje,
                to_char(s.fecha_creacion, 'DD-MM-YYYY HH24:mm:ss') AS fecha_creacion,
                to_char(s.fecha_envio, 'DD-MM-YYYY HH24:mm:ss') AS fecha_envio,
                s.id_mensaje,
                count(s.id_mensaje) AS total,

     (SELECT count(id_mensaje)
      FROM sms
      WHERE id_mensaje = s.id_mensaje
        AND fecha_enviado IS NOT NULL
        AND estatus != FALSE ) AS progreso
   FROM usuario u
   INNER JOIN sms s on(u.id = s.id_usuario)
   INNER JOIN mensaje m on(m.id = s.id_mensaje)
   WHERE s.estatus != FALSE";

        if ($data_session['id_perfil'] != 1) {

            $query .= "
                   AND u.id = " . $data_session['id_usuario'];
        }



        $query .= " GROUP BY u.nombre_apellido,
            m.mensaje,
            m.asunto,
            s.fecha_creacion,
            s.fecha_envio,
            s.id_mensaje
   HAVING count(s.id_mensaje) !=
     (SELECT count(id_mensaje)
      FROM sms
      WHERE id_mensaje = s.id_mensaje
        AND fecha_enviado IS NOT NULL
        AND estatus != FALSE )
    ) AS tabla ORDER BY fecha_creacion DESC";


      //  error_log(print_r($query, true));



        $result = $this->db->query($query);

        if ($result->num_rows() > 0) {

            foreach ($result->result_array() as $row) {

                $params[] = $row;
            }
            //    error_log(print_r($params, true));


            return $params;
        } else {

            return false;
        }
    }

    public function set_estatus($data) {

        $this->db->trans_begin();

        try {

            $data_session = $this->session->all_userdata();


            $query = " UPDATE usuario SET
              
              estatus =  " . $data['estatus'] . "
                  
                   where 
              
              cedula =  " . $data['cedula'] . "
                ";

            //  error_log($query);


            $result2 = $this->db->simple_query($query);


            if (!$result2)
                throw new Exception("Error al $accion . query : " . $query);

            $this->db->trans_commit();
            return true;
        } catch (Exception $exc) {
            error_log($exc, 0);
            error_log(print_r($this->db->error(), true));
            $this->db->trans_rollback();

            return false;
        }
    }

    public function registrar_modificar_funcionario($data) {

        $this->db->trans_begin();

        try {

            $data_session = $this->session->all_userdata();

            $accion = !empty($data['modificar']) ? 'modificar' : 'registrar';

            if (!empty($data['modificar'])) {

                $query = " UPDATE usuario SET
              
              id_perfil =  " . $data['perfil']['id'] . ",
              fecha =  now()
              
             where 
              
              cedula =  " . $data['numcedula'] . "
                ";
            } else {


                $query = " INSERT INTO usuario
              (
              cedula,
              estatus,
              fecha,
              id_perfil,
              nombre_apellido
              )
              VALUES
              (
              " . $data['numcedula'] . ",
               true,
                 now(),
              " . $data['perfil']['id'] . ",
              '" . $data['nombreApellido'] . "'

                )
                ";
            }


            //  error_log(print_r($query, true));


            $result2 = $this->db->simple_query($query);


            if (!$result2)
                throw new Exception("Error al $accion . query : " . $query);

            $this->db->trans_commit();

            if (empty($data['modificar'])) {

                $mensaje = '<p><span style="font-family: Arial; font-size: 
                    14px; line-height: 1.2;"><b>Sr(a).  ' . $data['nombreApellido'] . '</b><br><br> Se le informa que fue registrado en el <b> Sistema de Notificaciones.</b> <br><br>
                     Para ingresar por favor vaya a la página: <a href="http://notificaciones.prueba.mppeuct.gob.ve/"> http://notificaciones.prueba.mppeuct.gob.ve/</a>  &nbsp;<br><br>
                     El ingreso al sistema sera con su <b>usuario<b/> y <b>clave<b/> del correo institucional.</p>';

                $this->Enviar_correo("MPPEUCT(notificación)", $data['correo'], 'Creación de usuario en el Sistema de Notificaciónes.', $mensaje);
            }



            return true;
        } catch (Exception $exc) {
            error_log($exc, 0);
            error_log(print_r($this->db->error(), true));
            $this->db->trans_rollback();

            return false;
        }
    }

    public function Enviar_correos($data) {

        $this->db->trans_begin();

        try {

            $data_session = $this->session->all_userdata();


            // error_log(print_r($data_session,true));


            $query = " INSERT INTO mensaje_enviados_traza
              (
              tipo_mensaje,
              mensaje,
              asunto,
              tlf_correo,
              id_usuario,
              fecha,
              fecha_envio
              
              )
              VALUES
              (
              'c',
              '" . $data['mensaje'] . "',
               '" . $data['asunto'] . "',
               '" . implode(",", $data['correos']) . "',
               " . $data_session['id_usuario'] . ",
                 now(),
               '" . $data['fecha_inicio'] . "'

                   
              
                )
                ";



            $result2 = $this->db->simple_query($query);


            if (!$result2)
                throw new Exception("Error al insertar mensaje_enviados_traza. query : " . $query);




            $query = " INSERT INTO mensaje
              (
              mensaje,
              asunto,
              fecha
              )
              VALUES
              (
              '" . $data['mensaje'] . "',
              '" . $data['asunto'] . "',
                 now() 
                )  RETURNING id
                ";



            $result = $this->db->query($query, false, true);


            if (!$result)
                throw new Exception("Error al insertar mensaje. query : " . $query);


            if ($result->num_rows() > 0) {

                foreach ($result->result_array() as $row) {

                    $id_mensaje = $row['id'];
                }
            }



            if ($id_mensaje) {

                foreach ($data['correos'] as $clave => $valor) {

                    $query = " INSERT INTO correos
              (
              correo,
              id_mensaje,
              fecha_creacion,
              fecha_envio,
              id_usuario
              
              )
              VALUES
              (
               '" . $valor . "',
               " . $id_mensaje . ",
                now(),
               '" . $data['fecha_inicio'] . "',
                                 " . $data_session['id_usuario'] . "

     
                )
                ";

                    $result2 = $this->db->simple_query($query);

                    if (!$result2)
                        throw new Exception("Error al insertar correos. query : " . $query);
                }
            }



            $this->db->trans_commit();
            return true;
        } catch (Exception $exc) {
            error_log($exc, 0);
            error_log(print_r($this->db->error(), true));
            $this->db->trans_rollback();

            return false;
        }
    }

    public function Enviar_sms($data) {

        $this->db->trans_begin();

        try {

            $data_session = $this->session->all_userdata();


            $query = " INSERT INTO mensaje_enviados_traza
              (
              tipo_mensaje,
              mensaje,
              tlf_correo,
              id_usuario,
              fecha,
              fecha_envio
              
              
              )
              VALUES
              (
              's',
              '" . $data['mensaje'] . "',
               '" . implode(",", $data['sms']) . "',
               " . $data_session['id_usuario'] . ",
                 now(),
               '" . $data['fecha_inicio'] . "'

                  )
                ";

            //  error_log($query);

            $result2 = $this->db->simple_query($query);

            if (!$result2)
                throw new Exception("Error al insertar mensaje_enviados_traza. query : " . $query);

            $query = " INSERT INTO mensaje
              (
              mensaje,
              fecha
              )
              VALUES
              (
              '" . $data['mensaje'] . "',
                 now() 
                )  RETURNING id
                ";


            $result = $this->db->query($query, false, true);


            if (!$result)
                throw new Exception("Error al insertar mensaje. query : " . $query);


            if ($result->num_rows() > 0) {

                foreach ($result->result_array() as $row) {

                    $id_mensaje = $row['id'];
                }
            }



            if ($id_mensaje) {

                foreach ($data['sms'] as $clave => $valor) {

                    $query = " INSERT INTO sms
              (
              tlf,
              id_mensaje,
              fecha_creacion,
              fecha_envio,
              id_usuario
              
              
              )
              VALUES
              (
               '" . $valor . "',
               " . $id_mensaje . ",
                now(),
               '" . $data['fecha_inicio'] . "',
                                                    " . $data_session['id_usuario'] . "

     
                )
                ";

                    $result2 = $this->db->simple_query($query);

                    if (!$result2)
                        throw new Exception("Error al insertar sms. query : " . $query);
                }
            }



            $this->db->trans_commit();
            return true;
        } catch (Exception $exc) {
            error_log($exc, 0);
            error_log(print_r($this->db->error(), true));
            $this->db->trans_rollback();

            return false;
        }
    }

    public function Get_usuarios() {

        $query = "SELECT
                  u.*,
                  p.descripcion as nombre_perfil
                  FROM usuario u
                  inner join perfil p on (u.id_perfil = p.id)
                                   
                  ORDER BY id

                ";
        $result = $this->db->query($query);

        if ($result->num_rows() > 0) {

            foreach ($result->result_array() as $row) {

                $params[$row['id']] = $row;
            }

// error_log(print_r($params, true));

            return $params;
        } else {

            return false;
        }
    }

    public function Get_perfiles() {

        $query = "SELECT
                  *
                  FROM perfil                                   
                  ORDER BY id

                ";
        $result = $this->db->query($query);

        if ($result->num_rows() > 0) {

            foreach ($result->result_array() as $row) {

                $params[$row['id']] = $row;
            }

// error_log(print_r($params, true));

            return $params;
        } else {

            return false;
        }
    }

    public function Buscar_usuario_ldap($params) {


        try {

            $params = array('filtros' => array('usuario' => $params['funcionario']));
            $clientOptions = array();
            $wsdl = "http://webservices.mppeuct.gob.ve/ldap/ldap.wsdl";
            $client = new SoapClient($wsdl, $clientOptions);
            $soapstruct = new SoapVar($params, SOAP_ENC_OBJECT, "params", "http://webservices.mppeuct.gob.ve/ldap/schema.xsd");
            $objeto = $client->consultarDatosPersonalesLdap(new SoapParam($soapstruct, "message"));

            if ($objeto['respuesta']) {

                return $objeto['respuesta'];
            } else {

                return false;
            }
        } catch (SoapFault $exp) {

            return false;
        }
    }

    public function Buscar_usuario_sistem($param) {

        $query = "SELECT
                  u.*,
                  p.id as id_perfil,
                  p.descripcion,
                  p.descripcion as nombre_perfil
                  FROM usuario u
                  inner join perfil p on (u.id_perfil = p.id)
                  where cedula = $param
                  ORDER BY u.id
                ";


        $result = $this->db->query($query);

        if ($result->num_rows() > 0) {

            foreach ($result->result_array() as $row) {

                $params = $row;
            }


            return $params;
        } else {

            return false;
        }
    }

    public function Enviar_correo($nom, $dir, $asunto, $mensaje) {
        $mensaje = "<div style=\"top:0px:left:0px\"><img src=\"http://apis.mppeuct.gob.ve/img/comun/normativa.png\"></div>" . $mensaje;
        $params = array(
            'nombre' => $nom,
            'correo_remitente' => "no-responder@mppeuct.gob.ve",
            'correo_destinatario' => $dir,
            'asunto' => $asunto,
            'mensaje' => $mensaje,
            'HTML' => $mensaje
        );

        $client = new SoapClient("http://webservices.mppeuct.gob.ve/correo/correo.wsdl", array());
        $soapstruct = new SoapVar($params, SOAP_ENC_OBJECT, "params", "http://webservices.mppeuct.gob.ve/correo/schema.xsd");
        $objeto = $client->enviarCorreo(new SoapParam($soapstruct, "message"));

        return $objeto;
    }

}

//04120888487
?>
