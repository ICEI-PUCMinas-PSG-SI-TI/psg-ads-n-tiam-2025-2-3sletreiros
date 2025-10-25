package com.tiam.tiam.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O campo rua é obrigatório")
    @Size(max = 255)
    private String street;

    @NotBlank(message = "O campo número é obrigatório")
    @Size(max = 10)
    private String number;

    @NotBlank(message = "O campo bairro é obrigatório")
    @Size(max = 100)
    private String neighborhood;

    @NotBlank(message = "O campo cidade é obrigatório")
    @Size(max = 100)
    private String city;

    @NotBlank(message = "Estado é obrigatório")
    @Size(max = 100)
    private String state;

    @NotBlank(message = "UF é obrigatório")
    @Pattern(regexp = "[A-Z]{2}", message = "UF no formato inválido. Use XX")
    @Size(min = 2, max = 2)
    private String uf;

    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "^/\\d{5}-\\d{3}", message = "CEP no formato inválido, Use 99999-99")
    @Size(min = 8, max = 9)
    private String zipCode;
}
