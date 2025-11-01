package com.tiam.tiam.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    // Removido @NotNull e @Positive - este campo é calculado automaticamente
    private Double soldQuantity;

    @NotNull(message = "Data da venda é obrigatória")
    private LocalDate saleDate;

    // Removido @NotNull e @PositiveOrZero - este campo é calculado automaticamente
    private Double totalValue;

    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}