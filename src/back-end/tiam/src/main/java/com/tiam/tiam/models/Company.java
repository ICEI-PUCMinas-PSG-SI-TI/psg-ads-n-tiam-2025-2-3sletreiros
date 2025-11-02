package com.tiam.tiam.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String legalName;

    @NotBlank(message = "CNPJ é obrigatório")
    @Size(min = 14, max = 18)
    private String taxId;

    @Size(max = 100)
    private String businessSector;

    private Boolean isSubscriptionActive;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    @Size(max = 255)
    private String email;

    // UID do Firebase enviado pelo front
    private String firebaseUid;
}