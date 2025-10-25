package com.tiam.tiam.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Descrição é obrigatório")
    @Size(max = 500)
    private String description;

    @NotNull(message = "Data de agendamento do serviço é obrigatória.")
    @FutureOrPresent(message = "Data deve ser na data de hoje ou futura.")
    private LocalDate date;

    @NotBlank(message = "Nome do cliente é obrigatório")
    @Size(max = 255)
    private String clientName;

    @NotBlank(message = "Nome do serviço é obrigatório")
    @Size(max = 100)
    private String title;
}