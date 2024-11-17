package com.example.galton2.controladores;

import com.example.galton2.dtos.ProduccionRequest;
import com.example.galton2.servicios.FabricaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class FabricaControlador {

    @Autowired
    private FabricaService fabricaService;

    public FabricaControlador(FabricaService fabricaService) {
        this.fabricaService = fabricaService;
    }

    @GetMapping("/building-info")
    public Map<String, Integer> obtenerInformacionEdificio() {
        Map<String, Integer> response = new HashMap<>();
        response.put("contadorClavos", fabricaService.getContadorClavos());
        response.put("contadorContenedores", fabricaService.getContadorContenedores());
        response.put("contadorBolas", fabricaService.getContadorBolas());
        response.put("contadorTableros", fabricaService.getContadorTableros());
        return response;
    }

    @PostMapping("/iniciar-produccion")
    public String iniciarProduccion(@RequestBody ProduccionRequest request) {
        fabricaService.iniciarProduccion(
                request.getNiveles(),
                request.getFabricasClavos(),
                request.getFabricasContenedores(),
                request.getFabricasBolas()
        );
        return "Producción iniciada con " + request.getNiveles() + " niveles!";
    }
}
