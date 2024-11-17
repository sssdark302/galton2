package com.example.galton2.controladores;

import com.example.galton2.dtos.ProduccionRequest;
import com.example.galton2.servicios.FabricaService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController("/api/fabrica")
public class FabricaControlador {

    @Autowired
    private FabricaService fabricaService;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public FabricaControlador(FabricaService fabricaService) {
        this.fabricaService = fabricaService;
    }

    private static final String EXCHANGE_NAME = "basic_exchange";
    private static final String ROUTING_KEY = "routing.key";

    @PostMapping("/enviar-mensaje")
    public String enviarMensaje(@RequestBody ProduccionRequest request) {
        // Enviar mensaje a RabbitMQ
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, request);
        return "Mensaje enviado correctamente a RabbitMQ";
    }

    @GetMapping("/datos-procesados")
    public Map<String, Integer> obtenerDatosProcesados() {
        // Simular datos procesados y retornarlos
        Map<String, Integer> datos = new HashMap<>();
        datos.put("bolasProcesadas", fabricaService.getContadorBolas());
        datos.put("tablerosConstruidos", fabricaService.getContadorTableros());
        return datos;
    }
}
