package com.tiam.tiam.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull(message = "Quantidade de itens deste produto é obrigatório")
    @Min(value = 1, message = "Quantidade deve ser ao menos 1")
    private Integer quantity;

    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private Double value;

    @Size(max = 500)
    private String observation;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @NotNull(message = "Product is mandatory")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "sale_id")
    @NotNull(message = "Sale is mandatory")
    private Sale sale;
}