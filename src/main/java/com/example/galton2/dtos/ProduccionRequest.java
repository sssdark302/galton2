package com.example.galton2.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProduccionRequest {
    private int niveles;
    private int fabricasClavos;
    private int fabricasContenedores;
    private int fabricasBolas;
}