package com.tiam.tiam.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull(message = "Total sold quantity is mandatory")
    @Positive(message = "Total deve ser positivo")
    private Double soldQuantity;

    @NotNull(message = "Data da venda é obrigatória")
    private LocalDate saleDate;

    @NotNull(message = "Total value is mandatory")
    @PositiveOrZero(message = "Total value must be zero or positive")
    private Double totalValue;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}